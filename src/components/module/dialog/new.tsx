"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateForm from "./create-form";

interface DialogNewTaskProps {
  status: string;
}

export default function DialogNewTask({ status }: DialogNewTaskProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogTrigger
        className="flex items-center justify-center bg-white hover:bg-white/90 duration-200 p-2 rounded-md"
        onClick={() => setOpen(!isOpen)}
      >
        <p className="text-zinc-900 font-semibold text-sm">Add New</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CreateForm status={status} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
