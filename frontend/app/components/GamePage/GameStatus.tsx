import type { GameLandingData } from "~/entities";

export function GameStatus({ gameLandingData }: { gameLandingData: GameLandingData }) {
  return (
    <div className="text-center mt-3">
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        {gameLandingData.gameState === "OFF" && gameLandingData.periodDescriptor.periodType === "REG"
          ? "Final"
          : gameLandingData.gameState === "OFF" &&
              gameLandingData.periodDescriptor.periodType === "OT" &&
              !gameLandingData.periodDescriptor.otPeriods
            ? "Final/OT"
            : gameLandingData.gameState === "OFF" &&
                gameLandingData.periodDescriptor.periodType === "OT" &&
                gameLandingData.periodDescriptor.otPeriods
              ? `Final/${gameLandingData.periodDescriptor.otPeriods}OT`
              : gameLandingData.gameState === "OFF" &&
                  gameLandingData.periodDescriptor.periodType === "SO"
                ? "Shootout"
                : gameLandingData.gameState === "LIVE"
                  ? "Live"
                  : gameLandingData.gameScheduleState || "Scheduled"}
        {gameLandingData.clock &&
          gameLandingData.clock.inIntermission &&
          !gameLandingData.clock.running &&
          " (Intermission)"}
      </p>
    </div>
  );
}
