'use client';

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { klee_One, sacramento } from "../fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, UpdateIcon } from "@radix-ui/react-icons";
import { updateUser } from "../server-actions/actions";
import { Input } from "@/components/ui/input";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserUpdateSchema } from "../types/zodSchemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";


export default function UserSignUp({
    searchParams,
}: {
    searchParams: { message: string, phoneNumber?: string, userID: string };
}) {
    const { toast } = useToast();
    const [username, setUsername] = useState<string>('');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleProfilePictureUpload = (url: string) => {
        setProfilePictureUrl(url);
    };

    const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const user = { profilePicture: profilePictureUrl, username: username };
            const validateUser = UserUpdateSchema.safeParse(user);

            if (!validateUser.success) {
                let errorMsg = "";
                validateUser.error.issues.forEach((issue) => {
                    errorMsg += issue.message + ". \n";
                });

                toast({
                    title: "Ops!",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md text-md">
                            {errorMsg}
                        </pre>
                    ),
                });
                return;
            }
            const response = await updateUser(searchParams.userID, validateUser.data);
            if (response.error) {
                toast({
                    title: "Uh oh!",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md text-md">
                            {response?.error}
                        </pre>
                    ),
                });
            }
            setLoading(false);
        } catch (error: any) {
            console.error('Error during signup process:', error.message);
            toast({
                title: "Uh oh!",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md text-md">
                        {error?.message}
                    </pre>
                ),
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center">

            <div className="h-32 p-9 text-start mt-[100px]">
                <Label className={`text-6xl ${sacramento.className}`}>Welcome</Label>
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

                <h1 className={`text-xl ${klee_One.className} text-center`}>Mind giving us some info?</h1>
                <br />
                <form className="flex-1 flex flex-col w-full text-foreground m-auto">
                    <Label className="text-md  ${klee_One.className}" htmlFor="phone">
                        Profile Picture
                    </Label>
                    <br />
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={profilePictureUrl} />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>

                    <br />
                    <ProfilePictureUpload
                        userId={searchParams.userID}
                        onUpload={handleProfilePictureUpload}
                    />

                    <br />
                    <Label className="text-md" htmlFor="password">
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Enter a new username"
                        type="username"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        className="mb-5"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <Button
                        onClick={handleSave} disabled={loading}
                        className="bg-black rounded-md px-4 py-2 text-white mb-3"
                    >
                        {loading && <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Continue
                    </Button >
                </form>
            </div>
        </div >
    );
}
