import { Metadata } from "next"
import Link from "next/link"

import { Label } from "@/components/ui/label"
import { sacramento } from "./fonts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"
import { UserAuthForm } from "@/components/UserAuthForm"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function Page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>

      <div className="relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-[400px] md:h-full flex flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Label className={`text-5xl ${sacramento.className} mb-5`}>Quote Keeper</Label>
          </div>
          <div className="relative z-20  mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Do you ever feel the need to gather all your favorite quotes in one place?
              </p>
              <footer className="text-sm"></footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 container mt-5">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the details below to create your account
              </p>
            </div>
            <UserAuthForm />
            {searchParams?.message && (
              <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle><b>Message</b></AlertTitle>
                <AlertDescription>
                  {searchParams.message}
                </AlertDescription>
              </Alert>
            )}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <br />
            <div className="flex justify-center text-sm">Already have an account?<Link className="underline underline-offset-4 hover:text-primary text-sm "
              href="/login"
            >&nbsp;Login here</Link></div>
          </div>
        </div>
      </div >
    </>
  )
}
