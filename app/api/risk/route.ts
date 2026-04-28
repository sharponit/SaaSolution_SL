import { NextRequest, NextResponse } from 'next/server';
import { computeRisk } from '@/lib/risk';
export async function POST(req: NextRequest) {
  const input = await req.json();
  return NextResponse.json(computeRisk(input));
}
