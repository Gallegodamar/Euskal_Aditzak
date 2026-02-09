
import React, { useState } from 'react';
import Layout from './components/Layout';
import StudyMode from './components/StudyMode';
import GameMode from './components/GameMode';
import ConjugatorMode from './components/ConjugatorMode';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'study' | 'play' | 'conjugate'>('play');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="py-4">
        {activeTab === 'study' ? (
          <StudyMode />
        ) : activeTab === 'conjugate' ? (
          <ConjugatorMode />
        ) : (
          <GameMode />
        )}
      </div>
    </Layout>
  );
};

export default App;
