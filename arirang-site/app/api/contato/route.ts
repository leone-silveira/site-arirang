export const dynamic = "force-dynamic";
export const runtime = "nodejs";  

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.contact.create({
    data: body,
  });

  return NextResponse.json({ ok: true });
}