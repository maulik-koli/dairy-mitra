import { extractFailureSchema, extractSuccessSchema, ExtractResponse } from "@/lib/types";

const GEMMA_API_URL = process.env.GEMMA_API_URL;

export async function extractWithGemma(text: string): Promise<ExtractResponse> {
  if (!GEMMA_API_URL) {
    return {
      ok: false,
      code: "MODEL_ERROR",
      message: "GEMMA_API_URL is not configured."
    };
  }

  const response = await fetch(`${GEMMA_API_URL}/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text }),
    cache: "no-store"
  });

  if (!response.ok) {
    return {
      ok: false,
      code: "MODEL_ERROR",
      message: "Live Gemma endpoint returned an error."
    };
  }

  const payload = await response.json();
  const success = extractSuccessSchema.safeParse(payload);
  if (success.success) {
    return success.data;
  }

  const failure = extractFailureSchema.safeParse(payload);
  if (failure.success) {
    return failure.data;
  }

  return {
    ok: false,
    code: "MODEL_ERROR",
    message: "Live Gemma response did not match the expected schema."
  };
}
