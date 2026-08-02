import { NextRequest, NextResponse } from "next/server";
import { runMatchingGuard } from "@/lib/matching";
import { extractRequestSchema } from "@/lib/types";
import { mockExtract } from "@/lib/mock-gemma";
import { extractWithGemma } from "@/lib/gemma-client";

const USE_MOCK_GEMMA = process.env.USE_MOCK_GEMMA !== "false";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = extractRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_INPUT",
          message: "Please provide a text instruction."
        },
        { status: 400 }
      );
    }

    const guard = runMatchingGuard(parsed.data.text);
    if (!guard.ok) {
      return NextResponse.json(guard, { status: 400 });
    }

    const response = USE_MOCK_GEMMA
      ? mockExtract(parsed.data.text, guard.match?.id ?? null)
      : await extractWithGemma(parsed.data.text);

    return NextResponse.json(response, { status: response.ok ? 200 : 400 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "MODEL_ERROR",
        message: "Something went wrong while extracting the instruction."
      },
      { status: 500 }
    );
  }
}
