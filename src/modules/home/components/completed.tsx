import DialogNewTask from "@/components/module/dialog/new";
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
    <section className="flex flex-col gap-4">
      <h4 className="text-center p-3 border border-zinc-800 rounded-lg font-semibold">
        Done ({completedTask?.length})
      </h4>

      <article className="flex flex-col gap-2">
        {completedTask?.length >= 1 ? (
          completedTask?.map((task, key) => (
            <section key={key} className="text-sm">
              {task?.name}
            </section>
          ))
        ) : (
          <p className="text-sm">
            {todoTask?.length >= 1
              ? "Oh noo, you don't have anything done."
              : "Yey! you don't have anything to worry about."}
          </p>
        )}
      </article>

      <DialogNewTask status="done" />
    </section>
  );
}
