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
import EditForm from "./edit-form";
import PriorityLabel from "../priority-label";
import { Draggable } from "@hello-pangea/dnd";

interface DialogEditTaskProps {
  taskId: string;
  indexKey: number;
  name: string;
  priority: string;
  handleRefetch: () => void;
}

export default function DialogEditTask({
  taskId,
  indexKey,
  name,
  priority,
  handleRefetch,
}: DialogEditTaskProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogTrigger>
        <Draggable draggableId={taskId} index={indexKey}>
          {(provided) => (
            <section
              ref={provided.innerRef}
              className="flex flex-col gap-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 cursor-pointer"
              onClick={() => setOpen(!isOpen)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <PriorityLabel priority={priority} />

              <p className="text-sm text-left">{name}</p>
            </section>
          )}
        </Draggable>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <EditForm
          taskId={taskId}
          inputValue={{ name, priority }}
          onSuccess={() => {
            setOpen(false);
            handleRefetch();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
