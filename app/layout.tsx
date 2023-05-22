import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Buddy",
  description:
    "AI Buddy is the ultimate platform for creating and solving problems with different AI models. With our user-friendly chat interface, you can easily create intelligent conversations and collaborate with others to solve complex challenges. Join the AI revolution and unleash the power of artificial intelligence together with AI Buddy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            (cn(inter.className),
            "bg-gradient-to-r from-purple-400 to-yellow-400 p-5 h-screen flex flex-col items-center justify-center")
          }
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
