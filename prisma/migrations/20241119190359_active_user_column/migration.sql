/*
  Warnings:

  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `birthDate` DATETIME(3) NULL DEFAULT NULL;
