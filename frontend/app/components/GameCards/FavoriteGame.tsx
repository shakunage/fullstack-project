import React from "react";
import type { BoxscoreData } from "~/entities/Boxscore"; // Ensure this path is correct
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";
import { FavoriteButton } from "./subcomponents/FavoriteButton";
import { useNavigate } from "react-router";

export function FavoriteGame({ game }: { game: BoxscoreData }) {
  const navigate = useNavigate();

  const handleGameClick = (gameId: number) => {
    void navigate(`/game/${gameId}`);
  };

  if (!game.id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <FavoriteButton game_id={game.id} />
      <div
        key={game.id}
        className="hover:bg-gray-200 cursor-pointer shadow-md rounded-lg p-4"
        onClick={() => handleGameClick(game.id)}
      >
        <React.Fragment key={game.id}>
          <EndedGameHeader
            lastPeriod={game.gameOutcome.lastPeriodType}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            otPeriods={game.gameOutcome.otPeriods}
          />
          <StartTimeToggle gameStartTime={game.startTimeUTC} />
          <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
        </React.Fragment>
      </div>
    </div>
  );
}
