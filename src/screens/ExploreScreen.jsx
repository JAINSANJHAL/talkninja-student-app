import { useState } from 'react';
import BottomNav from '../components/BottomNav';

// ── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = {
  Debate: {
    Beginner: [
      { name: 'Congressional',  desc: 'Simulate legislative debate & public speaking', xp: '25-35', emoji: '🏛️', iconBg: '#3D7A4F' },
      { name: 'SPAR',           desc: 'Short, impromptu argumentative debate',         xp: '25-35', emoji: '⚡', iconBg: '#5A9E6A' },
      { name: 'Public forum',   desc: 'Team-based debate on current issues',           xp: '25-35', emoji: '🤝', iconBg: '#85C093' },
    ],
    Intermediate: [
      { name: 'Lincoln Douglas', desc: 'Philosophical one-on-one value debates',       xp: '25-35', emoji: '🎓', iconBg: '#2C6140' },
    ],
    Expert: [
      { name: 'Policy debate',  desc: 'In-depth research & debate on policies',        xp: '30-50', emoji: '📋', iconBg: '#1F4D2E' },
    ],
  },
  'Public Address': {
    Beginner: [
      { name: 'Declamation',        desc: 'Perform famous speeches from history',          xp: '15-25', emoji: '📜', iconBg: '#81B5C4' },
      { name: 'Storytelling',       desc: 'Engaging narrative to convey ideas',            xp: '15-25', emoji: '📖', iconBg: '#81B5C4' },
    ],
    Intermediate: [
      { name: 'Original oratory',   desc: 'Write and deliver your own persuasive speech',  xp: '20-30', emoji: '✍️', iconBg: '#3D7A4F' },
      { name: 'Informative speaking', desc: 'Teach others about fascinating topics',        xp: '15-25', emoji: '💡', iconBg: '#5A9E6A' },
      { name: 'Expository',         desc: 'Explaining a topic with evidence',               xp: '15-25', emoji: '🔍', iconBg: '#2C6140' },
    ],
    Expert: [
      { name: 'Persuasive',         desc: 'Craft compelling arguments to change minds',    xp: '25-40', emoji: '🗣️', iconBg: '#1F4D2E' },
    ],
  },
  Interpretation: {
    Beginner: [
      { name: 'Storytelling',           desc: 'Engaging narrative to convey ideas',                    xp: '15-25', emoji: '📖', iconBg: '#81B5C4' },
      { name: 'Prose & poetry',         desc: 'Share beautiful literature through words',              xp: '20-30', emoji: '🪶', iconBg: '#81B5C4' },
    ],
    Intermediate: [
      { name: 'Dramatic interpretation', desc: 'Bring dramatic stories to life',                       xp: '20-30', emoji: '🎭', iconBg: '#E07A5F' },
      { name: 'Humorous interpretation', desc: "Make 'em laugh with comedic performances",             xp: '20-30', emoji: '😄', iconBg: '#E8C547' },
      { name: 'Duo interpretation',      desc: 'Team up for a dynamic 2 person performance',           xp: '25-35', emoji: '👥', iconBg: '#5A9E6A' },
    ],
    Expert: [
      { name: 'Program oral interp',    desc: 'Multi-piece literary performance',                      xp: '30-50', emoji: '🌟', iconBg: '#3D7A4F' },
    ],
  },
};

const INITIAL_CUSTOM = [
  { id: 1, name: 'This House Would Ban Social Media for Under 16s', time: '1.5 min', xp: 30, diff: 20, iconBg: '#3D7A4F', emoji: '🏛️' },
];

const TABS = ['Debate', 'Public Address', 'Interpretation', 'Custom'];

const TIME_OPTIONS = ['1 min', '1.5 min', '2 min', '3 min', '5 min'];
const CATEGORY_OPTIONS = ['Debate', 'Public Address', 'Interpretation'];

// ── Sub-components ────────────────────────────────────────────────────────────

