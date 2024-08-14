import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import { sacramento } from "../fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { signIn } from "../server-actions/actions";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="min-h-screen flex flex-col items-center">
     
      <div className="h-32 p-9 text-start mt-[100px]">
        <Label className={`text-6xl ${sacramento.className}`}>Quote Keeper</Label> 
      </div>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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
        <form className="flex-1 flex flex-col w-full text-foreground m-auto">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-black rounded-md px-4 py-2 text-white mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>


        </form>
      </div>
    </div >
  );
}
