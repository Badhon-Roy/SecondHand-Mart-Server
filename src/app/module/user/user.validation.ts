import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
    role: z.enum(['admin', 'user']).default('user'),
    avatar: z.string().url().optional(),
  })
});

export const userValidation = {
  registerUserValidationSchema
}