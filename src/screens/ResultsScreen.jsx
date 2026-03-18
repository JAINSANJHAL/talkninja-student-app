import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RESULT = {
  score: 82,
  prevScore: 67,
  xp: 40,
  assignedBy: 'Ms. Patel',
  fillerWords: 6,
  analysis: 'You delivered a confident argument with strong evidence. Your enthusiasm came through clearly. Focus on reducing filler words and maintaining a steadier pace during complex points.',
  tips: [
    'Try pausing instead of using filler words like "um" and "uh".',
    'Your opening hook was strong — keep that energy throughout.',
    'Speak slightly slower during key arguments for more impact.',
  ],
};

const SKILLS = [
  { label: 'Clarity',    stars: 4, color: '#3D7A4F', score: 84 },
  { label: 'Confidence', stars: 4, color: '#5A9E6A', score: 80 },
  { label: 'Pacing',     stars: 2, color: '#81B5C4', score: 55 },
  { label: 'Vocabulary', stars: 4, color: '#2C6140', score: 78 },
  { label: 'Fillers',    stars: 3, color: '#E07A5F', score: 66 },
];

const PACING_DATA = [
  { t: '10', wpm: 125 }, { t: '20', wpm: 118 }, { t: '30', wpm: 135 },
  { t: '40', wpm: 110 }, { t: '50', wpm: 108 }, { t: '60', wpm: 142 },
  { t: '70', wpm: 155 }, { t: '80', wpm: 148 }, { t: '90', wpm: 160 }, { t: '100', wpm: 162 },
];

const FILLER_TRANSCRIPT = [
  { time: '0:00', text: ['If we consider the implications, ', { filler: 'um' }, ', regulation becomes ', { filler: 'you know' }, ', essential for safety.'] },
  { time: '0:15', text: ['The data shows that ', { filler: 'uh' }, ', without oversight, AI poses significant risks to society.'] },
  { time: '0:25', text: ['Congress must act now, ', { filler: 'like' }, ', before these technologies become uncontrollable.'] },
];

