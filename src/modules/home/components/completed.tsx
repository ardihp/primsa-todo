import DialogNewTask from "@/components/module/dialog/new";
import TaskCard from "@/components/module/task-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db";
import React from "react";

export default async function CompletedSection() {
  const completedTask = await prisma.task.findMany({
    where: {
      status: {
        equals: "done",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const todoTask = await prisma.task.findMany({
    where: {
      status: {
        equals: "to-do",
      },
    },
  });

  return (
    <section className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg h-fit">
      <h4 className="font-semibold">
        Done{" "}
        <span className="text-white/60 text-xs">{completedTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 mb-3 ${
          completedTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <article className="flex flex-col gap-3">
          {completedTask?.length >= 1 ? (
            completedTask?.map((task, key) => (
              <TaskCard
                key={key}
                taskId={task?.id}
                name={task?.name}
                priority={task?.priority}
              />
            ))
          ) : (
            <p className="text-sm">
              {todoTask?.length >= 1
                ? "Oh noo, you haven't done anything."
                : "Yey! you don't have task to worry about."}
            </p>
          )}
        </article>
      </ScrollArea>

      <DialogNewTask status="done" />
    </section>
  );
}
