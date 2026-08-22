import type { Field } from '@/lib/studio';
import { read } from '@/lib/studio';

/**
 * Renders a value from lib/studio.ts. If the value is still awaiting the
 * client, it is shown behind a visible marker so nothing unconfirmed can reach
 * a customer looking like fact.
 *
 * Set NEXT_PUBLIC_HIDE_PENDING=true to preview the site as it will look once
 * every field is confirmed.
 */
const HIDE = process.env.NEXT_PUBLIC_HIDE_PENDING === 'true';

export function Pending({
  field,
  className = '',
}: {
  field: Field<string>;
  className?: string;
}) {
  const { value, unconfirmed } = read(field);
  if (!unconfirmed || HIDE) return <span className={className}>{value}</span>;

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className="border-b border-dashed border-gold/60">{value}</span>
      <span
        className="whitespace-nowrap rounded-sm bg-gold/12 px-1.5 py-px font-body text-[10px]
                   font-medium uppercase tracking-eyebrow text-goldink"
        title={field.status === 'pending' ? field.needs : undefined}
      >
        To confirm
      </span>
    </span>
  );
}

/** A block-level note marking content that is missing entirely. */
export function MissingContent({ needs }: { needs: string }) {
  if (HIDE) return null;
  return (
    <p
      className="rounded-sm border border-dashed border-gold/50 bg-gold/[0.06] px-4 py-3
                 font-body text-sm leading-relaxed text-muted"
    >
      <span className="mr-2 font-medium uppercase tracking-eyebrow text-[10px] text-goldink">
        Client input
      </span>
      {needs}
    </p>
  );
}
