import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { TestimonialCard } from './TestimonialCard';

const DESKTOP_VISIBLE = 3;
const SWIPE_THRESHOLD = 50;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const total = testimonials.length;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const desktopCards = Array.from({ length: DESKTOP_VISIBLE }, (_, i) =>
    testimonials[(index + i) % total],
  );

  const animDuration = prefersReducedMotion ? 0 : 0.3;

  const slideVariants = prefersReducedMotion
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
      };

  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-dark-text mb-12">
          What Our Clients Say
        </h2>

        {/* Mobile: single card with swipe */}
        <div className="lg:hidden relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: animDuration, ease: 'easeOut' }}
              drag={prefersReducedMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) next();
                else if (info.offset.x > SWIPE_THRESHOLD) prev();
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <TestimonialCard testimonial={testimonials[index]} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green ${
                  i === index
                    ? 'bg-stellies-green'
                    : 'bg-gray-300 dark:bg-dark-border'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3 cards with arrow navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="shrink-0 p-2 rounded-full border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} className="text-gray-600 dark:text-dark-muted" />
            </button>

            <div className="grid grid-cols-3 gap-6 flex-1">
              {desktopCards.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            <button
              onClick={next}
              className="shrink-0 p-2 rounded-full border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} className="text-gray-600 dark:text-dark-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
