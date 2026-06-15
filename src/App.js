import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Survey from './components/Survey';
import Resume from './components/Resume';
import ResumeResult from './components/ResumeResult';
import ResumeManage from './components/ResumeManage';
import OAuthCallback from './components/OAuthCallback';
import Home from './components/Home';
import JobDetail from './components/JobDetail';
import BookmarkPage from './components/BookmarkPage';

export default function App() {
  const [view, setView] = useState('login');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname === '/oauth2/redirect' || pathname.startsWith('/oauth2/redirect')) {
      setView('oauth-callback');
      return;
    }

    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');

    if (!token || !user_id) {
      setView('login');
      return;
    }

    setView('home');
  }, []);

  const goToJobDetail = (jobId) => {
    setSelectedJobId(jobId);
    setView('job-detail');
  };

  const toggleBookmark = async (id) => {
    // 더미 카드는 스크랩 불가
    if (String(id).startsWith('rec-') || String(id).startsWith('illione-') || String(id).startsWith('featured-') || String(id).startsWith('region-') || String(id).startsWith('all-')) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await fetch(`https://illoon.cloud/api/jobs/${id}/scrap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('스크랩 요청 실패');
      setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
    } catch (err) {
      console.error(err);
      alert('스크랩 처리 중 오류가 발생했어요.');
    }
  };

  const noHeaderViews = ['home', 'job-detail', 'bookmark', 'resume-manage'];
  const noFooterViews = ['survey', 'resume', 'resume-result', 'oauth-callback', 'home', 'job-detail', 'bookmark', 'resume-manage'];

  return (
    <div className="h-screen w-full bg-white flex flex-col font-['Noto_Sans_KR']">
      {!noHeaderViews.includes(view) && <Header setView={setView} />}

      <main className="flex-grow overflow-y-auto bg-white">
        <div className="flex items-start justify-center min-h-full">
          {view === 'login' && <Login setView={setView} />}
          {view === 'signup' && <SignUp onComplete={() => setView('survey')} />}
          {view === 'survey' && <Survey setView={setView} />}
          {view === 'resume' && <Resume setView={setView} />}
          {view === 'resume-result' && <ResumeResult setView={setView} />}
          {view === 'resume-manage' && <ResumeManage setView={setView} />}
          {view === 'oauth-callback' && <OAuthCallback setView={setView} />}
          {view === 'home' && (
            <Home
              setView={setView}
              goToJobDetail={goToJobDetail}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              allJobs={allJobs}
              setAllJobs={setAllJobs}
            />
          )}
          {view === 'job-detail' && <JobDetail setView={setView} jobId={selectedJobId} />}
          {view === 'bookmark' && (
            <BookmarkPage
              setView={setView}
              goToJobDetail={goToJobDetail}
            />
          )}
        </div>
      </main>

      {!noFooterViews.includes(view) && <Footer />}
    </div>
  );
}