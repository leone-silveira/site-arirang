export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prisma = getPrisma();
    await prisma.contact.create({
      data: body,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
