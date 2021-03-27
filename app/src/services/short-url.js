'use strict';

const util = require('util');
const { ErrorFactory } = require('../errorFactory');
const Url = require('../models/Url');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


async function shortUrlService(shortUrlCode) {
  try {
    const isExistUrl = await Url.findOne({ urlCode: shortUrlCode });
    if (isExistUrl) {
      return isExistUrl;
    } else {
      return ErrorFactory(404, { message: `The short url doesn't exists in our system.` });
    }
  } catch (error) {
    return ErrorFactory(500, error);
  }
}


module.exports = { shortUrlService };