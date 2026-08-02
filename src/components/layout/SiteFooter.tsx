export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(213,226,218,0.8)] py-8">
      <div className="container-shell flex flex-col gap-2 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>Dairy Mitra is a focused demo for Gujarati milk-delivery workflows.</p>
        <p>Mock mode keeps the UI moving while Gemma 4 is offline.</p>
      </div>
    </footer>
  );
}
