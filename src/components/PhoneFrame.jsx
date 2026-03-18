export default function PhoneFrame({ children }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: 393, height: 852 }}
    >
      {/* Outer bezel */}
      <div
        className="absolute inset-0 rounded-[52px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
          padding: 10,
          boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Screen glass */}
        <div
          className="w-full h-full rounded-[44px] overflow-hidden relative bg-white"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 z-50 bg-black rounded-full"
            style={{ width: 120, height: 34, transform: 'translateX(-50%)' }}
          />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-14 z-40 flex items-end px-6 pb-2 pointer-events-none">
            <span className="text-xs font-semibold text-slate-800 mr-auto">11:30</span>
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-slate-800">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="4.5" y="5" width="3" height="7" rx="1" />
                <rect x="9" y="2" width="3" height="10" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              {/* Wifi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-slate-800">
                <path d="M8 10.5a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
                <path d="M4.5 7.5C5.8 6.2 6.8 5.5 8 5.5s2.2.7 3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M2 4.5C3.8 2.7 5.8 1.5 8 1.5s4.2 1.2 6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-0.5">
                <div className="w-6 h-3.5 rounded-sm border border-slate-800 flex items-center p-0.5">
                  <div className="h-full bg-slate-800 rounded-sm" style={{ width: '80%' }} />
                </div>
                <div className="w-0.5 h-2 rounded-r-sm bg-slate-800 opacity-50" />
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 z-50 h-1 w-32 rounded-full bg-black opacity-20 pointer-events-none"
            style={{ transform: 'translateX(-50%)' }} />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute left-[-3px] top-[100px] w-1 h-8 bg-slate-700 rounded-l-sm" />
      <div className="absolute left-[-3px] top-[140px] w-1 h-14 bg-slate-700 rounded-l-sm" />
      <div className="absolute left-[-3px] top-[165px] w-1 h-14 bg-slate-700 rounded-l-sm" />
      <div className="absolute right-[-3px] top-[130px] w-1 h-20 bg-slate-700 rounded-r-sm" />
    </div>
  );
}
