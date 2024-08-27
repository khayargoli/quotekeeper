import { z } from "zod";

export const UserLoginSchema = z.object({
    phone: z.string().trim().min(10, { message: "Phone must be exactly 10 digits long." }).max(10, { message: "Phone must be exactly 10 digits long." }),
    password: z.string().trim().min(6, { message: "Password must be atleast 6 characters long." })
});



export const UserUpdateSchema = z.object({
    username: z.string().min(3, { message: "Username should be at least 3 characters long." }),
    profilePicture: z.string().min(1, { message: "Please upload a profile picture." })
});

