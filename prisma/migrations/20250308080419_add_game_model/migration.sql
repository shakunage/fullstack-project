-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "game_type" TEXT NOT NULL,
    "home_team" TEXT NOT NULL,
    "away_team" TEXT NOT NULL,
    "score_home" INTEGER NOT NULL,
    "score_away" INTEGER NOT NULL,
    "final" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "venue" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
