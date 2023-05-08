import { UserButton, SignedIn } from "@clerk/nextjs";

import { PersonalityModal } from "./personality-modal";

export const NavBar = () => {
  return (
    <nav className="w-full h-16 sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5">
      <h1 className="text-xl font-bold">AI Buddy</h1>
      <aside className="flex items-center space-x-4">
        <PersonalityModal />

        <SignedIn>
          <UserButton />
        </SignedIn>
      </aside>
    </nav>
  );
};
