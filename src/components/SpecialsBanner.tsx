import { Coffee } from 'lucide-react';

export function SpecialsBanner() {
  return (
    <section className="py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-slate-900 dark:bg-slate-800 border border-stellies-green/30 p-6 sm:p-8 flex items-center gap-4 sm:gap-6">
          <Coffee className="w-10 h-10 text-stellies-green shrink-0" aria-hidden="true" />
          <div>
            <p className="text-stellies-green font-bold text-sm uppercase tracking-wide mb-1">
              Daily Special
            </p>
            <p className="text-white text-lg sm:text-xl font-semibold">
              Short Cappuccino + Muffin for only <span className="text-stellies-green">R38</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
