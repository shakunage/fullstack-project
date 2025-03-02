import React from "react";
import type { BoxscoreData } from "../../entities/BoxscoreData";

export function Goalies({ boxscoreData }: { boxscoreData: BoxscoreData }) {
  return (
    <>
      <h3 className="text-lg font-bold mt-4">Goalies</h3>
      <div>
        <h4 className="font-semibold">Home Team</h4>
        {boxscoreData.playerByGameStats.homeTeam.goalies.map((goalie) => (
          <React.Fragment key={goalie.playerId}>
            {goalie.toi === "00:00" ? (
              <div></div>
            ) : (
              <p>
                {goalie.name.default} - {goalie.saveShotsAgainst} saves
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        <h4 className="font-semibold">Away Team</h4>
        {boxscoreData.playerByGameStats.awayTeam.goalies.map((goalie) => (
          <React.Fragment key={goalie.playerId}>
            {goalie.toi === "00:00" ? (
              <div></div>
            ) : (
              <p>
                {goalie.name.default} - {goalie.saveShotsAgainst} saves
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
