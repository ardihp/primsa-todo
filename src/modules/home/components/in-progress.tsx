import React, { useContext, useEffect, useState } from "react";
import DialogNewTask from "@/components/module/dialog/new";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProgressTask } from "@/actions/actions";
import DialogEditTask from "@/components/module/dialog/edit";
import { Droppable } from "@hello-pangea/dnd";
import TaskContext from "@/context/task-context";

export default function InProgressSection() {
  const [progressTask, setProgressTask] = useState<any>([]);
  const [refetch, setRefetch] = useState(0);
  const { refetchCount, refetchTask } = useContext(TaskContext);

  useEffect(() => {
    getProgressTask().then((res) => setProgressTask(res));
  }, [refetch]);

  useEffect(() => {
    if (refetchTask?.includes("in-progress")) {
      getProgressTask().then((res) => setProgressTask(res));
    }
  }, [refetchTask, refetchCount]);

  return (
    <section className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg h-fit">
      <h4 className="font-semibold">
        In Progress{" "}
        <span className="text-white/60 text-xs">{progressTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 ${
          progressTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <Droppable droppableId="in-progress">
          {(provided) => (
            <article
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {progressTask?.length >= 1 ? (
                progressTask?.map((task: any, key: number) => (
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
                    progressTask?.length >= 1 ? "hidden" : "inline"
                  }`}
                >
                  {"You don't have task to progress yet."}
                </p>
              )}
              {provided.placeholder}
            </article>
          )}
        </Droppable>
      </ScrollArea>

      <DialogNewTask
        status="in-progress"
        order={progressTask?.length + 1}
        handleRefetch={() => setRefetch((prev) => prev + 1)}
      />
    </section>
  );
}
