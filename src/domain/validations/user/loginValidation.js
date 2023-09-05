import z from 'zod';

const loginValidation = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: "Must be a valid email." }),
  password: z
    .string()
    .nonempty({ message: 'Password is required.' })
    .min(6, { message: "Password must be at least 6 characters long." })
});

export default loginValidation;