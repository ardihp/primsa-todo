"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./edit-form";
import PriorityLabel from "../priority-label";

interface DialogEditTaskProps {
  taskId: string;
  name: string;
  priority: string;
}

export default function DialogEditTask({
  taskId,
  name,
  priority,
}: DialogEditTaskProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogTrigger>
        <section
          className="flex flex-col gap-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 cursor-pointer"
          onClick={() => setOpen(!isOpen)}
        >
          <PriorityLabel priority={priority} />

          <p className="text-sm text-left">{name}</p>
        </section>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <EditForm
          taskId={taskId}
          inputValue={{ name, priority }}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
