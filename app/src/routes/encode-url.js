'use strict';
const util = require('util');
const { encodeUrlValidation } = require('../validation');
const { ErrorFactory } = require('../errorFactory');
const { encodeUrl } = require('../services/encode-url');
const validUrl = require('valid-url');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function encodeUrlRouter(req, res) {
    try {
        const { error } = encodeUrlValidation(req.body);
        if (error) {
            return res.status(400).json(ErrorFactory(400, { message: error.details[0].message }));
        }
        if (validUrl.isUri(req.body.longUrl)) {
            const result = await encodeUrl(req.body);
            const httpStatusCode = (result instanceof Error) ? result.message.status : 201;
            return res.status(httpStatusCode).json(result);
        } else {
            return res.status(400).json(ErrorFactory(400, { message: `Invalid URL. Please enter a valid url for shortening.` }));
        }
    } catch (err) {
        return res.status(500).json(ErrorFactory(500, err));
    }
}

module.exports = encodeUrlRouter;