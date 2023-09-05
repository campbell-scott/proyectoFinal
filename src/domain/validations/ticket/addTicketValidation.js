import z from 'zod';

const addTicketValidation = z.object({
    purchaseDateTime: z
        .date()
        .min(new Date(0), { message: 'Purchase date and time are required.' }),
    purchaser: z
        .string()
        .nonempty({ message: 'Product title is required.' })
        .email({ message: "Must be a valid email." }),
    amount: z
        .number({ message: 'Amount must be a number and is required.' })
        .min(1, { message: 'Price must be greater than zero.' }),
    status: z
        .string(),
    products: z
        .array()
        .min(1, { message: 'At least you must add one product.' }),
});

export default addTicketValidation