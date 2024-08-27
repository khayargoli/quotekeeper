import "./globals.css";
import { roboto } from "./fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Quote Keeper",
  description: "A keeper of quotes.✨",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <main className="h-full">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
