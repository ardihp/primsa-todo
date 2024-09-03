-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
