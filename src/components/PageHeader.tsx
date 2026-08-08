export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 px-8 pt-8 pb-6 border-b border-border">
      <div>
        {eyebrow && (
          <p className="text-xs font-mono-data uppercase tracking-wider text-signal mb-1.5">{eyebrow}</p>
        )}
        <h1 className="font-display text-3xl">{title}</h1>
        {description && <p className="text-ink-soft mt-1.5 max-w-xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
