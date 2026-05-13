import { useState } from 'react';

export default function MessageForm({ artistId, selectedQuestion, onSuccess }) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedQuestion || !content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistId,
          nickname: nickname.trim() || '익명',
          question: selectedQuestion,
          content: content.trim(),
        }),
      });
      if (res.ok) {
        const msg = await res.json();
        setNickname('');
        setContent('');
        onSuccess(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col gap-3">
      <input
        type="text"
        placeholder="닉네임 (선택, 기본: 익명)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={20}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DC', color: '#1A1916' }}
      />
      <textarea
        placeholder={selectedQuestion ? '여기에 답변을 남겨보세요' : '먼저 질문을 선택해 주세요'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
        rows={4}
        disabled={!selectedQuestion}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DC',
          color: '#1A1916',
          opacity: selectedQuestion ? 1 : 0.5,
        }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#888888' }}>
          {content.length}/300
        </span>
        <button
          type="submit"
          disabled={!selectedQuestion || !content.trim() || submitting}
          className="px-6 py-2 rounded-full text-sm font-medium text-white transition-opacity"
          style={{
            backgroundColor: '#C4954A',
            opacity: !selectedQuestion || !content.trim() || submitting ? 0.4 : 1,
          }}
        >
          {submitting ? '전송 중…' : '남기기'}
        </button>
      </div>
    </form>
  );
}
