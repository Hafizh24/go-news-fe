import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Go News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
