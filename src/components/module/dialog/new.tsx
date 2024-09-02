import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface DialogNewTaskProps {
  status: string;
}

export default function DialogNewTask({ status }: DialogNewTaskProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center bg-white hover:bg-white/90 duration-200 p-2 rounded-md">
        <p className="text-zinc-900 font-semibold text-sm">Add New</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form action={createTask} className="flex flex-col gap-4">
          <Input name="status" value={status} className="hidden" />
          <Input type="text" name="name" placeholder="wash dishes" required />
          <Select name="priority" required>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
