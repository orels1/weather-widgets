/**
 * Created by orel- on 30/Jun/17.
 */
const express = require('express');
const moment = require('moment');
const pug = require('pug');
const path = require('path');
const { map } = require('lodash');
const weather = require('../weather');
const { catchAsync } = require('../../utils');

const router = express.Router();

router.get('/:city', catchAsync( async (req, res) => {
  const forecast = await weather.getForecast(req.params.city, req.query.days);
  const data = map(forecast, day => Object.assign(day, { date: moment(day.date).format('DD MMM') }));
  const widgetClasses = ['widget'];
  req.query.type === 'vertical' && widgetClasses.push('widget_vertical');

  const page = pug.renderFile(path.join(__dirname, '../../app/views', 'embed.pug'), {
    city: req.params.city,
    widgetClasses: widgetClasses,
    forecast: data
  });

  res.set('Content-Type', 'text/html');
  res.status(200).send(page);
}));

exports.router = router;
