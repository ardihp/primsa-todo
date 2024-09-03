"use client";

import React, { ReactNode, useState } from "react";
import TaskContext from "../task-context";

export default function TaskProvider({ children }: { children: ReactNode }) {
  const [refetchTask, setRefetchTask] = useState<string[]>([]);
  let refreshCount = 0;

  return (
    <TaskContext.Provider
      value={{
        refetchCount: refreshCount,
        refetchTask,
        setRefetchTask: (status) => {
          setRefetchTask(status);
          refreshCount += 1;
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
