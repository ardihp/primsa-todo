import React from "react";
import prisma from "@/lib/db";
import DialogNewTask from "@/components/module/dialog/new";

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
    <section className="flex flex-col gap-4">
      <h4 className="text-center p-3 border border-zinc-800 rounded-lg font-semibold">
        In Progress ({progressTask?.length})
      </h4>

      <article className="flex flex-col gap-2">
        {progressTask?.length >= 1 ? (
          progressTask?.map((task, key) => (
            <section key={key} className="text-sm">
              {task?.name}
            </section>
          ))
        ) : (
          <p className="text-sm">
            {todoTask?.length >= 1
              ? "Oh noo, you don't have anything progress yet."
              : "Yey! you don't have anything to progress yet."}
          </p>
        )}
      </article>

      <DialogNewTask status="in-progress" />
    </section>
  );
}
