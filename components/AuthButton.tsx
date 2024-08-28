import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
      <div className="flex items-center m-4 p-1">
        <DropdownMenu >
          <DropdownMenuTrigger className=" outline-none">
            <Avatar className="w-12 h-12 mt-2">
              <AvatarImage src={userProfile?.profilePicture || ""} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem >My Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
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
