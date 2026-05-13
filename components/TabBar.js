export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="flex border-b" style={{ borderColor: '#E8E4DC' }}>
      {['방명록', '작품 소개'].map((label, i) => {
        const tab = i === 0 ? 'guestbook' : 'artwork';
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="flex-1 py-3 text-sm font-medium transition-colors"
            style={{
              color: isActive ? '#1A1916' : '#888888',
              borderBottom: isActive ? '2px solid #C4954A' : '2px solid transparent',
              marginBottom: '-1px',
              background: 'none',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
