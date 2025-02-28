import { z } from "zod";

const loginUserValidationSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
})

export const AuthValidation = {
    loginUserValidationSchema
}