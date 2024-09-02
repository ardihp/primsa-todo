import prisma from "@/lib/db";
import React from "react";
import TodoSection from "./components/to-do";
import InProgressSection from "./components/in-progress";
import CompletedSection from "./components/completed";

export default async function HomeView() {
  return (
    <main className="flex flex-col items-center m-8 p-6 gap-6 border border-zinc-800 rounded-xl max-w-screen-lg mx-auto">
      <h3 className="text-2xl font-bold">Kanban Board</h3>

      <article className="grid grid-cols-3 gap-4 w-full">
        <TodoSection />

        <InProgressSection />

        <CompletedSection />
      </article>
    </main>
  );
}
