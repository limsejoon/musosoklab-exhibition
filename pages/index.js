import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import prisma from '@/lib/prisma';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Toast from '@/components/Toast';
import QuestionBubble from '@/components/QuestionBubble';
import MessageForm from '@/components/MessageForm';
import MessageCard from '@/components/MessageCard';
import ArtworkTab from '@/components/ArtworkTab';

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany({ orderBy: { id: 'asc' } });
  return { props: { artists } };
}

export default function Home({ artists }) {
  const [artistIndex, setArtistIndex] = useState(0);
  const [tab, setTab] = useState('guestbook');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [toast, setToast] = useState('');

  const artist = artists[artistIndex];
  const questions = JSON.parse(artist?.questions || '[]');

  const loadMessages = useCallback(async (id) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/messages?artistId=${id}`);
      const data = await res.json();
      setMessages(data);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (artist) loadMessages(artist.id);
  }, []);

  function selectArtist(index) {
    setArtistIndex(index);
    setSelectedQuestion(null);
    setMessages([]);
    setTab('guestbook');
    loadMessages(artists[index].id);
  }

  function handleMessagePosted(msg) {
    setMessages((prev) => [msg, ...prev]);
    setSelectedQuestion(null);
    setToast('방명록이 등록되었습니다 ✓');
  }

  if (!artist) return null;

  return (
    <>
      <Head>
        <title>무소속랩 전시 방명록</title>
        <meta name="description" content="무소속랩 전시 인터랙티브 방명록" />
      </Head>
      <Layout>
        <Header artistName={artist.name} />

        {artists.length > 1 && (
          <div className="flex gap-1 px-4 pt-3 pb-1 overflow-x-auto">
            {artists.map((a, i) => (
              <button
                key={a.id}
                onClick={() => selectArtist(i)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs transition-all"
                style={{
                  backgroundColor: i === artistIndex ? '#1A1916' : '#FFFFFF',
                  color: i === artistIndex ? '#FFFFFF' : '#888888',
                  border: '1px solid #E8E4DC',
                }}
              >
                {a.name}
              </button>
            ))}
          </div>
        )}

        <TabBar activeTab={tab} onTabChange={setTab} />

        <div className="flex-1 overflow-y-auto pb-6">
          {tab === 'guestbook' ? (
            <>
              <QuestionBubble
                questions={questions}
                selected={selectedQuestion}
                onSelect={setSelectedQuestion}
              />
              <MessageForm
                artistId={artist.id}
                selectedQuestion={selectedQuestion}
                onSuccess={handleMessagePosted}
              />
              <div className="px-4 flex flex-col gap-3 mt-2">
                {loadingMessages ? (
                  <p className="text-center text-sm py-4" style={{ color: '#888888' }}>불러오는 중…</p>
                ) : messages.length === 0 ? (
                  <p className="text-center text-sm py-4" style={{ color: '#888888' }}>
                    아직 방명록이 없습니다. 첫 번째로 남겨보세요!
                  </p>
                ) : (
                  messages.map((m) => <MessageCard key={m.id} message={m} />)
                )}
              </div>
            </>
          ) : (
            <ArtworkTab artist={artist} />
          )}
        </div>

        <Toast message={toast} onClose={() => setToast('')} />
      </Layout>
    </>
  );
}
