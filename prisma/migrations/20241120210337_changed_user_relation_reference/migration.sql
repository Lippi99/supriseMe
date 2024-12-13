/*
  Warnings:

  - You are about to drop the column `userId` on the `website` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Website` DROP FOREIGN KEY `Website_userId_fkey`;

-- AlterTable
ALTER TABLE `Website` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Website` ADD CONSTRAINT `Website_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
