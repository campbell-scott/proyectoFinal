import UserModel from '../../../data/models/mongoose/userSchema.js';
import z from 'zod';

const checkExistingEmail = async (email) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(`The email ${email} is already in use`);
    }
    return true;
};
  
const updateUserValidation = z.object({
    firstName: z
        .string()
        .max(10, { message: '10 characters maximum.' })
        .optional(),
    lastName: z
        .string()
        .max(10, { message: '10 characters maximum.' })
        .optional(),
    age: z
        .number()
        .int({ message: 'Must be a whole number.' })
        .optional(),
    email: z
        .string()
        .email({ message: 'Must be a valid email.' })
        .refine(async (email) => await checkExistingEmail(email), {
        message: 'The email is already in use',
        path: ['email'],
        })
        .optional(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .optional(),
});

export default updateUserValidation;