function Stars({ count, max = 5, color }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={i < count ? color : '#E8F5EA'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function OverallTab({ onBack }) {
  return (
    <div>
      {/* Hero */}
      <div
        className="px-5 pt-16 pb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #3D7A4F 70%, #5A9E6A 100%)' }}
      >
        {/* Assigned badge */}
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 w-fit"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span className="text-white text-xs font-semibold">Assigned by Coach · {RESULT.assignedBy}</span>
        </div>

        <div className="flex items-center gap-5 mb-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          >
            <span className="text-2xl font-bold" style={{ color: '#1F4D2E' }}>{RESULT.score}%</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-snug">
              Great job! You improved your score from {RESULT.prevScore}%!
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xl">⚡</span>
              <span className="text-sm font-bold" style={{ color: '#E8C547' }}>+{RESULT.xp} XP earned</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3 pb-4" style={{ backgroundColor: '#F5F2EC' }}>
        {/* Skill breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
          <h3 className="font-semibold text-sm mb-3" style={{ color: '#1F4D2E' }}>Skill Breakdown</h3>
          <div className="space-y-3">
            {SKILLS.map((skill) => (
              <div key={skill.label} className="flex items-center gap-3">
                <span className="text-xs font-medium w-20 shrink-0" style={{ color: '#4A4A3F' }}>{skill.label}</span>
                <Stars count={skill.stars} color={skill.color} />
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                  <div className="h-full rounded-full" style={{ width: `${skill.score}%`, backgroundColor: skill.color }} />
                </div>
                <span className="text-xs font-bold w-6 text-right" style={{ color: skill.color }}>{skill.score}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #E8F5EA' }}>
            <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.6 }}>Filler words used:</span>
            <span className="text-sm font-bold" style={{ color: '#E07A5F' }}>{RESULT.fillerWords} words</span>
          </div>
        </div>

        {/* Analysis — teal card */}
        <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: '#EFF7F9', border: '1px solid #81B5C4' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#81B5C4' }}>
              <span className="text-sm">🔍</span>
            </div>
            <h3 className="font-semibold text-sm" style={{ color: '#1A3D48' }}>Analysis</h3>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#1A3D48' }}>{RESULT.analysis}</p>
        </div>

        {/* Ninja tips */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🥷</span>
            <h3 className="font-semibold text-sm" style={{ color: '#1F4D2E' }}>Ninja Tips</h3>
          </div>
          <div className="space-y-2">
            {RESULT.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5" style={{ color: '#E8C547' }}>💡</span>
                <p className="text-xs leading-relaxed" style={{ color: '#4A4A3F' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all"
            style={{ border: '2px solid #B8DBBF', color: '#2C6140', backgroundColor: '#fff' }}
          >
            Try Again
          </button>
          <button
            className="flex-1 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all"
            style={{
              backgroundColor: '#3D7A4F',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(61,122,79,0.3)',
            }}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalysisTab({ onBack }) {
  return (
    <div>
      {/* Hero */}
      <div
        className="px-5 pt-16 pb-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #3D7A4F 70%, #5A9E6A 100%)' }}
      >
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 w-fit"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <span className="text-white text-xs font-semibold">Assigned by Coach · {RESULT.assignedBy}</span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          >
            <span className="text-xl font-bold" style={{ color: '#1F4D2E' }}>{RESULT.score}%</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-snug">
              Improved from {RESULT.prevScore}% to {RESULT.score}%!
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span>⚡</span>
              <span className="text-xs font-bold" style={{ color: '#E8C547' }}>+{RESULT.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Pacing chart inside green card */}
        <div className="bg-white rounded-2xl p-3 mt-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold" style={{ color: '#1F4D2E' }}>Pacing over time</span>
            <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.45 }}>4/5 ideal</span>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <LineChart data={PACING_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
              <XAxis dataKey="t" tick={{ fontSize: 9, fill: '#B8DBBF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#B8DBBF' }} axisLine={false} tickLine={false} domain={[80, 180]} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 10, border: '1px solid #E8F5EA' }} />
              <Line type="monotone" dataKey="wpm" stroke="#3D7A4F" strokeWidth={2}
                dot={{ fill: '#E8C547', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-center mt-1" style={{ color: '#4A4A3F', opacity: 0.55 }}>
            115 words/min (ideal: 120–160)
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3 pb-4" style={{ backgroundColor: '#F5F2EC' }}>
        {/* Filler word transcript — terracotta accents */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: '#4A4A3F' }}>
              You used total{' '}
              <span className="font-bold text-base" style={{ color: '#E07A5F' }}>{RESULT.fillerWords}</span>
              {' '}filler words
            </p>
          </div>
          <div className="space-y-3">
            {FILLER_TRANSCRIPT.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs font-mono shrink-0 pt-0.5" style={{ color: '#B8DBBF' }}>{item.time}</span>
                <p className="text-xs leading-relaxed" style={{ color: '#4A4A3F' }}>
                  {item.text.map((chunk, j) =>
                    typeof chunk === 'string' ? (
                      <span key={j}>{chunk}</span>
                    ) : (
                      <mark
                        key={j}
                        className="px-0.5 rounded font-semibold"
                        style={{ backgroundColor: '#FDF2EF', color: '#7A2F1B' }}
                      >
                        {chunk.filler}
                      </mark>
                    )
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Teal analysis card */}
        <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: '#EFF7F9', border: '1px solid #81B5C4' }}>
          <div className="flex items-center gap-2 mb-2">
            <span>🥷</span>
            <h3 className="font-semibold text-sm" style={{ color: '#1A3D48' }}>Ninja Tips</h3>
          </div>
          {RESULT.tips.slice(0, 2).map((tip, i) => (
            <div key={i} className="flex items-start gap-2 mt-2">
              <span className="shrink-0" style={{ color: '#E8C547' }}>💡</span>
              <p className="text-xs leading-relaxed" style={{ color: '#1A3D48' }}>{tip}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all"
            style={{ border: '2px solid #B8DBBF', color: '#2C6140', backgroundColor: '#fff' }}
          >
            Try Again
          </button>
          <button
            className="flex-1 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all"
            style={{
              backgroundColor: '#3D7A4F',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(61,122,79,0.3)',
            }}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsScreen({ onBack }) {
  const [tab, setTab] = useState('overall');

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: '#F5F2EC' }}>
      {/* Tab bar */}
      <div
        className="absolute top-14 left-4 right-4 z-40 flex p-1 rounded-2xl shadow-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid #E8F5EA' }}
      >
        {['overall', 'analysis'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all"
            style={
              tab === t
                ? { backgroundColor: '#fff', color: '#1F4D2E', boxShadow: '0 1px 4px rgba(61,122,79,0.15)' }
                : { color: '#85C093' }
            }
          >
            {t}
          </button>
        ))}
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ml-1"
          style={{ backgroundColor: '#E8F5EA' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#3D7A4F' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {tab === 'overall' ? <OverallTab onBack={onBack} /> : <AnalysisTab onBack={onBack} />}
    </div>
  );
}
