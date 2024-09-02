import React from "react";
import prisma from "@/lib/db";
import DialogNewTask from "@/components/module/dialog/new";

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
    <section className="flex flex-col gap-4">
      <h4 className="text-center p-3 border border-zinc-800 rounded-lg font-semibold">
        To Do ({todoTask?.length})
      </h4>

      <article className="flex flex-col gap-2">
        {todoTask?.length >= 1 ? (
          todoTask?.map((task, key) => (
            <section key={key} className="text-sm">
              {task?.name}
            </section>
          ))
        ) : (
          <p className="text-sm">{"Yey! you don't have any task to do."}</p>
        )}
      </article>

      <DialogNewTask status="to-do" />
    </section>
  );
}
