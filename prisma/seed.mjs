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

const dummyMessages = [
  // 김예술
  { slug: 'artist-1', nickname: '민지', question: '이 작품에서 가장 인상 깊었던 부분은 무엇인가요?', content: '낡은 물건들이 모여서 이렇게 아름다운 이야기가 된다는 게 정말 신기했어요. 제 할머니 댁에서 봤던 오래된 물건들이 생각났습니다.', likes: 7 },
  { slug: 'artist-1', nickname: '익명', question: '이 작품이 당신에게 떠올리게 하는 것은 무엇인가요?', content: '어린 시절 다락방에서 발견한 낡은 앨범들이 생각났어요. 시간이 쌓이는 방식이 이 작품과 닮아 있는 것 같습니다.', likes: 3 },
  { slug: 'artist-1', nickname: '준서', question: '작가에게 전하고 싶은 말이 있다면?', content: '오브제 하나하나에 담긴 이야기가 느껴졌습니다. 다음 작품도 기대할게요!', likes: 5 },
  { slug: 'artist-1', nickname: '하은', question: '이 작품에서 가장 인상 깊었던 부분은 무엇인가요?', content: '빛과 그림자가 오브제 위에 떨어지는 방식이 너무 아름다웠어요. 한참을 바라보게 되더라고요.', likes: 2 },
  // 이창작
  { slug: 'artist-2', nickname: '서연', question: '이 공간에서 어떤 감정을 느끼셨나요?', content: '처음엔 차가운 느낌이었는데 안으로 들어갈수록 따뜻해지는 게 신기했어요. 빛이 이렇게 감정을 바꿀 수 있다는 걸 처음 알았습니다.', likes: 9 },
  { slug: 'artist-2', nickname: '도윤', question: '빛과 그림자 중 어느 것에 더 끌리셨나요?', content: '그림자요. 움직일 때마다 그림자가 달라지는 게 마치 제 다른 모습을 보는 것 같았어요.', likes: 6 },
  { slug: 'artist-2', nickname: '익명', question: '작가에게 궁금한 점이 있다면?', content: '이 작품을 처음 구상하셨을 때 어떤 장면에서 영감을 받으셨나요? 너무 궁금합니다.', likes: 4 },
  { slug: 'artist-2', nickname: '수아', question: '이 공간에서 어떤 감정을 느끼셨나요?', content: '공간 자체가 살아 숨쉬는 것 같아서 신기했어요. 오래 머물고 싶었습니다.', likes: 1 },
  // 박소리
  { slug: 'artist-3', nickname: '지호', question: '이 사운드에서 어떤 색이 느껴지셨나요?', content: '처음엔 파란색, 그러다가 점점 주황빛으로 변하는 느낌이었어요. 소리가 색깔로 보인다는 게 신기한 경험이었습니다.', likes: 8 },
  { slug: 'artist-3', nickname: '예린', question: '소리가 공간을 어떻게 변화시켰나요?', content: '소리가 커질수록 공간이 넓어지는 것 같았어요. 눈을 감으면 완전히 다른 세계에 있는 것 같은 느낌이었습니다.', likes: 5 },
  { slug: 'artist-3', nickname: '익명', question: '당신이 이 작품에 소리를 더한다면 어떤 소리를 추가하겠나요?', content: '빗소리요. 이 작품의 분위기에 빗소리가 더해지면 완전한 고요함이 될 것 같아요.', likes: 3 },
];

async function main() {
  console.log('Seeding database...');

  await prisma.message.deleteMany();
  await prisma.artist.deleteMany();

  const created = {};
  for (const artist of artists) {
    const a = await prisma.artist.create({ data: artist });
    created[artist.slug] = a;
    console.log(`Created artist: ${a.name}`);
  }

  for (const msg of dummyMessages) {
    await prisma.message.create({
      data: {
        artistId: created[msg.slug].id,
        nickname: msg.nickname,
        question: msg.question,
        content: msg.content,
        likes: msg.likes,
      },
    });
  }
  console.log(`Created ${dummyMessages.length} dummy messages.`);

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
