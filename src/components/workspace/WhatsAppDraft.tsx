type WhatsAppDraftProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WhatsAppDraft({ value, onChange }: WhatsAppDraftProps) {
  const shareHref = `https://wa.me/?text=${encodeURIComponent(value)}`;

  return (
    <div className="card-surface p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage)]">
            WhatsApp Draft
          </p>
          <h3 className="section-title mt-2 text-2xl">Gujarati confirmation</h3>
        </div>
        <a href={shareHref} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 text-sm">
          Share on WhatsApp
        </a>
      </div>
      <textarea
        className="field min-h-44 resize-y"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
