const Joi = require('Joi');

exports.validateUser = (req, res, next) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().trim().required(),
		lastName: Joi.string().trim().required(),
		email: Joi.string().email({minDomainAtoms: 2}).trim().required(),
		password: Joi.string().trim().regex(/^[a-zA-Z0-9]{6,30}[!@&?]+$/).required()
	});

	const { error, result } = Joi.validate(req.body, schema);
	next(error);
};
