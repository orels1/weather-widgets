/**
 * Created by orel- on 26/Jun/17.
 */

const express = require('express');
const redis = require('redis');
const bluebird = require('bluebird');
const { map, reduce } = require('lodash');
const { catchAsync } = require('../../utils');
const { getApixu } = require('../apixu');

const router = express.Router();
const LANG = process.env.WEATHER_LANG || 'ru';

// Redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

router.get('/current/:city', catchAsync( async (req, res) => {
  const json = await getApixu('current', {
    q: req.params.city,
    lang: LANG,
  });
  res.status(200).send({
    status: 'OK',
    results: json,
  });
}));

const filterWeatherData = forecast => (
  map(forecast, day => (
    {
      date: day.date,
      day: day.day,
      astro: day.astro,
      tempts: reduce(map(day.hour, hour => { // filter out the times we don't need
        if(hour.time.includes('13:00')) { // tempts for the daytime
          return { type: 'day', data: hour }
        } else if (hour.time.includes('23:00')) { // tempts for the nighttime
          return { type: 'night', data: hour }
        }
      }), (result, item) => {
        if(item) {
          result[item.type] = item.data;
        }
        return result;
      }, {}),
    }
  ))
);

exports.filterWeatherData = filterWeatherData;

// TODO: think o refactoring the redis saving/loading
router.get('/forecast/:city', catchAsync( async (req, res) => {
  // check if we have cached version
  let forecast = await client.getAsync(`forecast/moscow/${req.query.days || 1}`);
  if(!forecast) {
    // if not - get fresh data
    const json = await getApixu('forecast', {
      q: req.params.city,
      lang: LANG,
      days: req.query.days || 1,
    });
    if (!json.forecast || json.forecast.forecastday.length === 0) {
      throw new Error('NoForecastReceived');
    }
    // filter the data we need
    data = filterWeatherData(json.forecast.forecastday);
    // save data to redis
    await client.setAsync(`forecast/moscow/${req.query.days || 1}`,
      JSON.stringify({ forecast: data }),
      'EX',
      3600);
    forecast = data;
  } else {
    // if we have cached - parse it back to object
    forecast = JSON.parse(forecast).forecast;
  }
  res.status(200).send({
    status: 'OK',
    results: forecast,
  });
}));

exports.router = router;
