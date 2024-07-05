import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "JNSQ",
  description: "The Art Gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {<TRPCReactProvider>{children}</TRPCReactProvider>}
      </body>
    </html>
  );
}
