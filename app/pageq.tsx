import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import QuoteForm from "@/components/QuoteForm";
import { Toaster } from "@/components/ui/toaster";
import QuoteList from "@/components/QuoteList";
import { Suspense } from "react";
import { sacramento  } from "./fonts";

export default async function Home() {
  return (
    <main>
      <Toaster />
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
      </div>
    </main>
  )
}