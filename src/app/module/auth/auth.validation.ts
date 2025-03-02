import { z } from "zod";

const loginUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password should be at least 6 characters' })
    }),
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "Refresh token is required!"
        })
    })
})

export const AuthValidation = {
    loginUserValidationSchema,
    refreshTokenValidationSchema
}