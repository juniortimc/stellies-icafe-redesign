import { Star } from 'lucide-react';
import type { Testimonial } from '../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="border border-gray-200 dark:border-dark-border rounded-xl p-6 bg-white dark:bg-dark-surface flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name}'s avatar`}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-stellies-green/20 flex items-center justify-center text-stellies-green font-semibold text-sm"
            aria-hidden="true"
          >
            {testimonial.name.charAt(0)}
          </div>
        )}
        <h3 className="font-semibold text-gray-900 dark:text-dark-text">
          {testimonial.name}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-dark-muted text-sm flex-1">
        {testimonial.text}
      </p>

      {testimonial.rating != null && (
        <div className="flex gap-0.5 mt-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < testimonial.rating!
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-dark-border'
              }
              aria-hidden="true"
            />
          ))}
        </div>
      )}
    </div>
  );
}
