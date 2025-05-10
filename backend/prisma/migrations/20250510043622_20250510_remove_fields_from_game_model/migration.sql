/*
  Warnings:

  - You are about to drop the column `awayTeam` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `final` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameType` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeam` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `scoreAway` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `scoreHome` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "awayTeam",
DROP COLUMN "createdAt",
DROP COLUMN "final",
DROP COLUMN "gameType",
DROP COLUMN "homeTeam",
DROP COLUMN "scoreAway",
DROP COLUMN "scoreHome",
DROP COLUMN "season",
DROP COLUMN "startTime",
DROP COLUMN "updatedAt",
DROP COLUMN "venue";
