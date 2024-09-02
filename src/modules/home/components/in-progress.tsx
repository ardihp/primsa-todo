import React from "react";
import prisma from "@/lib/db";
import DialogNewTask from "@/components/module/dialog/new";
import TaskCard from "@/components/module/task-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function InProgressSection() {
  const progressTask = await prisma.task.findMany({
    where: {
      status: {
        equals: "in-progress",
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
        In Progress{" "}
        <span className="text-white/60 text-xs">{progressTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 mb-3 ${
          progressTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <article className="flex flex-col gap-3">
          {progressTask?.length >= 1 ? (
            progressTask?.map((task, key) => (
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
                ? "Oh noo, your task doesn't progress yet."
                : "Yey! you don't have task to progress yet."}
            </p>
          )}
        </article>
      </ScrollArea>

      <DialogNewTask status="in-progress" />
    </section>
  );
}
