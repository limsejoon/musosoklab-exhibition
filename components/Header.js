export default function Header({ artistName }) {
  return (
    <header
      className="sticky top-0 z-10 px-4 py-3 flex items-center justify-center"
      style={{ backgroundColor: '#1A1916' }}
    >
      <h1 className="text-white text-sm font-medium tracking-widest uppercase">
        무소속랩 전시
      </h1>
      {artistName && (
        <span className="absolute right-4 text-xs" style={{ color: '#C4954A' }}>
          {artistName}
        </span>
      )}
    </header>
  );
}
