import { z } from 'zod';

export const UserValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
  role: z.enum(['admin', 'user'], { message: 'Role must be either "admin" or "user"' }),
  avatar: z.string().url().optional(),
});

export const userValidation ={
    UserValidationSchema
}