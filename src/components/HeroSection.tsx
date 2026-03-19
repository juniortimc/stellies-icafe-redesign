import { motion, useReducedMotion } from 'framer-motion';
import { LiveStatusBadge } from './LiveStatusBadge';
import type { CafeStatus } from './LiveStatusBadge';

const cafeStatus: CafeStatus = {
  isOpen: true,
  label: 'Open Now',
};

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: 'easeOut' as const };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image — stacked above text on mobile, left on desktop */}
          <motion.div
            className="order-1 lg:order-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={itemTransition}
          >
            <img
              src={HERO_IMAGE_URL}
              alt="Interior of Stellies iCafe showing workstations and a welcoming environment"
              loading="lazy"
              className="w-full h-64 sm:h-80 lg:h-[28rem] object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            className="order-2 lg:order-2 flex flex-col gap-5"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn} transition={itemTransition}>
              <LiveStatusBadge status={cafeStatus} />
            </motion.div>

            <motion.h1
              variants={fadeIn}
              transition={itemTransition}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-dark-text leading-tight"
            >
              Your Neighbourhood
              <br />
              <span className="text-stellies-green">Tech Hub</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              transition={itemTransition}
              className="text-lg text-gray-600 dark:text-dark-muted max-w-md"
            >
              Printing, scanning, gaming, ID photos and more — all under one
              roof in Stellenbosch.
            </motion.p>

            <motion.div variants={fadeIn} transition={itemTransition}>
              <a
                href="#pricing"
                className="inline-block px-6 py-3 bg-stellies-green-dark hover:bg-stellies-green text-white font-semibold rounded-lg transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
              >
                Request a Quote
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
