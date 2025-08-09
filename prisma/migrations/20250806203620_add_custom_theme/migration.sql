/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - The required column `guid` was added to the `Website` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Website` ADD COLUMN `customThemeImage` VARCHAR(191) NULL,
    ADD COLUMN `guid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Website_guid_key` ON `Website`(`guid`);

-- CreateIndex
CREATE INDEX `Website_guid_idx` ON `Website`(`guid`);