function SpeechCard({ item }) {
  return (
    <div
      className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-sm"
      style={{ border: '1px solid #E8F5EA' }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm leading-tight mb-0.5" style={{ color: '#1F4D2E' }}>{item.name}</p>
        <p className="text-xs leading-snug mb-1.5" style={{ color: '#4A4A3F', opacity: 0.65 }}>{item.desc}</p>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold" style={{ color: '#8A7200' }}>⚡ {item.xp} XP</span>
        </div>
        <button className="mt-1 flex gap-0.5">
          {[0,1,2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: '#B8DBBF' }} />
          ))}
        </button>
      </div>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
        style={{ backgroundColor: item.iconBg }}
      >
        {item.emoji}
      </div>
    </div>
  );
}

function CategoryView({ cat }) {
  const sections = CATEGORIES[cat];
  return (
    <div className="space-y-5">
      {Object.entries(sections).map(([level, items]) => (
        <div key={level}>
          <h3 className="text-sm font-bold mb-2.5" style={{ color: '#1F4D2E' }}>{level}</h3>
          <div className="space-y-2.5">
            {items.map((item) => <SpeechCard key={item.name} item={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomView() {
  const [topics, setTopics] = useState(INITIAL_CUSTOM);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: '', topic: '', desc: '', time: '' });

  function submit() {
    if (!form.topic.trim()) return;
    setTopics((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.topic,
        time: form.time || '2 min',
        xp: 30,
        diff: 20,
        iconBg: '#3D7A4F',
        emoji: '🎤',
      },
    ]);
    setForm({ category: '', topic: '', desc: '', time: '' });
    setShowModal(false);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold" style={{ color: '#1F4D2E' }}>Your topics</h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl text-white active:scale-95 transition-transform"
          style={{ backgroundColor: '#3D7A4F' }}
        >
          + Add a topic
        </button>
      </div>

      {topics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-sm font-semibold" style={{ color: '#4A4A3F' }}>No topics yet</p>
          <p className="text-xs mt-1" style={{ color: '#85C093' }}>Tap "Add a topic" to create your first custom challenge</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {topics.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-sm" style={{ border: '1px solid #E8F5EA' }}>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-snug mb-1" style={{ color: '#1F4D2E' }}>{t.name}</p>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#4A4A3F', opacity: 0.65 }}>
                  <span>⏱ {t.time}</span>
                  <span>⚡ +{t.xp} XP</span>
                  <span>🏅 {t.diff}</span>
                </div>
                <div className="flex gap-0.5 mt-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: '#B8DBBF' }} />
                  ))}
                </div>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: t.iconBg }}
              >
                {t.emoji}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add topic modal */}
      {showModal && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8" style={{ maxHeight: '85%', overflowY: 'auto' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold" style={{ color: '#1F4D2E' }}>Add a topic</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F5F2EC' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#4A4A3F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#1F4D2E' }}>
                  Select the category for your topic *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #B8DBBF', color: form.category ? '#1F4D2E' : '#85C093', backgroundColor: '#fff' }}
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#1F4D2E' }}>Add topic *</label>
                <textarea
                  rows={3}
                  placeholder="Enter topic"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: '1.5px solid #B8DBBF', color: '#1F4D2E' }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#1F4D2E' }}>Add description</label>
                <textarea
                  rows={3}
                  placeholder="Enter topic"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: '1.5px solid #B8DBBF', color: '#1F4D2E' }}
                />
              </div>

              {/* Time limit */}
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#1F4D2E' }}>Set time limit *</label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #B8DBBF', color: form.time ? '#1F4D2E' : '#85C093', backgroundColor: '#fff' }}
                >
                  <option value="" disabled>Set time</option>
                  {TIME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <button
                onClick={submit}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white active:scale-[0.98] transition-transform"
                style={{ backgroundColor: '#3D7A4F', boxShadow: '0 4px 12px rgba(61,122,79,0.3)' }}
              >
                Submit topic
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function ExploreScreen({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Debate');

  return (
    <div className="flex flex-col min-h-full relative" style={{ backgroundColor: '#F5F2EC' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-3" style={{ backgroundColor: '#fff' }}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#F5F2EC' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#4A4A3F' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold" style={{ color: '#1F4D2E' }}>Find your voice</h1>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0"
              style={
                activeTab === tab
                  ? { backgroundColor: '#3D7A4F', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#4A4A3F', border: '1.5px solid #E8F5EA' }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        {activeTab === 'Custom'
          ? <CustomView />
          : <CategoryView cat={activeTab} />
        }
      </div>

      <BottomNav active="explore" onNavigate={onNavigate} />
    </div>
  );
}
