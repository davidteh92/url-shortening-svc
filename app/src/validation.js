const Joi = require('@hapi/joi');


const encodeUrlValidation = data => {
  const schema = Joi.object({
    longUrl: Joi.string().required()
  });
  return schema.validate(data);
}

const decodeUrlValidation = data => {
  const schema = Joi.object({
    shortUrl: Joi.string().required()
  });
  return schema.validate(data);
}


module.exports = { encodeUrlValidation, decodeUrlValidation };