import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

export default async function AuthButton({ userProfile }: { userProfile: User }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {/* <form action={signOut}>
        */}
      {/* <Button>
            <ExitIcon />&nbsp;&nbsp;Logout
          </Button> */}
      <div className="flex items-center mt-3 mr-4">

        <DropdownMenu >
          <DropdownMenuTrigger className=" outline-none">
            <Avatar className="w-12 h-12 mt-2">
              <AvatarImage src={userProfile?.profilePicture || ""} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem ><PersonIcon />&nbsp;&nbsp;My Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form>
              <DropdownMenuItem><ExitIcon />&nbsp;&nbsp;<button formAction={signOut}>Logout</button></DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div >
      {/*
      </form> */}
    </div >
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
