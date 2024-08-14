"use client"

import * as React from "react"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Icons } from "./ui/icons"
import { Input } from "./ui/input"
import { signUp } from "@/app/server-actions/actions"

import { useToast } from "./ui/use-toast"
import { UserLoginSchema } from "@/app/types/zodSchemas"


export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = { email: formData.get("email"), password: formData.get("password") };
    const validateUser = UserLoginSchema.safeParse(user);

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
    setIsLoading(true);
    const response = await signUp(validateUser.data);
    if (response?.error) {
      toast({
        title: "Uh oh!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md text-md">
            {response?.error}
          </pre>
        ),
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  )
}
