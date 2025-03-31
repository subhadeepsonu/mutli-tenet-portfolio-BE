/*
  Warnings:

  - You are about to drop the column `index` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Projects_index_userId_key";

-- DropIndex
DROP INDEX "experience_index_userId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "index";

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "index";
