/*
  Warnings:

  - You are about to drop the column `skills` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "skills";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_userId_key" ON "skills"("name", "userId");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
