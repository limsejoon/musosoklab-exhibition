import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const artists = [
  {
    slug: 'artist-1',
    name: '김예술',
    bio: '서울을 기반으로 활동하는 현대 미술 작가입니다. 일상의 사물에서 새로운 의미를 발견하는 작업을 이어가고 있습니다.',
    region: '서울',
    tags: JSON.stringify(['설치', '조각', '현대미술']),
    questions: JSON.stringify([
      '이 작품에서 가장 인상 깊었던 부분은 무엇인가요?',
      '작가에게 전하고 싶은 말이 있다면?',
      '이 작품이 당신에게 떠올리게 하는 것은 무엇인가요?',
    ]),
    workTitle: '존재의 흔적',
    workMeta: '혼합 매체, 2024',
    workQuote: '우리가 남기는 흔적들이 곧 우리의 이야기가 됩니다.',
    workDesc: '일상에서 수집한 오브제들로 구성된 설치 작품으로, 시간의 흐름과 기억의 층위를 탐구합니다.',
  },
  {
    slug: 'artist-2',
    name: '이창작',
    bio: '부산 출신으로 공간과 빛을 주제로 한 작업을 합니다. 관람객과의 상호작용을 중시하는 참여형 예술을 지향합니다.',
    region: '부산',
    tags: JSON.stringify(['미디어아트', '빛', '인터랙티브']),
    questions: JSON.stringify([
      '이 공간에서 어떤 감정을 느끼셨나요?',
      '빛과 그림자 중 어느 것에 더 끌리셨나요?',
      '작가에게 궁금한 점이 있다면?',
    ]),
    workTitle: '빛의 방',
    workMeta: '미디어 설치, LED, 2024',
    workQuote: '빛은 공간을 만들고, 그림자는 이야기를 만듭니다.',
    workDesc: '관람객의 움직임에 반응하는 인터랙티브 조명 설치 작품입니다. 빛과 그림자의 유희를 통해 공간의 새로운 가능성을 탐색합니다.',
  },
  {
    slug: 'artist-3',
    name: '박소리',
    bio: '음악과 시각예술의 경계를 탐구하는 작가입니다. 소리를 시각화하고 공간을 청각화하는 실험적 작업을 합니다.',
    region: '대구',
    tags: JSON.stringify(['사운드아트', '실험음악', '융합예술']),
    questions: JSON.stringify([
      '이 사운드에서 어떤 색이 느껴지셨나요?',
      '소리가 공간을 어떻게 변화시켰나요?',
      '당신이 이 작품에 소리를 더한다면 어떤 소리를 추가하겠나요?',
    ]),
    workTitle: '소리의 형상',
    workMeta: '사운드 설치, 8채널, 2024',
    workQuote: '소리에는 눈에 보이지 않는 형태가 있습니다.',
    workDesc: '8채널 사운드 시스템을 통해 공간 전체를 청각적 조각으로 만드는 사운드 설치 작품입니다.',
  },
];

async function main() {
  console.log('Seeding database...');

  await prisma.message.deleteMany();
  await prisma.artist.deleteMany();

  for (const artist of artists) {
    const created = await prisma.artist.create({ data: artist });
    console.log(`Created artist: ${created.name} (${created.slug})`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
