import type { ReactNode } from "react";

type AdSlotProps = {
  /** Identifier for future ad placement (not used until ads are enabled) */
  slotId: string;
  /** Accessible name for the reserved region */
  label?: string;
  /** Minimum height in px — prevents CLS when ads load later */
  minHeight?: number;
  /** Optional content inside the reserved area (e.g. “Advertisement” placeholder) */
  children?: ReactNode;
  className?: string;
};

/**
 * CLS-safe ad container placeholder. Does not load AdSense units.
 */
export default function AdSlot({
  slotId,
  label = "Advertisement",
  minHeight = 280,
  children,
  className = "",
}: AdSlotProps) {
  return (
    <aside
      data-ad-slot={slotId}
      aria-label={label}
      className={`ad-slot-placeholder w-full overflow-hidden rounded-md border border-dashed border-gray-200 bg-gray-50/80 ${className}`}
      style={{ minHeight }}
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center px-4 py-6 text-center">
        {children ?? (
          <span className="text-xs font-medium uppercase tracking-wider text-gray-600">
            {label}
          </span>
        )}
      </div>
    </aside>
  );
}
