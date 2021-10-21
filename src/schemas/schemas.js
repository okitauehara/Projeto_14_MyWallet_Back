import joi from 'joi';

const signUpSchema = joi.object(
    {
        name: joi.string().min(3).required(),
        email: joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
        password: joi.string().min(8).required(),
        confirmation: joi.string().required().valid(joi.ref('password'))
    }
);

export {
    signUpSchema
}