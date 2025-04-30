const Joi = require('joi');

// Signup Validation
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'First Name is required',
            'string.min': 'First Name must be at least 3 characters long',
            'string.max': 'First Name must be less than 100 characters'
        }),
        lastName: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Last Name is required',
            'string.min': 'Last Name must be at least 3 characters long',
            'string.max': 'Last Name must be less than 100 characters'
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email'
        }),
        password: Joi.string().min(6).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be less than 100 characters'
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.empty': 'Confirm Password is required',
            'any.only': 'Passwords must match'
        }),
        terms: Joi.boolean().valid(true).required().messages({
            'boolean.base': 'You must accept the terms and conditions'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    
    next();
};

// Signin Validation
const signinValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 100 characters'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    
    next();
};

module.exports = { signupValidation, signinValidation };
