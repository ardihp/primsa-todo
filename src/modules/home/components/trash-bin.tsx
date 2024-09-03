import { Button } from "@/components/ui/button";
import { Droppable } from "@hello-pangea/dnd";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

export default function TrashBinSection() {
  return (
    <Droppable droppableId="delete">
      {(provided) => (
        <section
          className="absolute -bottom-20"
          {...provided?.droppableProps}
          ref={provided.innerRef}
        >
          <Button className="flex items-center justify-center h-[50px] w-[50px] rounded-full !bg-rose-200 p-0">
            <TrashIcon className="w-[20px] h-[20px] stroke-[.03rem] stroke-rose-800" />
          </Button>
        </section>
      )}
    </Droppable>
  );
}
