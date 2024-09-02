"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

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

    await prisma.task.create({
      data: {
        name: data.name,
        status: formData.get("status") as string,
        priority: data.priority,
      },
    });

    revalidatePath("/");

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

    revalidatePath("/");

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
