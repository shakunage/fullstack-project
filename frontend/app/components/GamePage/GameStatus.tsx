import type { GameStory } from '~/entities';
import { useTimeUntilStart } from '~/hooks/useTimeUntilStart';

export function GameStatus({ storyData }: { storyData: GameStory }) {
  const { timeUntilStart } = useTimeUntilStart(storyData.startTimeUTC);

  return (
    <div className="text-center mt-3">
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        {storyData.gameState === 'FUT'
          ? `Game starting in ${timeUntilStart}`
          : storyData.gameState === 'OFF' && storyData.periodDescriptor.periodType === 'REG'
          ? 'Final'
          : storyData.gameState === 'OFF' &&
              storyData.periodDescriptor.periodType === 'OT' &&
              !storyData.periodDescriptor.otPeriods
            ? 'Final/OT'
            : storyData.gameState === 'OFF' &&
                storyData.periodDescriptor.periodType === 'OT' &&
                storyData.periodDescriptor.otPeriods
              ? `Final/${storyData.periodDescriptor.otPeriods}OT`
              : storyData.gameState === 'OFF' && storyData.periodDescriptor.periodType === 'SO'
                ? 'Shootout'
                : storyData.gameState === 'LIVE'
                  ? 'Live'
                  : storyData.gameScheduleState || 'Scheduled'}
        {storyData.clock && storyData.clock.inIntermission && !storyData.clock.running && ' (Intermission)'}
      </p>
    </div>
  );
}
