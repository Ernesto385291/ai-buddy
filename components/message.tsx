import ReactMarkdown from "react-markdown";

import { Delete, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

interface MessageProps {
  message: string;
  isLoading?: boolean;
  className?: string;
  onDelete?: () => void;
}

export const Message = ({
  message,
  className,
  isLoading = false,
  onDelete,
}: MessageProps) => {
  return (
    <>
      {isLoading ? (
        <div className="max-w-[70%] bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-sm text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="relative max-w-[70%]">
          <Trash
            className="absolute text-red-500 right-2 top-2 h-4 w-4 cursor-pointer"
            onClick={onDelete}
          />
          <ReactMarkdown
            className={cn(
              " bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-sm text-white",
              className
            )}
          >
            {message}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};
