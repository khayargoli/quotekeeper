"use server"

import { revalidatePath } from "next/cache";
import prisma from "../db/db";
import { createClient } from "@/utils/supabase/server";
import { User } from "../types/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserLoginSchema } from "../types/zodSchemas";


export const createQuote = async (formData: FormData) => {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user !== null) {
        const new_user: User = { user_id: user.id, email: user.email!, email_verified: true };
        await prisma.quote.create(
            {
                data: {
                    quote: formData.get("quote") as string,
                    quoteFrom: formData.get("quoteFrom") as string,
                    user: {
                        connect: {
                            email: new_user.email
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
                email: user.email,
                id: user.user_id,
                email_verified: user.email_verified
            }
        });
    } catch (e) {
        throw `${e}`
    }

}



export const signIn = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error}`);
    }

    return redirect("/protected");
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

    const origin = headers().get("origin");
    const email = validateUser.data.email;
    const password = validateUser.data.password;


    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.log("signup error", error);
        return redirect(`/?message=${error}`);
    }

    return redirect("/?message=Please check your email to continue sign in process");
};
