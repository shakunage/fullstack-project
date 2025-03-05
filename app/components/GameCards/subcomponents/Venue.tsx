export function Venue({ venue, homeTeamAbbrev }: { venue: string; homeTeamAbbrev: string }) {
  return (
    <>
      <p className="text-gray-700">
        Venue: {venue} ({homeTeamAbbrev} home)
      </p>
    </>
  );
}
