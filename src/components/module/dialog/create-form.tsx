"use client";

import React, { SetStateAction, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "@/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "@/hooks/use-toast";

interface CreateFormProps {
  status: string;
  order: number;
  onSuccess: () => void;
}

export default function CreateForm({
  status,
  order,
  onSuccess,
}: CreateFormProps) {
  const initialState = {
    status: "",
    errors: undefined,
  };

  const [formState, formAction] = useFormState(createTask, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (formState?.status === "Success") {
      onSuccess();
      toast({
        title: `New task added to ${status?.split("-")?.join(" ")}.`,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input name="order" value={order} className="hidden" readOnly />
      <Input name="status" value={status} className="hidden" readOnly />
      <section>
        <Input
          id="input-name"
          type="text"
          name="name"
          placeholder="wash dishes"
          className={`${
            formState?.errors?.name ? "!border-red-300" : "!border-zinc-800"
          } border-zinc-800 duration-200`}
        />
        {formState?.errors?.name && (
          <small className="text-red-300">{formState?.errors?.name}</small>
        )}
      </section>
      <section>
        <Select name="priority">
          <SelectTrigger
            className={`${
              formState?.errors?.priority
                ? "!border-red-300"
                : "!border-zinc-800"
            } border-zinc-800 duration-200`}
          >
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        {formState?.errors?.priority && (
          <small className="text-red-300">{formState?.errors?.priority}</small>
        )}
      </section>
      <section className="ml-auto">
        <Button aria-disabled={pending}>Create</Button>
      </section>
    </form>
  );
}
