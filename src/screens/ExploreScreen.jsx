import BottomNav from '../components/BottomNav';

const SPEECH_TYPES = [
  {
    section: 'Perfect for beginners',
    items: [
      {
        name: 'Informative speaking',
        desc: 'Teach others about fascinating topics',
        xp: '15–25',
        level: 'Beginner',
        levelColor: '#3D7A4F',
        levelBg: '#E8F5EA',
        emoji: '💡',
        iconBg: '#81B5C4',
      },
      {
        name: 'Declamation',
        desc: 'Perform famous speeches from history',
        xp: '15–25',
        level: 'Beginner',
        levelColor: '#3D7A4F',
        levelBg: '#E8F5EA',
        emoji: '📜',
        iconBg: '#5A9E6A',
      },
    ],
  },
  {
    section: 'Level up your skills',
    items: [
      {
        name: 'Original oratory',
        desc: 'Write and deliver your own persuasive speech',
        xp: '20–30',
        level: 'Intermediate',
        levelColor: '#8A7200',
        levelBg: '#FEFAEE',
        emoji: '✍️',
        iconBg: '#3D7A4F',
      },
      {
        name: 'Dramatic interpretation',
        desc: 'Bring dramatic stories to life',
        xp: '20–30',
        level: 'Intermediate',
        levelColor: '#8A7200',
        levelBg: '#FEFAEE',
        emoji: '🎭',
        iconBg: '#E07A5F',
      },
      {
        name: 'Humorous interpretation',
        desc: "Make 'em laugh with comedic performances",
        xp: '20–30',
        level: 'Intermediate',
        levelColor: '#8A7200',
        levelBg: '#FEFAEE',
        emoji: '😄',
        iconBg: '#E8C547',
      },
      {
        name: 'Prose & poetry',
        desc: 'Share beautiful writing through performance',
        xp: '20–30',
        level: 'Intermediate',
        levelColor: '#8A7200',
        levelBg: '#FEFAEE',
        emoji: '📖',
        iconBg: '#81B5C4',
      },
    ],
  },
  {
    section: 'For advanced speakers',
    items: [
      {
        name: 'Congressional debate',
        desc: 'Argue legislation in a simulated congress',
        xp: '30–50',
        level: 'Advanced',
        levelColor: '#7A2F1B',
        levelBg: '#FDF2EF',
        emoji: '🏛️',
        iconBg: '#1F4D2E',
      },
      {
        name: 'Lincoln-Douglas debate',
        desc: 'One-on-one value-based debate format',
        xp: '30–50',
        level: 'Advanced',
        levelColor: '#7A2F1B',
        levelBg: '#FDF2EF',
        emoji: '⚖️',
        iconBg: '#2C6140',
      },
    ],
  },
];

export default function ExploreScreen({ onBack, onNavigate }) {
  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: '#F5F2EC' }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-4"
        style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #3D7A4F 100%)' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">Find your voice</h1>
        </div>
        <p className="text-sm ml-11" style={{ color: '#85C093' }}>Choose a speech type to practice</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-6">
        {SPEECH_TYPES.map(({ section, items }) => (
          <div key={section}>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#85C093' }}>
              {section}
            </h2>
            <div className="space-y-2.5">
              {items.map((item) => (
                <button
                  key={item.name}
                  className="w-full bg-white rounded-2xl p-3.5 flex items-center gap-3 text-left active:scale-[0.98] transition-transform shadow-sm"
                  style={{ border: '1px solid #E8F5EA' }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    {item.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-tight mb-0.5" style={{ color: '#1F4D2E' }}>
                      {item.name}
                    </p>
                    <p className="text-xs leading-snug mb-2" style={{ color: '#4A4A3F', opacity: 0.7 }}>
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold" style={{ color: '#8A7200' }}>
                        ⚡ {item.xp} XP
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: item.levelBg, color: item.levelColor }}
                      >
                        {item.level}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#E8F5EA' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#3D7A4F' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="explore" onNavigate={onNavigate} />
    </div>
  );
}
