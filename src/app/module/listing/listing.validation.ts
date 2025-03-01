import { z } from "zod";

const createListingValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().min(1, 'Description is required'),
        price: z.number().min(0, 'Price must be a non-negative number'),
        condition: z.enum(['new', 'used', 'refurbished'], { message: 'Invalid condition value' }),
        images: z.array(z.string()).nonempty('Images are required'),
        userID: z.string().min(1, 'User ID is required'),
        status: z.enum(['available', 'sold'], { message: 'Invalid status value' }),
    })
});

export const listingValidations = {
    createListingValidationSchema
}