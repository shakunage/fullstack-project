import React from "react";
import type { Boxscore } from "~/entities/Boxscore";
import type { PlayerStats } from "~/entities/sub-entities/PlayerStats";
import { resolveNameType } from "~/utils/resolveNameType";

interface TeamInfo {
  teamName: string;
  teamGoalies: PlayerStats[];
}

const TeamGoalies = ({ boxscoreData, home }: { boxscoreData: Boxscore; home: boolean }) => {
  const { teamName, teamGoalies }: TeamInfo = home
    ? {
        teamName: resolveNameType(boxscoreData.homeTeam),
        teamGoalies: boxscoreData.playerByGameStats.homeTeam.goalies,
      }
    : {
        teamName: resolveNameType(boxscoreData.awayTeam),
        teamGoalies: boxscoreData.playerByGameStats.awayTeam.goalies,
      };
  return (
    <div>
      <h4 className="font-semibold">{teamName}</h4>
      {teamGoalies.map((goalie) => (
        <React.Fragment key={goalie.playerId}>
          {goalie.toi === "00:00" ? (
            <p />
          ) : (
            <p>
              {goalie.name.default} - {goalie.saveShotsAgainst} saves
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export function Goalies({ boxscoreData }: { boxscoreData: Boxscore }) {
  return (
    <>
      <h3 className="text-lg font-bold mt-4">Goalies</h3>
      <TeamGoalies boxscoreData={boxscoreData} home={true} />
      <br />
      <TeamGoalies boxscoreData={boxscoreData} home={false} />
    </>
  );
}
