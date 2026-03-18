import { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import ProgressScreen from './screens/ProgressScreen';
import RecordingScreen from './screens/RecordingScreen';
import ExploreScreen from './screens/ExploreScreen';

const SCREENS = [
  { key: 'home',      label: '🏠 Home'      },
  { key: 'progress',  label: '📊 Progress'  },
  { key: 'explore',   label: '🔍 Explore'   },
  { key: 'recording', label: '🎙 Recording' },
  { key: 'results',   label: '🏆 Results'   },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [challengeTopic, setChallengeTopic] = useState(null);

  function startRecording(topic) {
    setChallengeTopic(topic || null);
    setScreen('recording');
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 gap-6"
      style={{ background: 'linear-gradient(135deg, #E8F5EA 0%, #F5F2EC 50%, #EFF7F9 100%)' }}
    >
      {/* Screen switcher */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-1.5 shadow-sm justify-center" style={{ border: '1px solid #E8F5EA' }}>
        {SCREENS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={
              screen === key
                ? { backgroundColor: '#3D7A4F', color: '#fff', boxShadow: '0 4px 12px rgba(61,122,79,0.25)' }
                : { color: '#4A4A3F' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phone */}
      <PhoneFrame>
        {screen === 'home' && (
          <HomeScreen
            onStart={() => startRecording()}
            onStartDaily={() => startRecording()}
            onNavigate={setScreen}
          />
        )}
        {screen === 'progress' && <ProgressScreen onNavigate={setScreen} />}
        {screen === 'explore'  && <ExploreScreen onBack={() => setScreen('home')} onNavigate={setScreen} />}
        {screen === 'recording' && (
          <RecordingScreen
            challengeTopic={challengeTopic}
            onStop={() => setScreen('results')}
          />
        )}
        {screen === 'results'  && <ResultsScreen onBack={() => setScreen('home')} />}
      </PhoneFrame>

      <p className="text-xs font-medium tracking-wide uppercase" style={{ color: '#85C093' }}>
        TalkNinja School Edition · Student Preview
      </p>
    </div>
  );
}
