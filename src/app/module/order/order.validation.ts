import { z } from "zod";


const orderCreateValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        city: z.string().min(1, "City is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        postalCode: z.string().min(1, "Postal code is required"),
        price: z.number().min(1, "Price is required"),
        region: z.string().min(1, "Region is required"),
        streetNameAndHouseNo: z.string().min(1, "Street name and house number are required"),
        status: z.enum(["pending", "completed"]).default("pending"),
        itemID: z.string().min(1, "Item ID is required"),
        buyerID: z.string().min(1, "Buyer ID is required"),
        sellerID: z.string().min(1, "Seller ID is required"),
        session: z.string().optional()
    })
});

export const orderValidation = {
    orderCreateValidationSchema
}