import "./globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

import { NavBar } from "@/components/nav-bar";

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
        <body className={inter.className}>
          <SignedIn>
            <NavBar />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
