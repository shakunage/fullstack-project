import { useLoaderData } from 'react-router';
import { topskatersLoader } from '~/loaders/topSkatersLoader';
import { type TopSkaters } from '~/entities/TopSkaters';
import SkaterStats from '~/components/Skaters/SkaterStats';

export const loader = topskatersLoader;

export default function Players() {
  const data: TopSkaters = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Error loading players</div>;
  }

  // Filter out empty categories inline
  const validCategories = Object.entries(data).filter(([, skaters]) => skaters && skaters.length > 0);

  return (
    <main className="container mx-auto px-4 py-20">
      {' '}
      {/* Adjusted padding top */}
      <h1 className="text-3xl font-bold text-center mb-8">Top Skaters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validCategories.map(([category, skaters]) => (
          <SkaterStats
            key={category}
            category={category as keyof TopSkaters} // Type assertion to ensure correct type
            skaters={skaters}
          />
        ))}
      </div>
    </main>
  );
}
