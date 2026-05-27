import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Survey from './components/Survey';
import Resume from './components/Resume';
import ResumeResult from './components/ResumeResult';
import OAuthCallback from './components/OAuthCallback';
import Home from './components/Home';

export default function App() {
  const [view, setView] = useState('login');

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname === '/oauth2/redirect' || pathname.startsWith('/oauth2/redirect')) {
      setView('oauth-callback');
      return;
    }

    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');

    // 토큰 없으면 무조건 로그인
    if (!token || !user_id) {
      setView('login');
      return;
    }

    // 토큰 있으면 무조건 홈
    setView('home');
  }, []);

  return (
    <div className="h-screen w-full bg-white flex flex-col font-['Noto_Sans_KR']">
      {view !== 'home' && <Header setView={setView} />}

      <main className="flex-grow overflow-y-auto bg-white">
        <div className="flex items-start justify-center min-h-full">
          {view === 'login' && <Login setView={setView} />}
          {view === 'signup' && <SignUp onComplete={() => setView('survey')} />}
          {view === 'survey' && <Survey setView={setView} />}
          {view === 'resume' && <Resume setView={setView} />}
          {view === 'resume-result' && <ResumeResult setView={setView} />}
          {view === 'oauth-callback' && <OAuthCallback setView={setView} />}
          {view === 'home' && <Home setView={setView} />}
        </div>
      </main>

      {view !== 'survey' && view !== 'resume' && view !== 'resume-result' && view !== 'oauth-callback' && view !== 'home' && <Footer />}
    </div>
  );
}