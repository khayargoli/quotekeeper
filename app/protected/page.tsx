
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Suspense } from "react";
import { klee_One, sacramento } from "../fonts";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import prisma from "../db/db";
import QuoteForm from "@/components/QuoteForm";
import QuoteList from "@/components/QuoteList";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default async function Dashboard() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log('supabase user', user);
  if (!user) {
    return redirect("/");
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return (
    <main>
      <div className="float-end">
        <AuthButton userProfile={userProfile!}/>
      </div>
      <div className="h-32 p-9 text-start">
        <Label className={`text-6xl ${sacramento.className}`}>Quote Keeper</Label> <br />
      </div>
      <div className="grid md:grid-cols-[20%_80%] gap-6 md:gap-0 mt-4">
        <div>
          <Card className="w-[350px] ml-6">
            <CardHeader>
              <CardTitle>
                {/* <Avatar className="w-5 h-5 mt-2">
                  <AvatarImage src={userProfile?.profilePicture || ""} />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <br /> */}
                <Label className={`text-xl ${klee_One.className}`}>Welcome, {userProfile?.username}</Label>
                <br /><br />Add a Quote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuoteForm></QuoteForm>
            </CardContent>
          </Card>
        </div>
        <div>
          <Suspense fallback={<h1>Loading Quotes....</h1>}>
            <QuoteList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}