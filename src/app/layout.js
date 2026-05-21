import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Component/Shared/Navbar/Navbar";
import Footer from "@/Component/Shared/Footer/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue | Home",
  description:
    "MediQueue is a tutor booking web application that lets students register, log in, browse tutors, book sessions by subject and availability, and manage schedules using digital session tokens.",
};

export default async function RootLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar user={session?.user} />

          {children}

          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
