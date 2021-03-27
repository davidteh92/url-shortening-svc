'use strict';

const util = require('util');
const { ErrorFactory } = require('../errorFactory');
const Url = require('../models/Url');
const TinyURL = require('tinyurl');
const { nanoid } = require('nanoid');
const baseUrl = process.env.BASE_URL;

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


async function encodeUrl(requestBody) {
  try {
    let result;
    try {
      const shortUrl = await TinyURL.shorten(requestBody.longUrl);
      result = {
        'shortUrl': shortUrl,
        'longUrl': requestBody.longUrl
      };
    } catch (error) {
      result = null;
    }

    if (!result) {
      const isExistUrl = await Url.findOne({ longUrl: requestBody.longUrl });
      if (isExistUrl) {
        return isExistUrl;
      }
      const urlCode = nanoid(10);
      result = await Url.create({
        longUrl: requestBody.longUrl,
        urlCode: urlCode,
        shortUrl: baseUrl + urlCode
      });
    }
    return result;
  } catch (error) {
    return ErrorFactory(500, error);
  }
}


module.exports = { encodeUrl };