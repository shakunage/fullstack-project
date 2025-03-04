import React from "react";
import type { BoxscoreData, PlayerStats } from "../../../entities/BoxscoreData";

const TeamGoalies = ({ boxscoreData, home }: {boxscoreData: BoxscoreData, home: boolean}) => {
  const teamName: string = home ? boxscoreData.homeTeam.commonName.default : boxscoreData.awayTeam.commonName.default;
  const teamGoalies: PlayerStats[] = home ? boxscoreData.playerByGameStats.homeTeam.goalies : boxscoreData.playerByGameStats.awayTeam.goalies;
  return (
    <div>
      <h4 className="font-semibold">{teamName}</h4>
        {teamGoalies.map((goalie) => (
          <React.Fragment key={goalie.playerId}>
            {goalie.toi === "00:00" ? ( <p/> ) : (
              <p>
                {goalie.name.default} - {goalie.saveShotsAgainst} saves
              </p>
            )}
          </React.Fragment>
        ))}
    </div>
  )
}

export function Goalies({ boxscoreData }: { boxscoreData: BoxscoreData }) {
  return (
    <>
      <h3 className="text-lg font-bold mt-4">Goalies</h3>
      <TeamGoalies boxscoreData={boxscoreData} home={true} />
      <br/>
      <TeamGoalies boxscoreData={boxscoreData} home={false} />
    </>
  );
}
