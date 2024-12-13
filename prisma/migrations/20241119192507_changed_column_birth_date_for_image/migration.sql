/*
  Warnings:

  - You are about to drop the column `birthDate` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `birthDate`,
    ADD COLUMN `image` VARCHAR(191) NULL;
