import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialTask: Prisma.TaskCreateInput[] = [
  {
    name: "aaa",
    priority: "low",
    status: "to-do",
  },
  {
    name: "bbb",
    priority: "medium",
    status: "in-progress",
  },
  {
    name: "ccc",
    priority: "high",
    status: "done",
  },
  {
    name: "ddd",
    priority: "low",
    status: "to-do",
  },
];

async function main() {
  console.log("start seeding...");

  for (const task of initialTask) {
    const newTask = await prisma.task.create({
      data: task,
    });
    console.log(`Created task with id: ${newTask?.id}`);
  }

  console.log("seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
