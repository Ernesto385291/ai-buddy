import ReactMarkdown from "react-markdown";

import { Trash, Delete, Loader2 } from "lucide-react";
import { UserResource } from "@clerk/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface MessageProps {
  message?: {
    role: string;
    content: string;
  };
  user?: UserResource | null;
  isLoading?: boolean;
  className?: string;
  onDelete?: () => void;
}

export const Message = ({
  user,
  message,
  onDelete,
  className,
  isLoading = false,
}: MessageProps) => {
  return (
    <>
      {isLoading ? (
        <div className="w-full p-3 rounded-lg flex space-x-2 items-center justify-start bg-blue-50">
          <Loader2 className="h-4 w-4 text-black animate-spin" />
        </div>
      ) : (
        <div
          className={cn(
            "w-full p-3 rounded-lg flex space-x-2 items-center md:p-5",
            message?.role === "system" && "hidden",
            message?.role === "user"
              ? "text-end justify-end"
              : "text-start justify-start bg-blue-50"
          )}
        >
          {/* <Trash
            className="absolute text-red-500 right-2 top-2 h-4 w-4 cursor-pointer"
            onClick={onDelete}
          /> */}
          <ReactMarkdown className={cn(className, "text-sm md:text-base")}>
            {message?.content || ""}
          </ReactMarkdown>
          {message?.role === "user" && (
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      )}
    </>
  );
};
