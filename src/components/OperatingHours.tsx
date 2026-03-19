const schedule = [
  { label: 'Mon – Fri', open: 7, close: 21, display: '07:00 – 21:00', days: [1, 2, 3, 4, 5] },
  { label: 'Sat', open: 8, close: 16, display: '08:00 – 16:00', days: [6] },
  { label: 'Public Holidays', open: 8.5, close: 13, display: '08:30 – 13:00', days: [] },
];

function isCurrentlyOpen(entry: (typeof schedule)[number]): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hour = now.getHours() + now.getMinutes() / 60;

  if (!entry.days.includes(day)) return false;
  return hour >= entry.open && hour < entry.close;
}

export function OperatingHours() {
  return (
    <section className="py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-slate-900/80 backdrop-blur-md px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 sm:gap-12">
          {schedule.map((entry) => {
            const open = isCurrentlyOpen(entry);
            return (
              <div key={entry.label} className="flex items-center gap-3">
                {open && (
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium tracking-wide text-slate-400 uppercase">
                    {entry.label}
                  </span>
                  <span className="text-base font-bold text-white">
                    {entry.display}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
