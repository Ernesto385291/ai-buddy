import ReactMarkdown from "react-markdown";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface MessageProps {
  message: string;
  isLoading?: boolean;
  className?: string;
}

export const Message = ({
  message,
  className,
  isLoading = false,
}: MessageProps) => {
  return (
    <>
      {isLoading ? (
        <div className="max-w-[70%] bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-sm text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <ReactMarkdown
          className={cn(
            "max-w-[70%] bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-sm text-white",
            className
          )}
        >
          {message}
        </ReactMarkdown>
      )}
    </>
  );
};
