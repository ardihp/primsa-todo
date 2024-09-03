"use server";

import prisma from "@/lib/db";
import { equal } from "assert";
import { z, ZodError } from "zod";

export async function getTodoTask() {
  const tasks = await prisma.task.findMany({
    where: {
      status: {
        equals: "to-do",
      },
    },
    orderBy: { order: "asc" },
  });

  return tasks;
}

export async function getProgressTask() {
  const tasks = await prisma.task.findMany({
    where: {
      status: {
        equals: "in-progress",
      },
    },
    orderBy: { order: "asc" },
  });

  return tasks;
}

export async function getCompletedTask() {
  const tasks = await prisma.task.findMany({
    where: {
      status: {
        equals: "done",
      },
    },
    orderBy: { order: "asc" },
  });

  return tasks;
}

export async function createTask(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      name: z.string().min(3, { message: "Task name need atleast 3 words" }),
      priority: z.string().nonempty({ message: "Please select the priority" }),
    });

    const data = schema.parse({
      name: formData.get("name") as string,
      priority: formData.get("priority") as string,
    });

    const status = formData.get("status") as string;
    const order = Number(formData.get("order") || 0);

    await prisma.task.create({
      data: {
        name: data.name,
        status: status,
        priority: data.priority,
        order: order,
      },
    });

    reorderTask(status);

    return {
      status: "Success",
      errors: undefined,
    };
  } catch (err) {
    const zodError = err as ZodError;
    const errorMap = zodError.flatten().fieldErrors;

    return {
      status: "error",
      errors: {
        name: errorMap["name"]?.[0] ?? "",
        priority: errorMap["priority"]?.[0] ?? "",
      },
    };
  }
}

export async function editTask(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      name: z.string().min(3, { message: "Task name need atleast 3 words" }),
      priority: z.string().nonempty({ message: "Please select the priority" }),
    });

    const taskId = formData.get("taskId") as string;

    const data = schema.parse({
      name: formData.get("name") as string,
      priority: formData.get("priority") as string,
    });

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: data.name,
        priority: data.priority,
      },
    });

    return {
      status: "Success",
      inputValue: { name: "", priority: "" },
      errors: undefined,
    };
  } catch (err) {
    const zodError = err as ZodError;
    const errorMap = zodError.flatten().fieldErrors;

    return {
      status: "error",
      errors: {
        name: errorMap["name"]?.[0] ?? "",
        priority: errorMap["priority"]?.[0] ?? "",
      },
      inputValue: { name: "", priority: "" },
    };
  }
}

export async function reorderTask(status: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: {
          equals: status,
        },
      },
    });

    tasks?.map(async (task, index) => {
      await prisma.task.update({
        where: {
          id: task?.id,
        },
        data: {
          order: index + 1,
        },
      });
    });

    return tasks;
  } catch (err) {
    console.log(status, "notfound");
  }
}

export async function editOrder(
  taskId: string,
  destination: { droppableId: string; index: number }
) {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: destination?.droppableId,
      },
    });

    if (destination?.droppableId === "to-do") {
      const tasks = await getTodoTask();

      const filteredTasks = tasks?.filter((task) => task?.id !== taskId);

      filteredTasks?.splice(
        destination?.index,
        0,
        tasks?.find((task) => task?.id === taskId)!
      );

      filteredTasks?.map(async (task, index) => {
        await prisma.task.update({
          where: {
            id: task?.id,
          },
          data: {
            order: index + 1,
          },
        });
      });
    } else if (destination?.droppableId === "in-progress") {
      const tasks = await getProgressTask();

      const filteredTasks = tasks?.filter((task) => task?.id !== taskId);

      filteredTasks?.splice(
        destination?.index,
        0,
        tasks?.find((task) => task?.id === taskId)!
      );

      filteredTasks?.map(async (task, index) => {
        await prisma.task.update({
          where: {
            id: task?.id,
          },
          data: {
            order: index + 1,
          },
        });
      });
    } else {
      const tasks = await getCompletedTask();

      const filteredTasks = tasks?.filter((task) => task?.id !== taskId);

      filteredTasks?.splice(
        destination?.index,
        0,
        tasks?.find((task) => task?.id === taskId)!
      );

      filteredTasks?.map(async (task, index) => {
        await prisma.task.update({
          where: {
            id: task?.id,
          },
          data: {
            order: index + 1,
          },
        });
      });
    }
  } catch (err) {}
}
