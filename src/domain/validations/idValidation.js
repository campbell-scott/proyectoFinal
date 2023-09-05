import z from 'zod';

const idValidation = z.object({
  id: z
    .string()
    .length(24, { message: "Invalid id." })
});

export default idValidation;