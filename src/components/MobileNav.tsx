interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <nav aria-label="Mobile navigation" className="px-4 py-3 space-y-1">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-stellies-green dark:hover:text-stellies-green transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
