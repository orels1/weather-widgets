/**
 * Created by orel- on 26/Jun/17.
 */

const { expect } = require('chai');
const { getApixu } = require('../api/apixu');
const weather = require('../api/weather');

let FORECAST = {};

describe('Weather module', async () => {
  before(async () => {
    const json = await getApixu('forecast', {
      q: 'Moscow',
      lang: 'ru',
      days: 3,
    });
    FORECAST = json.forecast.forecastday;
  });

  describe('Util functions', async () => {
    it('should filter the data we need', async () => {
      const data = weather.filterWeatherData(FORECAST);
      expect(data).to.have.lengthOf(3);
      expect(data[0]).to.have.property('date');
      expect(data[0]).to.have.property('day');
      expect(data[0]).to.have.property('astro');
      expect(data[0]).to.have.property('tempts');
      expect(data[0].tempts).to.have.property('night');
      expect(data[0].tempts).to.have.property('day');
    })
  });

  describe('Main module', async() => {
    it('should get the finalized forecast data', async () => {
      const forecast = await weather.getForecast('Moscow', 3);
      expect(forecast).to.have.lengthOf(3);
    })
  })

});
