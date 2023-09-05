import ProductModel from '../../../data/models/mongoose/productSchema.js'
import z from 'zod';

const checkExistingCode = async (code) => {
    const existingCode = await ProductModel.findOne({ code });

    if (existingCode) {
      throw new Error(`The code: ${code} is already in use`);
    }

    return true;
};
  
const updateProductValidation = z.object({
    code: z
        .string()
        .refine(async (code) => await checkExistingCode(code), {
            message: 'The code is already in use',
            path: ['code'],
        })
        .optional(),
    title: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    price: z
        .number()
        .positive({ message: 'Price must be a positive number.' })
        .optional(),
    stock: z
        .number()
        .int()
        .positive({ message: 'Stock must be a positive integer.' })
        .optional(),
    category: z
        .string()
        .optional(),
});

export default updateProductValidation