/*
  Warnings:

  - You are about to drop the column `count` on the `apikeys` table. All the data in the column will be lost.
  - You are about to drop the column `usage` on the `apikeys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apikeys` DROP COLUMN `count`,
    DROP COLUMN `usage`;
