// Shared section heading: a ruled head with an optional action on the right.
export default function SectionHeading({ id, title, action, invert = false }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b-2 pb-4 ${invert ? 'border-paper' : 'border-ink'}`}>
      <h2 id={id} className="text-balance font-semicondensed text-[clamp(1.9rem,3.6vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.015em]">
        {title}
      </h2>
      {action}
    </div>
  );
}
