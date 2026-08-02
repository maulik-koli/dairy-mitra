import { CustomerTable } from "@/components/customers/CustomerTable";
import { CUSTOMERS } from "@/lib/customers";

export default function CustomersPage() {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--sage)]">
          Seeded Customers
        </p>
        <h1 className="section-title text-4xl md:text-5xl">The local ledger the model can anchor to.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">
          These active subscriptions provide believable context for name matching, quantity updates, and pause handling.
        </p>
      </div>
      <CustomerTable customers={CUSTOMERS} />
    </section>
  );
}
