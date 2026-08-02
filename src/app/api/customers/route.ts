import { NextResponse } from "next/server";
import { CUSTOMERS } from "@/lib/customers";

export async function GET() {
  return NextResponse.json(CUSTOMERS);
}
