import { body } from 'express-validator'

export const singupValidation = [
    body('firstName', 'First name is required.')
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('lastName', 'Last name is required.')
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('email', 'Email is required.')
        .trim()
        .notEmpty()
        .isEmail()
        .escape(),
    body('age', 'Age must be a number.')
        .trim()
        .isNumeric()
        .escape(),
    body('password', 'Password is required.')
        .trim()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .escape(),
];