import { motion, useReducedMotion } from 'framer-motion';
import { icons } from 'lucide-react';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = icons[service.icon as keyof typeof icons];

  return (
    <motion.div
      className="border border-gray-200 dark:border-dark-border rounded-xl p-6 bg-white dark:bg-dark-surface hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="mb-4 text-stellies-green">
        {IconComponent ? (
          <IconComponent size={32} aria-hidden="true" />
        ) : (
          <span aria-hidden="true" className="block h-8 w-8" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-1">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-dark-muted text-sm">
        {service.description}
      </p>
    </motion.div>
  );
}
