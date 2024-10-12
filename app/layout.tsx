import type { Metadata } from "next";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import { BlocksIcon } from "lucide-react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/lib/components/mode-toggle";
import { Button } from "@/lib/components/ui/button";

import Providers from "@/lib/providers";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web builder",
  description: "Testing a web builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          robotoMono.className,
          "flex flex-col min-h-dvh bg-white dark:bg-zinc-950 antialiased"
        )}
      >
        <Providers>
          <header className="h-16 flex items-center justify-between sticky top-0 z-50 w-full border-b px-4 border-zinc-200 dark:border-zinc-800">
            <Link href="/">Web Builder</Link>

            <section className="flex gap-2">
              <nav>
                <Button variant="link" asChild>
                  <Link href="/builder">
                    <BlocksIcon className="w-4 h-4 mr-2" /> Builder
                  </Link>
                </Button>
              </nav>
              <ModeToggle />
            </section>
          </header>

          {children}
        </Providers>
      </body>
    </html>
  );
}
