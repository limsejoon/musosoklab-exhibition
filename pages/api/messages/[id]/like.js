import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const id = Number(req.query.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });

  const message = await prisma.message.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });

  res.status(200).json({ likes: message.likes });
}
