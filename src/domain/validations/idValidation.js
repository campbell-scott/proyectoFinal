import { param } from 'express-validator'

export const idValidation = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Empty id')
        .isMongoId()
        .withMessage('Invalid id')
        .escape(),
];