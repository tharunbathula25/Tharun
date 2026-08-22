export default function Section({
  id,
  children,
  tinted = false,
  ruled = false,
  className = '',
  labelledBy,
}: {
  id: string;
  children: React.ReactNode;
  tinted?: boolean;
  ruled?: boolean;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section ${tinted ? 'bg-blush/40' : ''} ${ruled ? 'rule' : ''} ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  intro,
  id,
  align = 'left',
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  id?: string;
  align?: 'left' | 'center';
}) {
  return (
    <header className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-[30px] leading-tight sm:text-[38px] md:text-[44px]">
        {heading}
      </h2>
      {intro ? <p className="mt-5 text-base text-muted">{intro}</p> : null}
    </header>
  );
}
