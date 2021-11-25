import joi from 'joi';

const regexEmail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const signUpSchema = joi.object(
  {
    name: joi.string().min(3).required(),
    email: joi.string().pattern(regexEmail).required(),
    password: joi.string().min(8).required(),
    confirmation: joi.string().required().valid(joi.ref('password')),
  },
);

const signInSchema = joi.object(
  {
    email: joi.string().pattern(regexEmail).required(),
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
