import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-yellow-400 flex flex-col items-center justify-center min-h-screen py-2">
      <SignUp />
    </div>
  );
}
