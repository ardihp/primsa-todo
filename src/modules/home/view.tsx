"use client";

import React, { useContext } from "react";
import TodoSection from "./components/to-do";
import InProgressSection from "./components/in-progress";
import CompletedSection from "./components/completed";
import { DragDropContext } from "@hello-pangea/dnd";
import { deleteTask, editOrder } from "@/actions/actions";
import TaskContext from "@/context/task-context";
import TrashBinSection from "./components/trash-bin";
import { toast } from "@/hooks/use-toast";

export default function HomeView() {
  const { setRefetchTask } = useContext(TaskContext);

  function handleDragEnd(props: any) {
    if (
      props?.destination?.index >= 0 &&
      props?.destination?.droppableId !== "delete"
    ) {
      editOrder(props?.draggableId, props?.destination);

      setTimeout(() => {
        setRefetchTask([
          `${props?.destination?.droppableId}`,
          `${props?.source?.droppableId}`,
        ]);
      }, 500);
    } else if (
      props?.destination?.index >= 0 &&
      props?.destination?.droppableId === "delete"
    ) {
      deleteTask(props?.draggableId).then((res) => {
        if (res === "Success") {
          toast({ title: `Task deleted.` });

          setRefetchTask([`${props?.source?.droppableId}`]);
        }
      });
    }
  }

  return (
    <main className="flex flex-col flex-grow items-center mx-4 my-10 px-8 pb-8 pt-6 gap-6 border border-zinc-800 rounded-xl max-w-screen-lg h-fit relative">
      <h3 className="text-2xl font-bold">Kanban Board</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <article className="grid grid-cols-3 gap-6 w-full">
          <TodoSection />

          <InProgressSection />

          <CompletedSection />
        </article>

        <TrashBinSection />
      </DragDropContext>
    </main>
  );
}
