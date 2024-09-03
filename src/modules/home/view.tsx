"use client";

import React, { useContext } from "react";
import TodoSection from "./components/to-do";
import InProgressSection from "./components/in-progress";
import CompletedSection from "./components/completed";
import { DragDropContext } from "@hello-pangea/dnd";
import { editOrder } from "@/actions/actions";
import TaskContext from "@/context/task-context";

export default function HomeView() {
  const { setRefetchTask } = useContext(TaskContext);

  function handleDragEnd(props: any) {
    editOrder(props?.draggableId, props?.destination);
    setTimeout(() => {
      setRefetchTask();
    }, 200);
  }

  return (
    <main className="flex flex-col flex-grow items-center mx-4 my-10 px-8 pb-8 pt-6 gap-6 border border-zinc-800 rounded-xl max-w-screen-lg h-fit">
      <h3 className="text-2xl font-bold">Kanban Board</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <article className="grid grid-cols-3 gap-6 w-full">
          <TodoSection />

          <InProgressSection />

          <CompletedSection />
        </article>
      </DragDropContext>
    </main>
  );
}
