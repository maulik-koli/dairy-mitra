import { ExtractSuccess } from "@/lib/types";

type ResultCardProps = {
  result: ExtractSuccess;
  onChange: (next: ExtractSuccess) => void;
};

export function ResultCard({ result, onChange }: ResultCardProps) {
  const updateField = <K extends keyof ExtractSuccess["fields"]>(key: K, value: ExtractSuccess["fields"][K]) => {
    onChange({
      ...result,
      fields: {
        ...result.fields,
        [key]: value
      }
    });
  };

  return (
    <div className="card-surface p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage)]">
            Extracted Subscription
          </p>
          <h3 className="section-title mt-2 text-2xl">Editable order card</h3>
        </div>
        <div className="rounded-full bg-[rgba(22,101,52,0.12)] px-4 py-2 text-sm font-semibold text-[var(--ok)]">
          Confidence {(result.confidence * 100).toFixed(0)}%
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Customer</span>
          <input
            className="field"
            value={result.customer.name}
            onChange={(event) =>
              onChange({
                ...result,
                customer: {
                  ...result.customer,
                  name: event.target.value
                }
              })
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Action</span>
          <select
            className="field"
            value={result.intent}
            onChange={(event) => onChange({ ...result, intent: event.target.value as ExtractSuccess["intent"] })}
          >
            <option value="new_subscription">New subscription</option>
            <option value="pause">Pause</option>
            <option value="quantity_change">Quantity change</option>
            <option value="cancel">Cancel</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Product</span>
          <input
            className="field"
            value={result.fields.product ?? ""}
            onChange={(event) => updateField("product", event.target.value || null)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Quantity liters</span>
          <input
            className="field"
            type="number"
            min="0"
            step="0.5"
            value={result.fields.quantityLiters ?? ""}
            onChange={(event) =>
              updateField("quantityLiters", event.target.value ? Number(event.target.value) : null)
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Rate per liter</span>
          <input
            className="field"
            type="number"
            min="0"
            step="1"
            value={result.fields.ratePerLiter ?? ""}
            onChange={(event) =>
              updateField("ratePerLiter", event.target.value ? Number(event.target.value) : null)
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--muted)]">Status</span>
          <input
            className="field"
            value={result.fields.status ?? ""}
            onChange={(event) => updateField("status", event.target.value || null)}
          />
        </label>
      </div>
    </div>
  );
}
