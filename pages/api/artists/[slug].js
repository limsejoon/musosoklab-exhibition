import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { slug } = req.query;

  const artist = await prisma.artist.findUnique({ where: { slug } });
  if (!artist) return res.status(404).json({ error: 'Artist not found' });

  res.status(200).json(artist);
}
