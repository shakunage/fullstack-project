/*
  Warnings:

  - You are about to drop the column `away_team` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `game_type` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `home_team` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `score_away` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `score_home` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Game` table. All the data in the column will be lost.
  - Added the required column `awayTeam` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameType` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeam` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreAway` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreHome` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "away_team",
DROP COLUMN "game_type",
DROP COLUMN "home_team",
DROP COLUMN "score_away",
DROP COLUMN "score_home",
DROP COLUMN "start_time",
ADD COLUMN     "awayTeam" TEXT NOT NULL,
ADD COLUMN     "gameType" TEXT NOT NULL,
ADD COLUMN     "homeTeam" TEXT NOT NULL,
ADD COLUMN     "scoreAway" INTEGER NOT NULL,
ADD COLUMN     "scoreHome" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_GameToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GameToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameToUser_B_index" ON "_GameToUser"("B");

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
