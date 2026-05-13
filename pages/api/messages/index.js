import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { artistId } = req.query;

  if (req.method === 'GET') {
    if (!artistId) return res.status(400).json({ error: 'artistId required' });

    const messages = await prisma.message.findMany({
      where: { artistId: Number(artistId) },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { artistId: bodyArtistId, nickname, question, content } = req.body;
    const aid = Number(bodyArtistId);

    if (!aid || !question || !content) {
      return res.status(400).json({ error: 'artistId, question, content required' });
    }

    const message = await prisma.message.create({
      data: {
        artistId: aid,
        nickname: nickname || '익명',
        question,
        content,
      },
    });
    return res.status(201).json(message);
  }

  res.status(405).end();
}
