"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useBoundStore } from "@/stores/useBoundStore";

type FormValues = {
  personality: string;
};

export const PersonalityModal = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [open, setOpen] = useState(false);

  const { setPersonality } = useBoundStore();

  const onSubmit = (data: FormValues) => {
    setPersonality(data.personality);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
        >
          Agregar personalidad
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Agrega una personalidad a tu asistente</DialogTitle>
            <DialogDescription>
              Agrega una personalidad a tu asistente para que te ayude a
              resolver tus dudas de una manera más especializada y personalizada
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full gap-1.5">
            <Label className="mb-2" htmlFor="personality">
              Personalidad
            </Label>
            <Textarea
              id="personality"
              placeholder="Escribe una personalidad"
              {...register("personality", { required: true })}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
