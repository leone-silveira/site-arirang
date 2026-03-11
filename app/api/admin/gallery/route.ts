import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('image');
  const title = form.get('title')?.toString() ?? 'Imagem';
  const caption = form.get('caption')?.toString() ?? '';

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const data = Buffer.from(arrayBuffer);

  const prisma = getPrisma();
  const image = await prisma.galleryImage.create({
    data: {
      title,
      caption,
      mimeType: file.type || 'image/jpeg',
      data,
    },
  });

  return NextResponse.json({ image });
}
