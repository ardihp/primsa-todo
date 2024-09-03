"use client";

import React, { ReactNode, useState } from "react";
import TaskContext from "../task-context";

export default function TaskProvider({ children }: { children: ReactNode }) {
  const [refetchTask, setRefetchTask] = useState(0);

  return (
    <TaskContext.Provider
      value={{
        refetchTask,
        setRefetchTask: () => setRefetchTask((prev) => prev + 1),
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
