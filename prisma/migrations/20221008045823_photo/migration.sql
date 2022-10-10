/*
  Warnings:

  - A unique constraint covering the columns `[hasgtag]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_hasgtag_key" ON "Hashtag"("hasgtag");
