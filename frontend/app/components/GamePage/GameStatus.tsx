import type { GameStory } from "~/entities";

export function GameStatus(data: GameStory) {
  return (
    <div className="text-center mt-3">
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        {data.gameState === "OFF" && data.periodDescriptor.periodType === "REG"
          ? "Final"
          : data.gameState === "OFF" &&
              data.periodDescriptor.periodType === "OT" &&
              !data.periodDescriptor.otPeriods
            ? "Final/OT"
            : data.gameState === "OFF" &&
                data.periodDescriptor.periodType === "OT" &&
                data.periodDescriptor.otPeriods
              ? `Final/${data.periodDescriptor.otPeriods}OT`
              : data.gameState === "OFF" && data.periodDescriptor.periodType === "SO"
                ? "Shootout"
                : data.gameState === "LIVE"
                  ? "Live"
                  : data.gameScheduleState || "Scheduled"}
        {data.clock && data.clock.inIntermission && !data.clock.running && " (Intermission)"}
      </p>
    </div>
  );
}
