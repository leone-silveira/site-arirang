export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getPrisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = getPrisma();

  await prisma.contact.create({ data: body });

  return NextResponse.json({ ok: true });
}