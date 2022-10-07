/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `APIkeys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `value_UNIQUE` ON `APIkeys`(`value`);
