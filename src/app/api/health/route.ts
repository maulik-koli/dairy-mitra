import { NextResponse } from "next/server";

const GEMMA_API_URL = process.env.GEMMA_API_URL;
const USE_MOCK_GEMMA = process.env.USE_MOCK_GEMMA !== "false";

export async function GET() {
  if (USE_MOCK_GEMMA || !GEMMA_API_URL) {
    return NextResponse.json({
      status: "ok",
      mode: "mock"
    });
  }

  try {
    const response = await fetch(`${GEMMA_API_URL}/health`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          mode: "live",
          message: "Gemma API healthcheck failed."
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      status: "ok",
      mode: "live",
      provider: data
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        mode: "live",
        message: "Could not reach Gemma API."
      },
      { status: 502 }
    );
  }
}
