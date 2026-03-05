export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getPrisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // basic validation - ensure required fields exist
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: 'missing name, email or message' },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    await prisma.contact.create({ data: body });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // log the original error so it shows up in Vercel/terminal logs
    console.error('POST /api/contato error:', err);

    // return a generic message to the client
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'unknown' },
      { status: 500 }
    );
  }
}