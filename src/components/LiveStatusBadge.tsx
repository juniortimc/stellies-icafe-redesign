export interface CafeStatus {
  isOpen: boolean;
  label: string;
}

interface LiveStatusBadgeProps {
  status: CafeStatus;
}

export function LiveStatusBadge({ status }: LiveStatusBadgeProps) {
  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
        status.isOpen
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          status.isOpen ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {status.label}
    </span>
  );
}
