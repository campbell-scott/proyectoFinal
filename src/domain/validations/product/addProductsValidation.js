import ProductModel from '../../../data/models/mongoose/productSchema.js'
import z from 'zod';

const checkExistingCode = async (code) => {
    const existingCode = await ProductModel.findOne({ code });

    if (existingCode) {
      throw new Error(`The product code is already in use`);
    }

    return true;
};
  
const addProductValidation = z.object({
    code: z
        .string()
        .nonempty({ message: 'Product code is required.' })
        .refine(async (code) => await checkExistingCode(code), {
            message: 'The code is already in use',
            path: ['code'],
        }),
    title: z
        .string()
        .nonempty({ message: 'Product title is required.' }),
    description: z
        .string()
        .nonempty({ message: 'Product description is required.' })
        .max(300, { message: '300 characters maximum.' }),
    price: z
        .number()
        .min(1, { message: 'Price must be greater than zero.' }),
    stock: z
        .number()
        .int()
        .min(1, { message: 'Stock must be greater than zero and integer.' }),
    category: z.string().nonempty({ message: 'The category is required.' }),
});

export default addProductValidation