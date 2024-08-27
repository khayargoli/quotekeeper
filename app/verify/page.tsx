"use client";

import Link from "next/link";
import { SubmitButton } from "../../components/submit-button";
import { Label } from "@/components/ui/label";
import { sacramento } from "../fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../server-actions/actions";


const formSchema = z.object({
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits long." }),
    otp: z
        .string()
        .length(6, { message: "OTP must be exactly 6 digits." })
        .regex(/^\d+$/, { message: "OTP must be a numeric value." }),
});


export default function Verify({
    searchParams,
}: {
    searchParams: { message: string, phoneNumber?: string };
}) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: searchParams.phoneNumber != null ? searchParams.phoneNumber : "",
            otp: ""
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        //         </pre>
        //     ),
        // })

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });
        await verifyOTP(formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center">

            <div className="h-32 p-9 text-start mt-[100px]">
                <Label className={`text-6xl ${sacramento.className}`}>Quote Keeper</Label>

            </div>
            <div className="flex-1 flex flex-col w-[400px] px-8 sm:max-w-md justify-center gap-2">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{" "}
                    Back
                </Link>

                {searchParams?.message && (

                    <Alert>
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle><b>Message</b></AlertTitle>
                        <AlertDescription>
                            {searchParams.message}
                        </AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form className="flex-1 flex flex-col w-full text-foreground m-auto" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-2">

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="phone"
                                                placeholder="9841xxxxxx"
                                                type="phone"
                                                autoCapitalize="none"
                                                autoComplete="phone"
                                                autoCorrect="off"
                                                className="mb-3"
                                                disabled
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={6}
                                                {...field}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter the one-time password sent to your phone.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <br />
                        <SubmitButton
                            className="bg-black rounded-md px-4 py-2 text-white mb-3"
                            pendingText="Signing In..."
                        >
                           Verify
                        </SubmitButton>
                    </form>
                </Form>
            </div>
        </div >
    );
}
