export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getPrisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = getPrisma();           // só aqui é que o client é criado

  await prisma.contact.create({ data: body });

  return NextResponse.json({ ok: true });
}