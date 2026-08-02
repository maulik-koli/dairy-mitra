import { CUSTOMERS } from "@/lib/customers";
import { ExtractFailure } from "@/lib/types";

const PAUSE_KEYWORDS = ["બંધ", "pause", "rok", "રાખજો", "cancel", "બંધ રાખજો", "બંધ કર"];
const CHANGE_KEYWORDS = ["થી", "change", "કરી નાખો", "increase", "decrease"];

export function normalizeInstruction(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function findMatchingCustomer(text: string) {
  const normalized = normalizeInstruction(text);

  return CUSTOMERS.find((customer) =>
    customer.nameAliases.some((alias) => normalized.includes(alias.toLowerCase()))
  );
}

export function runMatchingGuard(
  text: string
):
  | { ok: true; match: (typeof CUSTOMERS)[number] | undefined }
  | ExtractFailure {
  const normalized = normalizeInstruction(text);
  const match = findMatchingCustomer(text);
  const isPauseOrChange = [...PAUSE_KEYWORDS, ...CHANGE_KEYWORDS].some((keyword) =>
    normalized.includes(keyword)
  );

  if (!match && isPauseOrChange) {
    return {
      ok: false,
      code: "UNKNOWN_CUSTOMER",
      message: "This sounds like a pause or change request, but the customer name was not found in the seeded ledger."
    };
  }

  return {
    ok: true,
    match
  };
}
