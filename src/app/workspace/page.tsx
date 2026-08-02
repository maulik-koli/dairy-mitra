import { WorkspaceClient } from "@/components/workspace/WorkspaceClient";

export default function WorkspacePage() {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--sage)]">
          Workspace
        </p>
        <h1 className="section-title text-4xl md:text-6xl">Capture the order while it is still in the vendor&apos;s voice.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
          Speak or paste a Gujarati or Gujlish instruction, let Dairy Mitra structure it, then tidy the card and send the WhatsApp-ready confirmation.
        </p>
      </div>
      <WorkspaceClient />
    </section>
  );
}
