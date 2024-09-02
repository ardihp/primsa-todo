"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  await prisma.task.create({
    data: {
      name: formData.get("name") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
    },
  });

  revalidatePath("/");
}
