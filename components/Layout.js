export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F3EE' }}>
      {children}
    </div>
  );
}
