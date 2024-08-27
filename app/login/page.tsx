import Link from "next/link";
import { SubmitButton } from "../../components/submit-button";
import { Label } from "@/components/ui/label";
import { klee_One, sacramento } from "../fonts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { signIn } from "../server-actions/actions";
import { Input } from "@/components/ui/input";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string, phoneNumber?: string };
}) {

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

        <h1 className={`text-xl ${klee_One.className} text-center`}>Login</h1>
        <form className="flex-1 flex flex-col w-full text-foreground m-auto">
          <Label className="text-md  ${klee_One.className}" htmlFor="phone">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            type="phone"
            autoCapitalize="none"
            autoComplete="phone"
            autoCorrect="off"
            className="mb-3"
            defaultValue={searchParams.phoneNumber || ""}
            disabled={searchParams.phoneNumber != null}
          />
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            className="mb-5"
          />
          <SubmitButton
            formAction={signIn}
            className="bg-black rounded-md px-4 py-2 text-white mb-3"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
        </form>
      </div>
    </div >
  );
}
