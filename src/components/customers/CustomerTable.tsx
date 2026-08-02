import { Customer } from "@/lib/types";

type CustomerTableProps = {
  customers: readonly Customer[];
};

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-[rgba(232,240,235,0.65)] text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
            <tr>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Frequency</th>
              <th className="px-5 py-4">Rate</th>
              <th className="px-5 py-4">Billing</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-[var(--line)] text-sm text-[var(--ink)] md:text-base">
                <td className="px-5 py-4 font-semibold">{customer.name}</td>
                <td className="px-5 py-4">{customer.product}</td>
                <td className="px-5 py-4">{customer.quantityLiters} L</td>
                <td className="px-5 py-4 capitalize">{customer.frequency}</td>
                <td className="px-5 py-4">Rs. {customer.ratePerLiter}/L</td>
                <td className="px-5 py-4 capitalize">{customer.billing.replace("_", " ")}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-[rgba(22,101,52,0.12)] px-3 py-1 text-sm font-medium text-[var(--ok)]">
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
