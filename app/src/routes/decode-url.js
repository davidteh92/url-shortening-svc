'use strict';
const util = require('util');
const { decodeUrlValidation } = require('../validation');
const { ErrorFactory } = require('../errorFactory');
const { decodeUrl } = require('../services/decode-url');
const validUrl = require('valid-url');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


async function decodeUrlRouter(req, res) {
    try {
        const { error } = decodeUrlValidation(req.body);
        if (error) {
            return res.status(400).json(ErrorFactory(400, { message: error.details[0].message }));
        }
        if (validUrl.isUri(req.body.shortUrl)) {
            const result = await decodeUrl(req.body);
            const httpStatusCode = (result instanceof Error) ? result.message.status : 200;
            return res.status(httpStatusCode).json(result);
        } else {
            return res.status(400).json(ErrorFactory(400, { message: `Invalid URL. Please enter a valid url.` }));
        }
    } catch (err) {
        return res.status(500).json(ErrorFactory(500, err));
    }
}

module.exports = decodeUrlRouter;