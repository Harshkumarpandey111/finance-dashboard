/* Skeleton loader shown while the dashboard "initialises" (first 600ms).
   Matches the real layout shape exactly so there's no layout shift. */

function Bone({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

function CardSkeleton({ tall = false }) {
  return (
    <div className={`rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)] ${tall ? 'pt-6' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <Bone className="w-10 h-10 rounded-xl" />
        <Bone className="w-14 h-6 rounded-full" />
      </div>
      <Bone className="w-20 h-3 mb-2" />
      <Bone className="w-28 h-7" />
    </div>
  );
}

function ChartSkeleton({ height = 'h-[268px]' }) {
  return (
    <div className={`rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)] ${height}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <Bone className="w-28 h-4" />
          <Bone className="w-20 h-3" />
        </div>
        <Bone className="w-16 h-6 rounded-full" />
      </div>
      <Bone className="w-full h-full rounded-xl" style={{ minHeight: '120px' }} />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)]">
      {/* toolbar */}
      <div className="p-5 border-b border-[var(--border)] flex gap-3">
        <Bone className="flex-1 h-10 rounded-xl" />
        <Bone className="w-24 h-10 rounded-xl" />
        <Bone className="w-24 h-10 rounded-xl" />
        <Bone className="w-20 h-10 rounded-xl" />
      </div>
      {/* rows */}
      <div className="divide-y divide-[var(--border)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-5 py-4 flex items-center gap-6">
            <Bone className="w-20 h-3" />
            <Bone className="w-32 h-3 flex-1" />
            <Bone className="w-20 h-6 rounded-full" />
            <Bone className="w-14 h-6 rounded-full" />
            <Bone className="w-16 h-4 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardSkeleton tall />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Charts row — mirrors real 12-col layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        <div className="md:col-span-2 xl:col-span-7"><ChartSkeleton /></div>
        <div className="xl:col-span-3"><ChartSkeleton /></div>
        <div className="xl:col-span-2">
          <div className="rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)] h-full">
            <Bone className="w-28 h-4 mb-2" />
            <Bone className="w-20 h-3 mb-6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 mb-5">
                <Bone className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <Bone className="w-3/4 h-3" />
                  <Bone className="w-1/2 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table + insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        <div className="xl:col-span-2 space-y-2">
          <Bone className="w-36 h-7 mb-1" />
          <TableSkeleton />
        </div>
        <div className="space-y-4">
          <Bone className="w-24 h-7 mb-1" />
          <ChartSkeleton height="h-[228px]" />
          <div className="rounded-2xl p-5 bg-[var(--bg-surface)] border border-[var(--border)] space-y-3">
            <Bone className="w-32 h-4 mb-4" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-[var(--bg-surface-alt)]">
                <Bone className="w-7 h-7 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Bone className="w-24 h-3" />
                  <Bone className="w-full h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
