"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { UserButton, useUser } from "@clerk/nextjs";
import { Paintbrush, Stars } from "lucide-react";
import { Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBoundStore } from "@/stores/useBoundStore";

type Message = {
  role: string;
  content: string;
};

type FormValues = {
  message: string;
};

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { setPersonality, personality, setChat, chat } = useBoundStore();
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [processing, setProcessing] = useState({
    isLoading: false,
    error: null,
  });
  const [messages, setMessages] = useState<Message[]>(chat);

  const scrollToBottom = () => {
    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  };

  useEffect(() => {
    setChat(messages);
    scrollToBottom();
  }, [messages, setChat]);

  useEffect(() => {
    if (chat.length === 0) {
      const systemMessage = personality
        ? { role: "system", content: personality }
        : {
            role: "system",
            content:
              "You are a helpful assistant that can answer questions on anything, first ask the user to choose a topic or a theme.",
          };
      handleNewMessage(systemMessage);
    }
  }, [chat, personality]);

  const onSubmit = (data: FormValues) => {
    if (data.message.trim().length !== 0) {
      setProcessing({ isLoading: true, error: null });
      const userMessage = { role: "user", content: data.message };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      reset();
      axios
        .post("/api/chat", { messages: newMessages })
        .then((response) => {
          setProcessing({ isLoading: false, error: null });
          handleNewMessage(response.data);
        })
        .catch((error) => {
          setProcessing({ isLoading: false, error });
        });
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <main className="flex-1 w-full md:w-4/6 h-full flex flex-col items-center justify-between space-y-4">
      <nav className="flex items-center justify-end w-full bg-white rounded-2xl p-2 space-x-2">
        <Stars className="h-6 w-6 text-blue-400" />
        <UserButton />
      </nav>

      {isLoaded && (
        <div
          className="bg-white p-3 w-full rounded-2xl shadow flex-1 overflow-y-scroll"
          ref={chatScrollRef}
        >
          <aside className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <Message
                key={index}
                user={user}
                message={message}
                onDelete={() => {
                  setMessages((prevMessages) =>
                    prevMessages.filter((_, i) => i !== index)
                  );
                }}
              />
            ))}
            {processing.isLoading && (
              <Message isLoading={processing.isLoading} />
            )}
          </aside>
        </div>
      )}

      <aside className="w-full flex items-center space-x-2">
        <Button
          onClick={() => {
            setPersonality("");
            setMessages([]);
            setChat([]);
            reset();
          }}
          className="rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-600"
        >
          <Paintbrush className="w-6 h-6 md:mr-2" />
          <span className="hidden md:inline-block">Nuevo tema</span>
        </Button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex items-center space-x-2"
        >
          <Input
            className="flex-1 bg-white border-none rounded-full"
            autoComplete="off"
            placeholder="Empieza haciendo una pregunta"
            {...register("message")}
          />
        </form>
      </aside>
    </main>
  );
}
