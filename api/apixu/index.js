/**
 * Created by orel- on 26/Jun/17.
 */
const fetch = require('node-fetch');
const { reduce } = require('lodash');

const APIXU_KEY = process.env.APIXU_KEY || null;
const API_ROOT = 'http://api.apixu.com/v1/';

const getApixu = async (method, options, days) => {
  const optionsString = reduce(options, (result, value, key) => (
    result += `&${key}=${value}`
  ), '');
  const response = await fetch(`${API_ROOT}/${method}.json?key=${APIXU_KEY}${optionsString}`);
  return response.json();
};

exports.getApixu = getApixu;