"use client";

import axios from "axios";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { SignedIn } from "@clerk/nextjs";

import { Paintbrush } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { Input } from "@/components/ui/input";

import { useBoundStore } from "@/stores/useBoundStore";

import { cn } from "@/lib/utils";

type Message = {
  role: string;
  content: string;
};

type FormValues = {
  message: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { setPersonality, personality, setChat, chat } = useBoundStore();

  const [processing, setProcessing] = useState({
    isLoading: false,
    error: null,
  });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chat.length > 0) {
      setMessages(chat);
    }
  }, [chat]);

  useEffect(() => {
    setChat(messages);
  }, [messages]);

  useEffect(() => {
    if (chat.length === 0) {
      if (personality) {
        setMessages([
          {
            role: "system",
            content: personality,
          },
        ]);
      } else {
        setMessages([
          {
            role: "system",
            content:
              "You are a helpful assistant that can answer questions anything, first ask the user to choose a topic or a theme.",
          },
        ]);
      }
    }
  }, [personality]);

  const onSubmit = (data: FormValues) => {
    if (data.message.trim().length !== 0) {
      setProcessing({ isLoading: true, error: null });
      setMessages([...messages, { role: "user", content: data.message }]);
      reset();
      axios({
        method: "post",
        url: "/api/chat",
        data: {
          messages: [...messages, { role: "user", content: data.message }],
        },
      })
        .then((response) => {
          setProcessing({ isLoading: false, error: null });
          setMessages([
            ...messages,
            { role: "user", content: data.message },
            response.data,
          ]);
        })
        .catch((error) => {
          setProcessing({ isLoading: false, error: error });
        });
    }
  };

  return (
    <>
      <SignedIn>
        <NavBar />
      </SignedIn>
      <main className="relative bg-gradient-to-br from-white to-blue-300 flex min-h-[calc(100vh-64px)] flex-col items-center justify-between p-4 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <ScrollArea className="h-[75vh] w-full md:w-9/12">
          <aside className="flex flex-col space-y-2 pr-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === "system" && "hidden",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <Message
                  onDelete={() => {
                    //Delete the message and all the messages after it
                    setMessages(messages.slice(0, index));
                  }}
                  message={message.content}
                />
              </div>
            ))}
            {processing.isLoading && (
              <div className="flex justify-start">
                <Message message="..." isLoading={processing.isLoading} />
              </div>
            )}
          </aside>
        </ScrollArea>

        <div className="absolute bottom-8 flex w-11/12 md:w-9/12 items-center space-x-2">
          <Button
            onClick={() => {
              setPersonality("");
              setMessages([]);
              setChat([]);
              reset();
            }}
            className="rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600"
          >
            <Paintbrush className="w-6 h-6 mr-2" />
            Nuevo tema
          </Button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex items-center space-x-2"
          >
            <Input
              className="flex-1 bg-white rounded-full"
              autoComplete="off"
              placeholder="Empieza haciendo una pregunta"
              {...register("message")}
            />
          </form>
        </div>
      </main>
    </>
  );
}
