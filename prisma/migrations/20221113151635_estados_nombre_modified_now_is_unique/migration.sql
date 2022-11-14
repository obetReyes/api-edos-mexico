/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `estados` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `estados_nombre_key` ON `estados`(`nombre`);
