import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().min(1, 'Image is required'),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
};
