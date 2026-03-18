export default function BottomNav({ active = 'home', onNavigate }) {
  const items = [
    {
      key: 'home', label: 'Home',
      icon: (filled) => (
        <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      key: 'progress', label: 'Progress',
      icon: (filled) => (
        <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      key: 'explore', label: 'Explore',
      icon: (filled) => (
        <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="sticky bottom-4 mx-4 z-30">
      <div
        className="flex items-center justify-around px-2 py-2 rounded-3xl"
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 8px 24px rgba(61,122,79,0.15)',
          border: '1px solid #E8F5EA',
        }}
      >
        {items.map(({ key, label, icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate && onNavigate(key)}
              className="flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-colors"
              style={{ color: isActive ? '#3D7A4F' : '#B8DBBF' }}
            >
              {icon(isActive)}
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
