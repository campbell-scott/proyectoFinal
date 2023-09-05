import UserModel from '../../../data/models/mongoose/userSchema.js';
import z from 'zod';

const checkExistingEmail = async (email) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(`The email ${email} is already in use`);
    }
    return true;
};
  
const singUpValidation = z.object({
    firstName: z
        .string()
        .nonempty({ message: 'firstName is required.' })
        .max(10, { message: '10 characters maximum.' }),
    lastName: z
        .string()
        .nonempty({ message: 'lastName is required.' })
        .max(10, { message: '10 characters maximum.' }),
    age: z
        .number()
        .int({ message: 'Must be a whole number.' })
        .optional(),
    email: z
        .string()
        .nonempty({ message: 'Email is required.' })
        .email({ message: 'Must be a valid email.' })
        .refine(async (email) => await checkExistingEmail(email), {
        message: 'The email is already in use',
        path: ['email'],
        }),
    password: z
        .string()
        .nonempty({ message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' }),
});

export default singUpValidation;