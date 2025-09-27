/*
  Warnings:

  - You are about to drop the column `clicks` on the `Url` table. All the data in the column will be lost.
  - Made the column `title` on table `Url` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Url" DROP COLUMN "clicks",
ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Clicks" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Clicks" ADD CONSTRAINT "Clicks_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "public"."Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
