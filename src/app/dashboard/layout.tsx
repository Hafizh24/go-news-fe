import type { Metadata } from "next";
import "../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Layers3, User } from "lucide-react";
import ButtonLogout from "./(home)/components/button-logout";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <nav className="border-b border-muted p-5">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold text-primary">GoNews</span>
        </div>
      </nav>

      <section className="flex flex-row gap-5 items-start flex-nowrap">
        <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
          <div className="space-y-2">
            <Button variant={"ghost"} asChild className="w-full justify-start">
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="uppercase text-xs font-bold">Master Data</div>
            <Button variant={"ghost"} asChild className="w-full justify-start">
              <Link href={"/dashboard/category"}>
                <Layers3 className="mr-2 w-4 h-4" />
                Category
              </Link>
            </Button>
            <Button variant={"ghost"} asChild className="w-full justify-start">
              <Link href={"/dashboard/content"}>
                <BookOpen className="mr-2 w-4 h-4" />
                Content
              </Link>
            </Button>
            <Button variant={"ghost"} asChild className="w-full justify-start">
              <Link href={"/dashboard/user"}>
                <User className="mr-2 w-4 h-4" />
                User
              </Link>
            </Button>
          </div>
          <ButtonLogout />
        </section>

        <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
          {children}
        </section>
      </section>
    </section>
  );
}
