export default function ArtworkTab({ artist }) {
  const tags = JSON.parse(artist.tags || '[]');

  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{ backgroundColor: '#F0EDE6', color: '#888888' }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-serif" style={{ color: '#1A1916', fontFamily: 'var(--font-serif)' }}>
          {artist.name}
        </h2>
        <p className="text-xs" style={{ color: '#888888' }}>{artist.region}</p>
        <p className="text-sm leading-relaxed mt-1" style={{ color: '#444444' }}>{artist.bio}</p>
      </div>

      <div
        className="rounded-2xl p-5 flex flex-col gap-3"
        style={{ backgroundColor: '#1A1916' }}
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: '#C4954A' }}>Work</p>
        <h3 className="text-lg font-serif text-white" style={{ fontFamily: 'var(--font-serif)' }}>
          {artist.workTitle}
        </h3>
        <p className="text-xs" style={{ color: '#888888' }}>{artist.workMeta}</p>
        <blockquote
          className="text-sm italic leading-relaxed border-l-2 pl-3 mt-1"
          style={{ color: '#C4954A', borderColor: '#C4954A' }}
        >
          "{artist.workQuote}"
        </blockquote>
        <p className="text-sm leading-relaxed" style={{ color: '#BBBBBB' }}>{artist.workDesc}</p>
      </div>
    </div>
  );
}
