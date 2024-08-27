"use server"

import { revalidatePath } from "next/cache";
import prisma from "../db/db";
import { createClient } from "@/utils/supabase/server";
import { User } from "../types/user";
import { redirect } from "next/navigation";
import { UserLoginSchema, UserUpdateSchema } from "../types/zodSchemas";
import { NextApiRequest, NextApiResponse } from 'next';

import jwt, { JwtPayload } from 'jsonwebtoken';

export const createQuote = async (formData: FormData) => {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user !== null) {
        await prisma.quote.create(
            {
                data: {
                    quote: formData.get("quote") as string,
                    quoteFrom: formData.get("quoteFrom") as string,
                    isPublic: formData.get("public") == "true",
                    user: {
                        connect: {
                            phone: user.phone
                        }
                    },
                }
            }
        );

    }


    revalidatePath("/");
}


export const deleteQuote = async (_id: string) => {
    await prisma.quote.delete(
        {
            where: {
                id: _id
            }
        }
    );
    revalidatePath("/");
}

export const createFirstTimeUser = async (user: User) => {

    try {
        await prisma.user.create({
            data: {
                phone: user.phone,
                id: user.user_id
            }
        });
    } catch (e) {
        throw `${e}`
    }

}

export const signIn = async (formData: FormData) => {

    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    console.log(phone);
    console.log(password);

    const { error } = await supabase.auth.signInWithPassword({
        phone: '977' + phone,
        password: password
    });

    if (error) {
        return redirect(`/login?message=${error}`);
    }
    return redirect("/protected");
};

export const verifyOTP = async (formData: FormData) => {

    const phone = formData.get("phoneNumber") as string;
    const token = formData.get("otp") as string;
    const supabase = createClient();
    console.log(phone);
    console.log(token);

    const {
        data: { session },
        error,
    } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: "sms"
    })


    console.log("session", session);

    if (error) {
        return redirect(`/verify?message=${error}`);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user !== null) {
        const new_user: User = { user_id: user.id, phone: user.phone! };
        await createFirstTimeUser(new_user);
        return redirect(`/usersignup?userID=${user.id}`);
    }
};

export const signUp = async (newUser: unknown) => {

    //server-side validation
    const validateUser = UserLoginSchema.safeParse(newUser);
    if (!validateUser.success) {
        let errorMsg = "";
        validateUser.error.issues.forEach((issue) => {
            errorMsg += issue.message + ". \n";
        });

        return {
            error: errorMsg
        };
    }

    const supabase = createClient();
    const phone = '+977' + validateUser.data.phone;
    const password = validateUser.data.password;

    const { data, error } = await supabase.auth.signUp({
        phone: phone,
        password: password,
    })

    console.log('biswas', data);
    if (error) {
        console.log("signup error", error);
        return redirect(`/?message=${encodeURIComponent(error.message)}`);
    }

    return redirect(`/verify?message=Please check your SMS to continue sign in process&phoneNumber=${phone}`);
};



export const updateUser = async (userId: string, user: unknown) => {

    console.log(userId, user)

    if (!userId) {
        return {
            error: "User Id not defined"
        };
    }

    //server-side validation
    const validateUser = UserUpdateSchema.safeParse(user);
    if (!validateUser.success) {
        let errorMsg = "";
        validateUser.error.issues.forEach((issue) => {
            errorMsg += issue.message + ". \n";
        });

        return {
            error: errorMsg
        };
    }

    const profilePic = validateUser.data.profilePicture;
    const username = validateUser.data.username;

    try {
        await prisma.user.update({
            data: {
                profilePicture: profilePic,
                username: username
            },
            where: {
                id: userId
            }
        });

    } catch (error) {
        console.error('Error updating user:', error);
        return redirect(`/usersignup?message=${encodeURIComponent((error as Error).message)}`);
    }

    return redirect(`/protected`);
};

// export const getUserDetail = async function (req: NextApiRequest, res: NextApiResponse) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({ error: 'Authorization header missing' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         // Decode the JWT token using the secret provided by Supabase (public key)
//         const decoded = jwt.decode(token, { complete: true });

//         if (!decoded) {
//             return res.status(401).json({ error: 'Invalid token' });
//         }

//         const userId = decoded.payload.sub; // Extract the user ID from the token

//         const supabase = createClient();
//         const { data: { user } } = await supabase.auth.getUser();
//         console.log('supabase userid', user?.id);
//         console.log('JWT userid', userId);
//         // Fetch the user profile from the database using Prisma
//         const userProfile = await prisma.user.findUnique({
//             where: { id: userId?.toString() },
//         });

//         if (!userProfile) {
//             return res.status(404).json({ error: 'User profile not found' });
//         }

//         res.status(200).json({ profile: userProfile });
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
