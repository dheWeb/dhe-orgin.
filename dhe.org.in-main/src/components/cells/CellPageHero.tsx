/** Cell page header — matches PageHero styling for 25 cell routes */
export default function CellPageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-gradient-to-b from-orange-50/40 to-white border-b border-gray-100">
      <div className="dhe-container py-8 sm:py-10 max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
          DHE National Cell
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
