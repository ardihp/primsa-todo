import React from "react";
import prisma from "@/lib/db";
import DialogNewTask from "@/components/module/dialog/new";
import TaskCard from "@/components/module/task-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function TodoSection() {
  const todoTask = await prisma.task.findMany({
    where: {
      status: {
        equals: "to-do",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg h-fit">
      <h4 className="font-semibold">
        To Do <span className="text-white/60 text-xs">{todoTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 mb-3 ${
          todoTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <article className="flex flex-col gap-3">
          {todoTask?.length >= 1 ? (
            todoTask?.map((task, key) => (
              <TaskCard
                key={key}
                taskId={task?.id}
                name={task?.name}
                priority={task?.priority}
              />
            ))
          ) : (
            <p className="text-sm">{"Yey! you don't have any task to do."}</p>
          )}
        </article>
      </ScrollArea>

      <DialogNewTask status="to-do" />
    </section>
  );
}
