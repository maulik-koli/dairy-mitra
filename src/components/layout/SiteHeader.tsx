import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(213,226,218,0.7)] bg-[rgba(247,250,248,0.82)] backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="section-title text-2xl text-[var(--sage-deep)]">
          Dairy Mitra
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-[var(--muted)]">
          <Link href="/workspace" className="btn-secondary px-4 py-2">
            Workspace
          </Link>
          <Link href="/customers" className="btn-secondary px-4 py-2">
            Customers
          </Link>
        </nav>
      </div>
    </header>
  );
}
