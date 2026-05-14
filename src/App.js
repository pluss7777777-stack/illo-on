import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Survey from './components/Survey';
import Resume from './components/Resume';
import ResumeResult from './components/ResumeResult';
import OAuthCallback from './components/OAuthCallback';

export default function App() {
  const [view, setView] = useState('login');

  useEffect(() => {
    // /oauth2/redirect 경로로 들어오면 OAuthCallback으로 전환
    if (window.location.pathname === '/oauth2/redirect') {
      setView('oauth-callback');
    }
  }, []);

  return (
    <div className="h-screen w-full bg-white flex flex-col font-['Noto_Sans_KR']">
      <Header setView={setView} />

      <main className="flex-grow overflow-y-auto bg-white">
        <div className="flex items-start justify-center min-h-full">
          {view === 'login' && <Login setView={setView} />}
          {view === 'signup' && <SignUp onComplete={() => setView('survey')} />}
          {view === 'survey' && <Survey setView={setView} />}
          {view === 'resume' && <Resume setView={setView} />}
          {view === 'resume-result' && <ResumeResult setView={setView} />}
          {view === 'oauth-callback' && <OAuthCallback setView={setView} />}
        </div>
      </main>

      {view !== 'survey' && view !== 'resume' && view !== 'resume-result' && view !== 'oauth-callback' && <Footer />}
    </div>
  );
}