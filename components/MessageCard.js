import { useState } from 'react';

export default function MessageCard({ message }) {
  const [likes, setLikes] = useState(message.likes);
  const [liking, setLiking] = useState(false);

  async function handleLike() {
    if (liking) return;
    setLiking(true);
    try {
      const res = await fetch(`/api/messages/${message.id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      }
    } finally {
      setLiking(false);
    }
  }

  const date = new Date(message.createdAt).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DC' }}
    >
      <p className="text-xs" style={{ color: '#C4954A' }}>{message.question}</p>
      <p className="text-sm leading-relaxed" style={{ color: '#1A1916' }}>{message.content}</p>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: '#888888' }}>{message.nickname}</span>
          <span className="text-xs" style={{ color: '#CCCCCC' }}>·</span>
          <span className="text-xs" style={{ color: '#CCCCCC' }}>{date}</span>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-xs transition-opacity"
          style={{ color: likes > 0 ? '#C4954A' : '#888888' }}
        >
          <span>{likes > 0 ? '♥' : '♡'}</span>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
