import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email().trim().min(2, { message: "Email must be atleast 2 characters long." }),
    password: z.string().trim().min(6, { message: "Password must be atleast 6 characters long." })
})
