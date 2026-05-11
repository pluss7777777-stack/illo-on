import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Survey from './components/Survey';

export default function App() {
  const [view, setView] = useState('login');

  return (
    <div className="h-screen w-full bg-white flex flex-col font-['Noto_Sans_KR']">
      <Header setView={setView} />

      <main className="flex-grow overflow-y-auto bg-white">
        <div className="flex items-start justify-center min-h-full">
          {view === 'login' && <Login setView={setView} />}
          {view === 'signup' && <SignUp onComplete={() => setView('survey')} />}
          {view === 'sns-signup' && <SignUp isSns={true} onComplete={() => setView('survey')} />}
          {view === 'survey' && <Survey />}
        </div>
      </main>

      {view !== 'survey' && <Footer />}
    </div>
  );
}