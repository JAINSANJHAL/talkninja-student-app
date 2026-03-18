import BottomNav from '../components/BottomNav';

const STUDENT = { name: 'Mia', level: 3, xp: 45, xpMax: 100, streak: 5 };

const SCHOOL = { name: 'Westlake Debate Academy', coach: 'Ms. Patel' };

const ASSIGNMENT = {
  topic: 'Should AI be regulated?',
  speechType: 'Congressional',
  timeLimit: '2 min',
  daysLeft: 3,
  hoursLeft: 14,
  xp: 50,
};

const DAILY = {
  topic: 'If you could have any superpower for a day, what would it be and why?',
  difficulty: 'Easy',
  timeLimit: '2 min',
  xp: 23,
};

const SPEECH_TYPES = [
  { name: 'Congressional', emoji: '🏛️', bg: '#3D7A4F' },
  { name: 'Declamation',   emoji: '📜', bg: '#81B5C4' },
  { name: 'SPAR',          emoji: '⚡', bg: '#E8C547' },
  { name: 'Storytelling',  emoji: '📖', bg: '#E07A5F' },
  { name: 'Oratory',       emoji: '🎤', bg: '#5A9E6A' },
];

const MORE_CHALLENGES = [
  { title: 'Importance of digital literacy', time: '1.5 min', xp: 30, diff: 'Medium' },
  { title: 'Should social media be banned for teens?', time: '2 min', xp: 35, diff: 'Hard' },
];


export default function HomeScreen({ onStart, onStartDaily, onNavigate }) {
  return (
    <div className="flex flex-col min-h-full pb-4" style={{ backgroundColor: '#F5F2EC' }}>
      {/* Header — Forest Green gradient */}
      <div
        className="relative overflow-hidden px-5 pt-16 pb-6"
        style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #3D7A4F 60%, #5A9E6A 100%)' }}
      >
        {/* Decorative shuriken */}
        <div className="absolute top-10 right-4 opacity-[0.07]">
          <svg width="110" height="110" viewBox="0 0 120 120" fill="white">
            <polygon points="60,0 75,45 120,60 75,75 60,120 45,75 0,60 45,45" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-24 opacity-[0.04]">
          <svg width="56" height="56" viewBox="0 0 120 120" fill="white">
            <polygon points="60,0 75,45 120,60 75,75 60,120 45,75 0,60 45,45" />
          </svg>
        </div>

        {/* School name */}
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <span className="text-white font-bold text-xs">WDA</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {SCHOOL.name}
          </span>
        </div>

        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: '#85C093' }}>Good morning,</p>
            <h1 className="text-white text-2xl font-bold">Welcome, {STUDENT.name}!</h1>
          </div>
          <div
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.25)' }}
          >
            🐠
          </div>
        </div>

        {/* XP bar */}
        <div
          className="mt-4 rounded-2xl p-3 flex items-center gap-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
            style={{ backgroundColor: '#E8C547', color: '#8A7200' }}
          >
            L{STUDENT.level}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <span className="text-white text-xs font-semibold">Level {STUDENT.level}</span>
              <span className="text-xs" style={{ color: '#85C093' }}>{STUDENT.xp}/{STUDENT.xpMax} XP</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(STUDENT.xp / STUDENT.xpMax) * 100}%`, backgroundColor: '#E8C547' }}
              />
            </div>
          </div>
          {STUDENT.streak > 0 && (
            <div
              className="flex items-center gap-1 rounded-xl px-2 py-1 shrink-0"
              style={{ backgroundColor: 'rgba(232,197,71,0.25)' }}
            >
              <span className="text-lg leading-none">🔥</span>
              <span className="text-xs font-bold" style={{ color: '#E8C547' }}>{STUDENT.streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 space-y-4">
        {/* Assigned Challenge */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #B8DBBF' }}>
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{ backgroundColor: '#E8F5EA' }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#3D7A4F' }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#2C6140' }}>
              Assigned by {SCHOOL.coach}
            </span>
            <div
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5"
              style={{ backgroundColor: '#FDF2EF' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#E07A5F' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold" style={{ color: '#E07A5F' }}>
                {ASSIGNMENT.daysLeft}d {ASSIGNMENT.hoursLeft}h left
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex gap-2 mb-2.5 flex-wrap">
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: '#EFF7F9', color: '#1A3D48' }}>
                {ASSIGNMENT.speechType}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: '#F5F2EC', color: '#4A4A3F' }}>
                ⏱ {ASSIGNMENT.timeLimit}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: '#FEFAEE', color: '#8A7200' }}>
                ⚡ +{ASSIGNMENT.xp} XP
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug mb-3" style={{ color: '#1F4D2E' }}>
              "{ASSIGNMENT.topic}"
            </p>
            <button
              onClick={onStart}
              onClick={onStart}
              className="w-full py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all"
              style={{
                backgroundColor: '#3D7A4F',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(61,122,79,0.3)',
              }}
            >
              Start Challenge →
            </button>
          </div>
        </div>

        {/* Daily Challenge */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2C6140, #3D7A4F)' }}
        >
          <div className="px-4 pt-3.5 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#85C093' }}>
                Daily Challenge
              </span>
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {DAILY.timeLimit}
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {DAILY.difficulty}
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: '#E8C547', color: '#8A7200' }}>
                  ⚡ +{DAILY.xp} XP
                </span>
              </div>
            </div>
            <p className="text-white font-semibold text-sm leading-snug mb-3">{DAILY.topic}</p>
            <div className="flex justify-end">
              <button
                onClick={onStartDaily}
                className="text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-all"
                style={{ backgroundColor: '#fff', color: '#2C6140' }}
              >
                Start challenge
              </button>
            </div>
          </div>
        </div>

        {/* Explore speech types — FIXED: each item has enough width for label */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm" style={{ color: '#1F4D2E' }}>Explore speech types</h2>
            <button onClick={() => onNavigate && onNavigate('explore')} className="text-xs font-semibold" style={{ color: '#3D7A4F' }}>View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {SPEECH_TYPES.map(({ name, emoji, bg }) => (
              <div key={name} className="flex flex-col items-center gap-2 shrink-0" style={{ width: 68 }}>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                  style={{ backgroundColor: bg }}
                >
                  {emoji}
                </div>
                <span
                  className="text-center leading-tight font-medium"
                  style={{
                    fontSize: 10,
                    color: '#4A4A3F',
                    width: 68,
                    wordBreak: 'break-word',
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* More challenges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm" style={{ color: '#1F4D2E' }}>More challenges</h2>
            <button className="text-xs font-semibold" style={{ color: '#3D7A4F' }}>View more</button>
          </div>
          <div className="space-y-2.5">
            {MORE_CHALLENGES.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-sm"
                style={{ border: '1px solid #E8F5EA' }}
              >
                <div
                  className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-xl"
                  style={{ backgroundColor: '#E8F5EA' }}
                >
                  🎤
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug line-clamp-2" style={{ color: '#1F4D2E' }}>
                    {c.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.5 }}>⏱ {c.time}</span>
                    <span className="text-xs font-semibold" style={{ color: '#8A7200' }}>⚡ +{c.xp} XP</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: c.diff === 'Hard' ? '#E07A5F' : '#E8C547' }}
                    >
                      {c.diff}
                    </span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#E8F5EA' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#3D7A4F' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
