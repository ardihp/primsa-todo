import React, { useContext, useEffect, useState } from "react";
import DialogNewTask from "@/components/module/dialog/new";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTodoTask } from "@/actions/actions";
import { Droppable } from "@hello-pangea/dnd";
import DialogEditTask from "@/components/module/dialog/edit";
import TaskContext from "@/context/task-context";

export default function TodoSection() {
  const [todoTask, setTodoTask] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(0);
  const { refetchCount, refetchTask } = useContext(TaskContext);

  useEffect(() => {
    setLoading(true);
    getTodoTask().then((res) => {
      setTodoTask(res);
      setLoading(false);
    });
  }, [refetch]);

  useEffect(() => {
    if (refetchTask?.includes("to-do")) {
      setLoading(true);
      getTodoTask().then((res) => {
        setTodoTask(res);
        setLoading(false);
      });
    }
  }, [refetchTask, refetchCount]);

  return (
    <section className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg h-fit">
      <h4 className="font-semibold">
        To Do <span className="text-white/60 text-xs">{todoTask?.length}</span>
      </h4>

      <ScrollArea
        className={`w-full mt-2 ${
          todoTask?.length >= 7 ? "pr-4 h-[calc(100vh_-_430px)]" : "pr-0"
        }`}
      >
        <Droppable droppableId="to-do">
          {(provided) => (
            <article
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {isLoading ? (
                <p className={`text-sm ${isLoading ? "inline" : "hidden"}`}>
                  Loading...
                </p>
              ) : todoTask?.length >= 1 ? (
                todoTask?.map((task: any, key: number) => (
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
                    todoTask?.length >= 1 ? "hidden" : "inline"
                  }`}
                >
                  {"Yey! you don't have any task to do."}
                </p>
              )}
              {provided.placeholder}
            </article>
          )}
        </Droppable>
      </ScrollArea>

      <DialogNewTask
        status="to-do"
        order={todoTask?.length + 1}
        handleRefetch={() => setRefetch((prev) => prev + 1)}
      />
    </section>
  );
}
