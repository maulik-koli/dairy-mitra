import { CUSTOMERS } from "@/lib/customers";
import { normalizeInstruction } from "@/lib/matching";
import { ExtractResponse, ExtractSuccess } from "@/lib/types";
import { buildFallbackWhatsAppMessage } from "@/lib/whatsapp-templates";

function withMessage(result: Omit<ExtractSuccess, "whatsappMessageGu"> & { whatsappMessageGu?: string }) {
  return {
    ...result,
    whatsappMessageGu: result.whatsappMessageGu ?? buildFallbackWhatsAppMessage(result as ExtractSuccess)
  } satisfies ExtractSuccess;
}

export function mockExtract(text: string, matchedCustomerId: string | null): ExtractResponse {
  const normalized = normalizeInstruction(text);
  const tomorrow = "2026-08-03";

  if (normalized.includes("સુરેશ")) {
    return {
      ok: false,
      code: "UNKNOWN_CUSTOMER",
      message: "Suresh is not in the seeded customer list, so this pause request was rejected."
    };
  }

  if (normalized.includes("ભાવિનભાઈ") || normalized.includes("bhavin")) {
    return withMessage({
      ok: true,
      intent: "new_subscription",
      confidence: 0.98,
      customer: {
        name: "Bhavinbhai",
        matchedCustomerId: matchedCustomerId ?? CUSTOMERS[0].id
      },
      fields: {
        product: "Buffalo Milk",
        quantityLiters: 2,
        frequency: "daily",
        startDate: "2026-08-02",
        ratePerLiter: 75,
        billing: "monthly",
        status: "active"
      },
      whatsappMessageGu:
        "નમસ્તે ભાવિનભાઈ, તમારું 2 લિટર ભેંસનું દૂધ આજથી શરૂ કરવામાં આવ્યું છે. મહિને બિલ આપવામાં આવશે. - Dairy Mitra"
    });
  }

  if (normalized.includes("રમાબેન") || normalized.includes("rama")) {
    return withMessage({
      ok: true,
      intent: "pause",
      confidence: 0.97,
      customer: {
        name: "Ramaben",
        matchedCustomerId: matchedCustomerId ?? CUSTOMERS[1].id
      },
      fields: {
        product: "Cow Milk",
        quantityLiters: 1,
        effectiveDate: tomorrow,
        pauseDates: [tomorrow],
        reason: "ગામડે જાય છે",
        ratePerLiter: 60,
        billing: "monthly",
        status: "paused"
      },
      whatsappMessageGu:
        "નમસ્તે રમાબેન, કાલે માટે તમારું દૂધ બંધ રાખવામાં આવશે. તમે ગામડે જાઓ છો તે મુજબ નોંધ કરી છે. - Dairy Mitra"
    });
  }

  if (normalized.includes("પટેલ") || normalized.includes("patel")) {
    return withMessage({
      ok: true,
      intent: "quantity_change",
      confidence: 0.96,
      customer: {
        name: "Patel Saheb",
        matchedCustomerId: matchedCustomerId ?? CUSTOMERS[2].id
      },
      fields: {
        product: "Cow Milk",
        quantityLiters: 1.5,
        oldQuantityLiters: 1,
        effectiveDate: "2026-08-02",
        frequency: "daily",
        ratePerLiter: 60,
        billing: "monthly",
        status: "active"
      },
      whatsappMessageGu:
        "નમસ્તે પટેલ સાહેબ, તમારું દૂધ આજથી 1 લિટરથી 1.5 લિટર કરવામાં આવ્યું છે. - Dairy Mitra"
    });
  }

  return {
    ok: false,
    code: "MODEL_ERROR",
    message: "Mock mode could not map this phrase. Try one of the demo examples or switch to live Gemma."
  };
}
