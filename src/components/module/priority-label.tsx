import React from "react";

interface PriorityLabelProps {
  priority: string;
}

export default function PriorityLabel({ priority }: PriorityLabelProps) {
  return (
    <div
      className={`px-1.5 py-0.5 ${
        priority === "low"
          ? "text-emerald-800"
          : priority === "medium"
          ? "text-amber-800"
          : "text-rose-800"
      } ${
        priority === "low"
          ? "bg-emerald-200"
          : priority === "medium"
          ? "bg-amber-200"
          : "bg-rose-200"
      } w-fit rounded`}
    >
      <p className="text-[10px] font-semibold capitalize">{priority}</p>
    </div>
  );
}
