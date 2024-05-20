/*
  Warnings:

  - Added the required column `balanceUpdatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RON', 'USD', 'EUR', 'GBP');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balanceUpdatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL;
