-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_styleId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "styleId" DROP NOT NULL,
ALTER COLUMN "styleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "style"("id") ON DELETE SET NULL ON UPDATE CASCADE;
