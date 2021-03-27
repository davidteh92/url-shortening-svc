'use strict';
const util = require('util');
const { ErrorFactory } = require('../errorFactory');
const { shortUrlService } = require('../services/short-url');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


async function shortUrlRouter(req, res) {
    try {
        const shortUrlCode = req.params.shortUrl;
        const result = await shortUrlService(shortUrlCode);
        const httpStatusCode = (result instanceof Error) ? result.message.status : 200;
        if (httpStatusCode === 200) {
            return res.redirect(result.longUrl);
        } else {
            return res.status(httpStatusCode).json(result);
        }
    } catch (err) {
        return res.status(500).json(ErrorFactory(500, err));
    }
}

module.exports = shortUrlRouter;