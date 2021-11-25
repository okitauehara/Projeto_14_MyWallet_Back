import joi from 'joi';

const signUpSchema = joi.object(
  {
    name: joi.string().min(3).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(8).required(),
  },
);

const signInSchema = joi.object(
  {
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().required(),
  },
);

const transactionSchema = joi.object(
  {
    description: joi.string().min(3).required(),
    value: joi.number().integer().required(),
    type: joi.string().valid('earning', 'expense').required(),
  },
);

export {
  signUpSchema,
  signInSchema,
  transactionSchema,
};
