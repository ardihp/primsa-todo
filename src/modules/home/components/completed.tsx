import { getCompletedTask } from "@/actions/actions";
import DialogEditTask from "@/components/module/dialog/edit";
import DialogNewTask from "@/components/module/dialog/new";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useContext, useEffect, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskContext from "@/context/task-context";

export default function CompletedSection() {
  const [completedTask, setCompletedTask] = useState<any>([]);
  const [refetch, setRefetch] = useState(0);
  const { refetchCount, refetchTask } = useContext(TaskContext);

  useEffect(() => {
    getCompletedTask().then((res) => setCompletedTask(res));
  }, [refetch]);

  useEffect(() => {
    if (refetchTask?.includes("done")) {
      getCompletedTask().then((res) => setCompletedTask(res));
    }
  }, [refetchTask, refetchCount]);

  return (
    <section className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg h-fit">
      <h4 className="font-semibold">
        Done{" "}
        <span className="text-white/60 text-xs">{completedTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 ${
          completedTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <Droppable droppableId="done">
          {(provided) => (
            <article
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {completedTask?.length >= 1 ? (
                completedTask?.map((task: any, key: number) => (
                  <DialogEditTask
                    key={task?.id}
                    indexKey={key}
                    taskId={task?.id}
                    name={task?.name}
                    priority={task?.priority}
                    handleRefetch={() => setRefetch((prev) => prev + 1)}
                  />
                ))
              ) : (
                <p
                  className={`text-sm ${
                    completedTask?.length >= 1 ? "hidden" : "inline"
                  }`}
                >
                  {"You don't have completed task."}
                </p>
              )}
              {provided.placeholder}
            </article>
          )}
        </Droppable>
      </ScrollArea>

      <DialogNewTask
        status="done"
        order={completedTask?.length + 1}
        handleRefetch={() => setRefetch((prev) => prev + 1)}
      />
    </section>
  );
}
