"use client";

import React, { useState } from "react";
import DialogEditTask from "./dialog/edit";

interface TaskCardProps {
  taskId: string;
  name: string;
  priority: string;
}

export default function TaskCard({ taskId, name, priority }: TaskCardProps) {
  return <DialogEditTask taskId={taskId} name={name} priority={priority} />;
}
