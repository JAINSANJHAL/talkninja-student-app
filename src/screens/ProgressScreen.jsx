import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

// ── Mock data ────────────────────────────────────────────────────────────────
const STUDENT = { level: 3, xp: 45, xpMax: 100, streak: 5, totalXp: 1240 };

const TIME_DATA = [
  { day: 'S', mins: 15 },
  { day: 'M', mins: 8 },
  { day: 'T', mins: 3 },
  { day: 'W', mins: 20 },
  { day: 'T', mins: 25 },
  { day: 'F', mins: 20 },
  { day: 'S', mins: 14 },
];

const SKILLS = [
  { label: 'Clarity',    score: 84, color: '#3D7A4F' },
  { label: 'Pacing',     score: 72, color: '#81B5C4' },
  { label: 'Vocabulary', score: 78, color: '#5A9E6A' },
  { label: 'Confidence', score: 80, color: '#E8C547' },
  { label: 'Fillers',    score: 66, color: '#E07A5F' },
];

const HISTORY = [
  { id: 5, date: 'Mar 17', topic: 'Should AI be regulated?',    type: 'Congressional', score: 82, xp: 40 },
  { id: 4, date: 'Mar 13', topic: 'Best age to learn a language', type: 'Informative',   score: 79, xp: 35 },
  { id: 3, date: 'Mar 9',  topic: 'Superpower for a day',        type: 'Impromptu',     score: 75, xp: 28 },
  { id: 2, date: 'Mar 5',  topic: 'Climate change solutions',    type: 'Policy debate', score: 72, xp: 25 },
  { id: 1, date: 'Mar 1',  topic: 'Digital literacy importance', type: 'Public forum',  score: 68, xp: 22 },
];

const BADGES = [
  { id: 1, emoji: '🔥', label: '5-Day Streak',    desc: 'Practice 5 days in a row',      earned: true  },
  { id: 2, emoji: '⚡', label: 'XP Hunter',       desc: 'Earn 1000 XP total',             earned: true  },
  { id: 3, emoji: '🎯', label: 'Sharp Shooter',   desc: 'Score 80%+ three times',         earned: true  },
  { id: 4, emoji: '🏛️', label: 'Debater',         desc: 'Complete 5 congressional debates', earned: false },
  { id: 5, emoji: '📈', label: 'On the Rise',     desc: 'Improve score 3 sessions in a row', earned: false },
  { id: 6, emoji: '🥷', label: 'Filler Slayer',   desc: 'Use 0 filler words in a session', earned: false },
  { id: 7, emoji: '🎤', label: 'Stage Ready',     desc: 'Complete 10 sessions',            earned: false },
  { id: 8, emoji: '🏆', label: 'Top of the Class',desc: 'Rank #1 in your school',          earned: false },
];

// ── Bar colour based on activity level ───────────────────────────────────────
function barColor(mins) {
  if (mins >= 18) return '#3D7A4F';
  if (mins >= 10) return '#E8C547';
  return '#E07A5F';
}

// ── Custom tooltip for bar chart ─────────────────────────────────────────────
function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg px-3 py-2 text-xs" style={{ border: '1px solid #E8F5EA' }}>
      <p className="font-semibold" style={{ color: '#1F4D2E' }}>{label}</p>
      <p style={{ color: '#3D7A4F' }}>{payload[0].value} min</p>
    </div>
  );
}

