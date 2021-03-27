'use strict';

const util = require('util');
const { ErrorFactory } = require('../errorFactory');
const Url = require('../models/Url');
const TinyURL = require('tinyurl');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


async function decodeUrl(requestBody) {
  try {
    const isExistUrl = await Url.findOne({ shortUrl: requestBody.shortUrl });
    if (isExistUrl) {
      return isExistUrl;
    } else {
      const longUrl = await TinyURL.resolve(requestBody.shortUrl);
      return {
        'shortUrl': requestBody.shortUrl,
        'longUrl': longUrl
      };
    }
  } catch (error) {
    return ErrorFactory(500, error);
  }
}


module.exports = { decodeUrl };