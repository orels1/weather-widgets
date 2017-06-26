/**
 * Created by orel- on 26/Jun/17.
 */

const { expect } = require('chai');
const apixu = require('../api/apixu');

describe('Apixu module', async () => {
  describe('Get current weather', async () => {
    it('Should get weather for Moscow', async () => {
      const json = await apixu.getApixu('current', {
        q: 'Moscow',
        lang: 'ru',
      });
      expect(json).to.have.property('current');
      expect(json).to.have.property('location');
      expect(json.location).to.have.property('name', 'Moscow');
      expect(json.location).to.have.property('country', 'Russia');
    });
  });
  describe('Get weather forecast', async () => {
    it('Should get a 3-day weather forecast for Moscow', async () => {
      const json = await apixu.getApixu('forecast', {
        q: 'Moscow',
        days: 3,
        lang: 'ru',
      });
      expect(json).to.have.property('location');
      expect(json.location).to.have.property('name', 'Moscow');
      expect(json.location).to.have.property('country', 'Russia');
      expect(json).to.have.property('forecast');
      expect(json.forecast).to.have.property('forecastday');
      expect(json.forecast.forecastday).to.have.lengthOf(3);
    });
    it('Should get a weekly weather forecast for Moscow', async () => {
      const json = await apixu.getApixu('forecast', {
        q: 'Moscow',
        days: 7,
        lang: 'ru',
      });
      expect(json).to.have.property('location');
      expect(json.location).to.have.property('name', 'Moscow');
      expect(json.location).to.have.property('country', 'Russia');
      expect(json).to.have.property('forecast');
      expect(json.forecast).to.have.property('forecastday');
      expect(json.forecast.forecastday).to.have.lengthOf(7);
    });
  });
});
