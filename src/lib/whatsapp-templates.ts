import { ExtractSuccess } from "@/lib/types";

export function buildFallbackWhatsAppMessage(result: ExtractSuccess) {
  const qty = result.fields.quantityLiters ? `${result.fields.quantityLiters} લિટર` : "તમારો ઓર્ડર";
  const product = result.fields.product ? ` ${result.fields.product}` : "";

  if (result.intent === "pause") {
    return `નમસ્તે ${result.customer.name}, તમારું દૂધ આપવાનું થોડા સમય માટે રોકવામાં આવ્યું છે. - Dairy Mitra`;
  }

  if (result.intent === "quantity_change") {
    return `નમસ્તે ${result.customer.name}, તમારું દૂધ ${qty}${product} મુજબ અપડેટ કરવામાં આવ્યું છે. - Dairy Mitra`;
  }

  if (result.intent === "cancel") {
    return `નમસ્તે ${result.customer.name}, તમારું દૂધ સબ્સ્ક્રિપ્શન બંધ કરવામાં આવ્યું છે. - Dairy Mitra`;
  }

  return `નમસ્તે ${result.customer.name}, તમારું ${qty}${product} આજથી ચાલુ કરવામાં આવ્યું છે. - Dairy Mitra`;
}
