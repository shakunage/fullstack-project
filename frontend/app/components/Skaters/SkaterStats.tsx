import { formatStatCategory } from '~/utils/formatStatCategory';
import { formatStatValue } from '~/utils/formatStatValue';
import { type TopSkaters, type SkaterStat } from '~/entities/TopSkaters';

export default function SkaterStats({
  category,
  skaters,
}: {
  category: keyof TopSkaters;
  skaters: SkaterStat[];
}) {
  return (
    <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <h2 className="text-xl font-semibold p-4 bg-gray-100 border-b border-gray-200 text-center">
        {formatStatCategory(category)}
      </h2>
      <ul className="divide-y divide-gray-200">
        {skaters.map((skater, index) => (
          <li key={skater.id} className="p-3 flex items-center space-x-3 hover:bg-gray-50">
            <span className="font-semibold text-gray-500 w-6 text-right">{index + 1}.</span>
            <img
              src={skater.headshot}
              alt={`${skater.firstName.default} ${skater.lastName.default}`}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              onError={(e) => (e.currentTarget.src = '/placeholder-player.png')} // Placeholder image path
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {skater.firstName.default} {skater.lastName.default} ({skater.position})
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <img
                  src={skater.teamLogo}
                  alt={skater.teamName.default}
                  className="w-4 h-4 mr-1"
                  onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if logo fails
                />
                <span>{skater.teamAbbrev}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {formatStatValue(category, skater.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
