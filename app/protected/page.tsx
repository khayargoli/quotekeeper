
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import QuoteForm from "@/components/quoteForm";
import QuoteList from "@/components/quoteList";
import { Suspense } from "react";
import { sacramento  } from "../fonts";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default async function ProtectedPage() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  return (
    <main>
      <AuthButton />
      <div className="h-32 p-9 text-start">
        <Label className={`text-6xl ${sacramento.className}`}>Quote Keeper</Label>
      </div>
      <div className="grid md:grid-cols-[25%_75%] gap-6 md:gap-0">
        <div>
          <Card className="w-[350px] ml-6">
            <CardHeader>
              <CardTitle>Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <QuoteForm></QuoteForm>
            </CardContent>
          </Card>
        </div>
        <div>
          <Suspense  fallback={<h1>Loading Quotes....</h1>}>
            <QuoteList  />
          </Suspense>
        </div>
        <div>
          {/* <pre>{JSON.stringify(user , null , 2)}</pre> */}
        </div>
      </div>
    </main>
  )
}