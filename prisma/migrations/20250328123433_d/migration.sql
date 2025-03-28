/*
  Warnings:

  - A unique constraint covering the columns `[index,userId]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[index,userId]` on the table `experience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "github" TEXT,
ADD COLUMN     "technologies" TEXT[],
ALTER COLUMN "link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "position" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_index_userId_key" ON "Projects"("index", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "experience_index_userId_key" ON "experience"("index", "userId");