// ── Skill bar with floating score bubble ─────────────────────────────────────
function SkillBar({ label, score, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: '#4A4A3F' }}>{label}</span>
      </div>
      <div className="relative h-5 rounded-full overflow-visible" style={{ backgroundColor: '#E8F5EA' }}>
        {/* Track fill */}
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
        {/* Score bubble — sits at end of bar */}
        <div
          className="absolute top-1/2 flex items-center justify-center rounded-full text-white font-bold"
          style={{
            width: 28,
            height: 28,
            fontSize: 10,
            backgroundColor: color,
            border: '2px solid #fff',
            transform: 'translateY(-50%)',
            left: `calc(${score}% - 14px)`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          }}
        >
          {score}
        </div>
      </div>
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = ['Progress', 'History', 'Badges'];
  return (
    <div
      className="flex mx-5 mt-4 mb-5 rounded-2xl p-1"
      style={{ backgroundColor: '#E8F5EA' }}
    >
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
          style={
            active === t
              ? { backgroundColor: '#fff', color: '#1F4D2E', boxShadow: '0 1px 4px rgba(61,122,79,0.15)' }
              : { color: '#5A9E6A' }
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Progress tab ─────────────────────────────────────────────────────────────
function ProgressTab() {
  const avgMins = Math.round(TIME_DATA.reduce((a, b) => a + b.mins, 0) / TIME_DATA.length);
  const totalMins = TIME_DATA.reduce((a, b) => a + b.mins, 0);

  return (
    <div className="space-y-4 px-4">
      {/* Level + Streak row */}
      <div className="flex gap-3">
        {/* Level card */}
        <div
          className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2"
          style={{ border: '1px solid #E8F5EA' }}
        >
          <p className="text-xs font-semibold" style={{ color: '#4A4A3F', opacity: 0.55 }}>Level</p>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4"
            style={{ borderColor: '#3D7A4F', backgroundColor: '#E8F5EA' }}
          >
            🐠
          </div>
          <p className="font-bold" style={{ color: '#1F4D2E' }}>Level {STUDENT.level}</p>
          <div className="w-full">
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(STUDENT.xp / STUDENT.xpMax) * 100}%`,
                  backgroundColor: '#3D7A4F',
                }}
              />
            </div>
            <p className="text-center text-xs mt-1" style={{ color: '#4A4A3F', opacity: 0.55 }}>
              {STUDENT.xp}/{STUDENT.xpMax} xp
            </p>
          </div>
        </div>

        {/* Streak card */}
        <div
          className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2"
          style={{ border: '1px solid #E8F5EA' }}
        >
          <p className="text-xs font-semibold" style={{ color: '#4A4A3F', opacity: 0.55 }}>Current streak</p>
          <div className="text-5xl leading-none">🔥</div>
          <p className="font-bold text-center" style={{ color: '#1F4D2E' }}>
            {STUDENT.streak} day streak
          </p>
          <p className="text-xs text-center" style={{ color: '#8A7200' }}>
            ⚡ {STUDENT.totalXp} total XP
          </p>
        </div>
      </div>

      {/* Time spent bar chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
        <p className="font-semibold text-sm mb-3" style={{ color: '#1F4D2E' }}>Time Spent Per Day</p>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={TIME_DATA} margin={{ top: 4, right: 0, bottom: 0, left: -24 }} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EA" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: '#4A4A3F', opacity: 0.5 }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#4A4A3F', opacity: 0.4 }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(61,122,79,0.05)' }} />
            <Bar dataKey="mins" radius={[6, 6, 0, 0]}>
              {TIME_DATA.map((entry, i) => (
                <Cell key={i} fill={barColor(entry.mins)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Stats row */}
        <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #E8F5EA' }}>
          <div>
            <p className="text-xs" style={{ color: '#4A4A3F', opacity: 0.55 }}>Average time</p>
            <p className="text-xl font-bold" style={{ color: '#1F4D2E' }}>{avgMins}m</p>
            <p className="text-xs" style={{ color: '#3D7A4F' }}>▲ 2m+ vs last week</p>
          </div>
          <div className="w-px" style={{ backgroundColor: '#E8F5EA' }} />
          <div>
            <p className="text-xs" style={{ color: '#4A4A3F', opacity: 0.55 }}>Total time spent</p>
            <p className="text-xl font-bold" style={{ color: '#1F4D2E' }}>{totalMins}m</p>
            <p className="text-xs" style={{ color: '#E07A5F' }}>▼ 10m- vs last week</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          {[
            { color: '#3D7A4F', label: 'Great (18m+)' },
            { color: '#E8C547', label: 'Good (10m+)' },
            { color: '#E07A5F', label: 'Low (<10m)' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.6 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
        <p className="font-semibold text-sm mb-4" style={{ color: '#1F4D2E' }}>Skills progress</p>
        {SKILLS.map((skill) => (
          <SkillBar key={skill.label} {...skill} />
        ))}
      </div>
    </div>
  );
}

// ── History tab ───────────────────────────────────────────────────────────────
function HistoryTab() {
  function scoreStyle(s) {
    if (s >= 80) return { bg: '#E8F5EA', text: '#1F4D2E' };
    if (s >= 70) return { bg: '#FEFAEE', text: '#8A7200' };
    return { bg: '#FDF2EF', text: '#7A2F1B' };
  }

  return (
    <div className="px-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#4A4A3F', opacity: 0.45 }}>
        Last 5 sessions
      </p>
      {HISTORY.map((session) => {
        const sc = scoreStyle(session.score);
        return (
          <div
            key={session.id}
            className="bg-white rounded-2xl p-4 shadow-sm"
            style={{ border: '1px solid #E8F5EA' }}
          >
            <div className="flex items-start gap-3">
              {/* Session number bubble */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: '#3D7A4F' }}
              >
                #{session.id}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug" style={{ color: '#1F4D2E' }}>
                  {session.topic}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#EFF7F9', color: '#1A3D48' }}
                  >
                    {session.type}
                  </span>
                  <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.5 }}>{session.date}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="text-sm font-bold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: sc.bg, color: sc.text }}
                >
                  {session.score}%
                </span>
                <span className="text-xs font-semibold" style={{ color: '#8A7200' }}>
                  ⚡ +{session.xp} XP
                </span>
              </div>
            </div>

            {/* Mini skill sparkline */}
            <div className="mt-3 pt-3 flex items-center gap-1.5" style={{ borderTop: '1px solid #E8F5EA' }}>
              {SKILLS.map((skill) => {
                const barScore = Math.max(10, session.score - Math.floor(Math.random() * 20));
                return (
                  <div key={skill.label} className="flex-1">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${barScore}%`, backgroundColor: skill.color }}
                      />
                    </div>
                    <p className="text-center mt-0.5" style={{ fontSize: 8, color: '#4A4A3F', opacity: 0.45 }}>
                      {skill.label.slice(0, 3)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Badges tab ────────────────────────────────────────────────────────────────
function BadgesTab() {
  const earned = BADGES.filter((b) => b.earned);
  const locked = BADGES.filter((b) => !b.earned);

  return (
    <div className="px-4 space-y-5">
      {/* Earned */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A4A3F', opacity: 0.45 }}>
          Earned · {earned.length}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {earned.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center gap-1.5 text-center"
              style={{ border: '1px solid #B8DBBF' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: '#E8F5EA' }}
              >
                {badge.emoji}
              </div>
              <p className="text-xs font-bold leading-tight" style={{ color: '#1F4D2E' }}>{badge.label}</p>
              <p className="leading-tight" style={{ fontSize: 9, color: '#4A4A3F', opacity: 0.55 }}>
                {badge.desc}
              </p>
              <div
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#E8F5EA' }}
              >
                <span className="text-xs font-bold" style={{ color: '#3D7A4F', fontSize: 9 }}>✓ Earned</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A4A3F', opacity: 0.45 }}>
          Locked · {locked.length}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {locked.map((badge) => (
            <div
              key={badge.id}
              className="rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center"
              style={{ backgroundColor: '#F5F2EC', border: '1px dashed #B8DBBF' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: '#E8F5EA', opacity: 0.5, filter: 'grayscale(1)' }}
              >
                {badge.emoji}
              </div>
              <p className="text-xs font-bold leading-tight" style={{ color: '#4A4A3F', opacity: 0.5 }}>
                {badge.label}
              </p>
              <p className="leading-tight" style={{ fontSize: 9, color: '#4A4A3F', opacity: 0.4 }}>
                {badge.desc}
              </p>
              <div
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#E8F5EA' }}
              >
                <span style={{ fontSize: 9, color: '#4A4A3F', opacity: 0.5 }}>🔒 Locked</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────
function BottomNav({ active, onNavigate }) {
  const items = [
    {
      key: 'home', label: 'Home',
      icon: (fill) => (
        <svg className="w-5 h-5" fill={fill ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={fill ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      key: 'progress', label: 'Progress',
      icon: (fill) => (
        <svg className="w-5 h-5" fill={fill ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={fill ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      key: 'explore', label: 'Explore',
      icon: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
              onClick={() => onNavigate(key)}
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

// ── Main component ────────────────────────────────────────────────────────────
export default function ProgressScreen({ onNavigate }) {
  const [tab, setTab] = useState('Progress');

  return (
    <div className="flex flex-col min-h-full pb-4" style={{ backgroundColor: '#F5F2EC' }}>
      {/* Header */}
      <div
        className="px-5 pt-16 pb-4"
        style={{ backgroundColor: '#fff', borderBottom: '1px solid #E8F5EA' }}
      >
        <h1 className="text-lg font-bold" style={{ color: '#1F4D2E' }}>Your progress</h1>
      </div>

      <TabBar active={tab} onChange={setTab} />

      <div className="flex-1 overflow-y-auto pb-4">
        {tab === 'Progress' && <ProgressTab />}
        {tab === 'History'  && <HistoryTab />}
        {tab === 'Badges'   && <BadgesTab />}
      </div>

      <BottomNav active="progress" onNavigate={onNavigate} />
    </div>
  );
}
