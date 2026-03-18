import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const QUESTION = 'If you could have any superpower for a day, what would it be and why?';
const TOTAL_SECS = 120; // 2 min

const TRANSCRIPT_LINES = [
  'If I could have any superpower for',
  'a day, I would choose the ability',
  'to fly. Imagine soaring above the',
  'clouds, seeing the world from a|',
];

const FEEDBACK = [
  { label: 'Clarity',    score: 17, max: 20, badge: 'Excellent', badgeColor: '#3D7A4F', badgeBg: '#E8F5EA', barColor: '#3D7A4F' },
  { label: 'Pacing',     score: 20, max: 20, badge: 'Low',       badgeColor: '#E07A5F', badgeBg: '#FDF2EF', barColor: '#E07A5F' },
  { label: 'Fillers',    score: 10, max: 20, badge: 'Good',      badgeColor: '#8A7200', badgeBg: '#FEFAEE', barColor: '#81B5C4' },
  { label: 'Confidence', score: 17, max: 20, badge: 'Excellent', badgeColor: '#3D7A4F', badgeBg: '#E8F5EA', barColor: '#5A9E6A' },
];

// Hardcoded UUID for "Mia" → student s1
const MIA_STUDENT_UUID = 'aaaaaaaa-0000-0000-0000-000000000001';

const BAR_HEIGHTS = [12, 28, 40, 36, 22, 18, 32, 44, 38, 26, 20, 34, 42, 30, 16];

export default function RecordingScreen({ onStop, challengeTopic }) {
  const [elapsed, setElapsed] = useState(45);
  const [bars, setBars] = useState(BAR_HEIGHTS);
  const [saving, setSaving] = useState(false);
  const intervalRef = useRef(null);
  const waveRef = useRef(null);

  const topic = challengeTopic || QUESTION;

  useEffect(() => {
    // Timer
    intervalRef.current = setInterval(() => {
      setElapsed((s) => (s < TOTAL_SECS ? s + 1 : s));
    }, 1000);

    // Animate waveform
    waveRef.current = setInterval(() => {
      setBars((prev) =>
        prev.map((h) => {
          const delta = (Math.random() - 0.5) * 18;
          return Math.max(8, Math.min(48, h + delta));
        })
      );
    }, 150);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(waveRef.current);
    };
  }, []);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const progress = elapsed / TOTAL_SECS;

  const handleStop = async () => {
    setSaving(true);
    try {
      // Convert FEEDBACK scores (out of 20) to percentages (× 5)
      const clarity    = FEEDBACK.find((f) => f.label === 'Clarity')?.score    * 5; // 85
      const pacing     = FEEDBACK.find((f) => f.label === 'Pacing')?.score     * 5; // 100
      const fillers    = FEEDBACK.find((f) => f.label === 'Fillers')?.score    * 5; // 50
      const confidence = FEEDBACK.find((f) => f.label === 'Confidence')?.score * 5; // 85
      const vocabulary = 75;
      const overall    = Math.round((clarity + pacing + fillers + confidence + vocabulary) / 5);

      await supabase.from('sessions').insert({
        student_id:     MIA_STUDENT_UUID,
        session_number: 99,
        date:           new Date().toLocaleDateString(),
        overall,
        clarity,
        pacing,
        confidence,
        fillers,
        vocabulary,
      });
    } catch (err) {
      console.warn('Failed to save session:', err.message);
    } finally {
      setSaving(false);
      onStop();
    }
  };

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: '#fff' }}>
      {/* Top bar */}
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button
          onClick={handleStop}
          disabled={saving}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#F5F2EC' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#4A4A3F' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Timer + progress bar */}
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold" style={{ color: '#4A4A3F' }}>
              {fmt(elapsed)}
            </span>
            <span className="text-xs font-semibold" style={{ color: '#B8DBBF' }}>
              {fmt(TOTAL_SECS)}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress * 100}%`, backgroundColor: '#3D7A4F' }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-5 mb-5">
        <p className="text-center text-sm font-semibold leading-snug" style={{ color: '#1F4D2E' }}>
          {topic}
        </p>
      </div>

      {/* Waveform */}
      <div
        className="mx-5 rounded-2xl px-4 py-4 mb-4 flex items-end justify-center gap-1"
        style={{ backgroundColor: '#EFF7F9', height: 80 }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 4,
              height: h,
              backgroundColor: i % 3 === 0 ? '#3D7A4F' : i % 3 === 1 ? '#81B5C4' : '#5A9E6A',
              opacity: 0.8,
              transitionDuration: '120ms',
            }}
          />
        ))}
        {/* Playhead */}
        <div
          className="absolute w-0.5 rounded-full"
          style={{ height: 56, backgroundColor: '#E07A5F', marginLeft: -2 }}
        />
      </div>

      {/* Transcript */}
      <div className="mx-5 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#85C093' }}>
          Your transcript
        </p>
        <div
          className="rounded-2xl p-3"
          style={{ backgroundColor: '#F5F2EC' }}
        >
          {TRANSCRIPT_LINES.map((line, i) => (
            <span key={i} className="text-sm" style={{ color: i < TRANSCRIPT_LINES.length - 1 ? '#4A4A3F' : '#1F4D2E', fontWeight: i === TRANSCRIPT_LINES.length - 1 ? 600 : 400 }}>
              {line}{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Real-time feedback */}
      <div
        className="mx-5 mb-4 rounded-2xl p-4"
        style={{ backgroundColor: '#fff', border: '1px solid #E8F5EA', boxShadow: '0 2px 8px rgba(61,122,79,0.08)' }}
      >
        <p className="text-xs font-bold mb-3" style={{ color: '#1F4D2E' }}>Real time feedback</p>

        {/* Badge row */}
        <div className="flex gap-2 mb-3">
          {FEEDBACK.map((f) => (
            <span
              key={f.label}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: f.badgeBg, color: f.badgeColor }}
            >
              {f.badge}
            </span>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
          {FEEDBACK.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1 flex-1">
              <div className="relative flex items-end justify-center" style={{ height: 60, width: '100%' }}>
                {/* Score bubble */}
                <div
                  className="absolute top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10"
                  style={{ backgroundColor: f.barColor }}
                >
                  {f.score}
                </div>
                {/* Bar */}
                <div
                  className="w-full rounded-xl"
                  style={{
                    height: `${(f.score / f.max) * 52}px`,
                    backgroundColor: f.barColor,
                    opacity: 0.85,
                    minHeight: 12,
                    maxWidth: 36,
                  }}
                />
              </div>
              <span className="text-[9px] font-medium text-center" style={{ color: '#4A4A3F' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stop button */}
      <div className="flex flex-col items-center pb-8 mt-auto pt-2">
        <button
          onClick={handleStop}
          disabled={saving}
          className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg disabled:opacity-60"
          style={{
            backgroundColor: '#81B5C4',
            boxShadow: '0 0 0 6px rgba(129,181,196,0.2), 0 8px 20px rgba(129,181,196,0.4)',
          }}
        >
          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: '#fff' }} />
        </button>
        <p className="mt-2 text-xs font-semibold" style={{ color: '#81B5C4' }}>
          {saving ? 'Saving...' : 'Stop recording'}
        </p>
      </div>
    </div>
  );
}
