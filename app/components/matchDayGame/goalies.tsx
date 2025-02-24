import type { BoxscoreData } from "../../entities/BoxscoreData";

export function Goalies({ boxscoreData }: { boxscoreData: BoxscoreData }) {
  return (
    <>
      <h3 className="text-lg font-bold mt-4">Goalies</h3>
      <div>
        <h4 className="font-semibold">Home Team</h4>
        {boxscoreData.playerByGameStats.homeTeam.goalies.map((goalie) => (
          <>
            {goalie.toi === "00:00" ? (
              <div key={goalie.playerId}></div>
            ) : (
              <p key={goalie.playerId}>
                {goalie.name.default} - {goalie.saveShotsAgainst} saves
              </p>
            )}
          </>
        ))}
      </div>
      <div>
        <h4 className="font-semibold">Away Team</h4>
        {boxscoreData.playerByGameStats.awayTeam.goalies.map((goalie) => (
          <>
            {goalie.toi === "00:00" ? (
              <div key={goalie.playerId}></div>
            ) : (
              <p key={goalie.playerId}>
                {goalie.name.default} - {goalie.saveShotsAgainst} saves
              </p>
            )}
          </>
        ))}
      </div>
    </>
  );
}
