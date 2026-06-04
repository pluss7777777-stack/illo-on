import React, { useState, useRef, useEffect } from 'react';

const Home = ({ setView }) => {
  const [selectedRegion, setSelectedRegion] = useState('천안시');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [regionJobs, setRegionJobs] = useState([]);
  const [regionJobsLoading, setRegionJobsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetailLoading, setJobDetailLoading] = useState(false);
  const [jobDetailError, setJobDetailError] = useState('');
  const scrollRef = useRef(null);

  const regions = ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'];

  const recommendJobs = [
    { id: 'rec-0', title: '[위시스트] 너 김인직이지 (Product Designer / UIUX)', meta: '충북 청주시 신입 - 경력 5년' },
    { id: 'rec-1', title: '[어쩔] 몰라 디자인 어시스턴트', meta: '충북 청주시 신입 - 경력 5년' },
    { id: 'rec-2', title: '[위시스트] 너 감긴적이지 (Product Designer)', meta: '충북 청주시 신입 - 경력 5년' },
    { id: 'rec-3', title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '충북 청주시 신입 - 경력 5년' },
  ];

  // 전체 공고 API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch('https://illoon.cloud/api/jobs/keywords', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('공고 불러오기 실패');
        const data = await res.json();
        setAllJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 지역별 공고 API - 지역 버튼 클릭할 때마다 호출
  useEffect(() => {
    const fetchRegionJobs = async () => {
      setRegionJobsLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`https://illoon.cloud/api/jobs?location=${encodeURIComponent(selectedRegion)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('지역별 공고 불러오기 실패');
        const data = await res.json();
        setRegionJobs(data.jobs || []);
      } catch (err) {
        console.error(err);
        setRegionJobs([]);
      } finally {
        setRegionJobsLoading(false);
      }
    };
    fetchRegionJobs();
  }, [selectedRegion]);

  // 공고 상세 API
  const handleJobClick = async (jobId) => {
    if (String(jobId).startsWith('rec-') || String(jobId).startsWith('region-') || String(jobId).startsWith('all-') || String(jobId).startsWith('illione-') || String(jobId).startsWith('featured-')) return;
    setJobDetailLoading(true);
    setJobDetailError('');
    setSelectedJob(null);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://illoon.cloud/api/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 404) {
        setJobDetailError('존재하지 않는 공고입니다.');
        return;
      }
      if (!res.ok) throw new Error('공고 상세 불러오기 실패');
      const data = await res.json();
      setSelectedJob(data);
    } catch (err) {
      console.error(err);
      setJobDetailError('공고를 불러오는데 실패했어요.');
    } finally {
      setJobDetailLoading(false);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
  };
  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await fetch('https://illoon.cloud/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.clear();
      setView('login');
    }
  };

  const WantedLogo = ({ white }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: white ? 'rgba(255,255,255,0.25)' : '#E8F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={white ? '#fff' : '#2196F3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span style={{ fontSize: 13, color: white ? '#fff' : '#2196F3', fontWeight: 700 }}>wanted</span>
    </div>
  );

  const BookmarkIcon = ({ filled, white }) => (
    <svg width="16" height="16" viewBox="0 0 24 24"
      fill={filled ? (white ? '#fff' : '#2196F3') : 'none'}
      stroke={filled ? (white ? '#fff' : '#2196F3') : (white ? 'rgba(255,255,255,0.7)' : '#ADB5BD')}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );

  // 공고 상세 모달
  const JobDetailModal = () => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 600, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F2F4F7' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#191F28' }}>공고 상세</span>
          <button onClick={() => { setSelectedJob(null); setJobDetailError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7684" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: 20, flex: 1 }}>
          {jobDetailLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#ADB5BD' }}>불러오는 중...</div>
          ) : jobDetailError ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#FF6B6B' }}>{jobDetailError}</div>
          ) : selectedJob ? (
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#191F28', marginBottom: 8 }}>{selectedJob.title}</div>
              <div style={{ fontSize: 14, color: '#2196F3', fontWeight: 600, marginBottom: 4 }}>{selectedJob.company}</div>
              <div style={{ fontSize: 13, color: '#6B7684', marginBottom: 16 }}>{selectedJob.location}</div>
              {selectedJob.keywords && selectedJob.keywords.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {selectedJob.keywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: 12, color: '#2196F3', background: '#EEF6FF', borderRadius: 6, padding: '4px 10px' }}>{kw}</span>
                  ))}
                </div>
              )}
              {selectedJob.description && (
                <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{selectedJob.description}</p>
              )}
            </div>
          ) : null}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #F2F4F7' }}>
          <button onClick={() => { setSelectedJob(null); setJobDetailError(''); }}
            style={{ width: '100%', height: 44, background: '#2196F3', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  const FeaturedJobCard = ({ id, title, meta }) => {
    const isHovered = hoveredCard === id;
    return (
      <div
        onMouseEnter={() => setHoveredCard(id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => handleJobClick(id)}
        style={{
          background: isHovered ? 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)' : '#F0F7FF',
          borderRadius: 14, padding: '20px', cursor: 'pointer',
          border: isHovered ? '1px solid #2196F3' : '1px solid #E3F0FF',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260,
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.2s ease',
          boxShadow: isHovered ? '0 8px 24px rgba(33,150,243,0.3)' : 'none',
        }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <WantedLogo white={isHovered} />
            <div onClick={(e) => { e.stopPropagation(); toggleBookmark(id); }} style={{ cursor: 'pointer' }}>
              <BookmarkIcon filled={!!bookmarks[id]} white={isHovered} />
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: isHovered ? '#fff' : '#191F28', lineHeight: 1.5, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 12, color: isHovered ? 'rgba(255,255,255,0.8)' : '#6B7684' }}>{meta}</div>
        </div>
        <button style={{
          background: isHovered ? '#fff' : '#2196F3', color: isHovered ? '#2196F3' : '#fff',
          border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, transition: 'all 0.2s ease',
        }}>
          지원하러 가기 <span>›</span>
        </button>
      </div>
    );
  };

  const SmallJobCard = ({ id, title, meta }) => {
    const isHovered = hoveredCard === id;
    return (
      <div
        onMouseEnter={() => setHoveredCard(id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => handleJobClick(id)}
        style={{
          background: isHovered ? 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)' : '#fff',
          border: isHovered ? '1px solid #2196F3' : '1px solid #F2F4F7',
          borderRadius: 12, padding: '16px', cursor: 'pointer',
          boxShadow: isHovered ? '0 6px 20px rgba(33,150,243,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.2s ease',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <WantedLogo white={isHovered} />
          <div onClick={(e) => { e.stopPropagation(); toggleBookmark(id); }} style={{ cursor: 'pointer' }}>
            <BookmarkIcon filled={!!bookmarks[id]} white={isHovered} />
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: isHovered ? '#fff' : '#191F28', lineHeight: 1.5, marginBottom: 6, transition: 'color 0.2s' }}>{title}</div>
        <div style={{ fontSize: 11, color: isHovered ? 'rgba(255,255,255,0.75)' : '#ADB5BD', transition: 'color 0.2s' }}>{meta}</div>
      </div>
    );
  };

  const RecommendCard = ({ id, title, meta }) => (
    <div onClick={() => handleJobClick(id)} style={{ minWidth: 260, maxWidth: 260, background: '#fff', borderRadius: 14, flexShrink: 0, boxShadow: '0 2px 10px rgba(33,150,243,0.1)', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
      <div onClick={(e) => { e.stopPropagation(); toggleBookmark(id); }} style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, cursor: 'pointer' }}>
        <BookmarkIcon filled={!!bookmarks[id]} />
      </div>
      <div style={{ height: 160, background: 'linear-gradient(135deg, #5BC8F5 0%, #2196F3 50%, #1565C0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -25, right: -15, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <path d="M6 20C6 12.27 12.27 6 20 6C27.73 6 34 12.27 34 20" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M20 34C16.13 34 13 30.87 13 27C13 23.13 16.13 20 20 20" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="20" cy="27" r="3.5" fill="white"/>
          </svg>
        </div>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#191F28', lineHeight: 1.5, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#ADB5BD' }}>{meta}</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", width: '100%' }}>

      {/* 공고 상세 모달 */}
      {(selectedJob || jobDetailLoading || jobDetailError) && <JobDetailModal />}

      {/* 헤더 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F2F4F7', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <img src="/fish.png" alt="fish" style={{ height: 22 }} onError={e => e.target.style.display='none'} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 13, color: '#4D5562', cursor: 'pointer' }}>이력서 관리</span>
            <span style={{ fontSize: 13, color: '#4D5562', cursor: 'pointer' }}>공고 모아보기</span>
            <span onClick={handleLogout} style={{ fontSize: 13, color: '#ADB5BD', cursor: 'pointer' }}>로그아웃</span>
            <img src="/alarm.png" alt="alarm" style={{ width: 24, height: 24, cursor: 'pointer' }} onError={e => e.target.style.display='none'} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF6FF', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="/my.png" alt="my" style={{ width: 32, height: 32, objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
            </div>
          </div>
        </div>
      </div>

      {/* 로고 + 검색바 */}
      <div style={{ background: '#fff', padding: '20px 32px 18px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ marginBottom: 14 }}>
            <img src="/logo2.png" alt="ILLO-ON" style={{ height: 44 }} onError={e => e.target.style.display='none'} />
          </div>
          <div style={{ background: '#fff', borderRadius: 50, border: '1.5px solid #E5E8EB', display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="공고 검색"
              style={{ flex: 1, height: '100%', border: 'none', outline: 'none', fontSize: 15, color: '#333', background: 'transparent' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, color: '#2196F3', fontWeight: 700 }}>1</span>
              <span style={{ fontSize: 14, color: '#4D5562' }}>토스</span>
              <span style={{ fontSize: 14, color: '#ADB5BD' }}>—</span>
              <span style={{ fontSize: 14, color: '#ADB5BD' }}>•••</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D5562" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 80px' }}>

        {/* 배너 + 추천공고 */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'stretch' }}>
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#191F28' }}><span style={{ color: '#2196F3' }}>김여주</span> 님!</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#191F28' }}>취업하러 이리와봐유 🔥</div>
            </div>
            <div style={{ background: 'linear-gradient(150deg, #2196F3 0%, #42A5F5 60%, #90CAF9 100%)', borderRadius: 18, padding: '22px 20px 0 20px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: 340 }}>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.4, marginBottom: 20 }}>AI로 이력서 빠르게<br />평가 받기</div>
              <button onClick={() => setView('resume')}
                style={{ background: '#fff', color: '#2196F3', border: 'none', borderRadius: 18, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                평가하러가기 <span>›</span>
              </button>
              <img src="/character2.png" alt="character" style={{ position: 'absolute', right: -10, bottom: 0, width: 200 }} onError={e => e.target.style.display='none'} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0, background: '#F9FAFF', borderRadius: 18, padding: '20px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#191F28', marginBottom: 20 }}>
              <span style={{ color: '#2196F3' }}>김여주</span> 님을 위한 추천 공고!
            </div>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button onClick={scrollLeft}
                style={{ position: 'absolute', left: -18, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: '#fff', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div ref={scrollRef} style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', width: '100%' }}>
                {recommendJobs.map((job) => <RecommendCard key={job.id} id={job.id} title={job.title} meta={job.meta} />)}
              </div>
              <button onClick={scrollRight}
                style={{ position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: '#fff', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* 취업 배너 */}
        <div style={{ background: 'linear-gradient(90deg, #1976D2 0%, #2196F3 60%, #64B5F6 100%)', borderRadius: 16, padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 180, top: 0, bottom: 0, width: 50, background: 'rgba(255,255,255,0.08)', transform: 'skewX(-12deg)' }} />
          <div style={{ position: 'absolute', right: 140, top: 0, bottom: 0, width: 25, background: 'rgba(255,255,255,0.05)', transform: 'skewX(-12deg)' }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>취업이 하고 싶긴 하니?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>근데 니발은 왜 발레를 하나도 안해본 사람 발같아:?</div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 10, padding: '9px 18px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            발레 배우러 가기 ›
          </button>
        </div>

        {/* 오늘의 스크랩 현황 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>오늘의 스크랩 현황</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: '새로운 공고', value: 5, color: '#2196F3', img: '/character3.png' },
              { label: '마감 임박 공고', value: 2, color: '#FF6B6B', img: '/character4.png' },
              { label: '전체 스크랩', value: 28, color: '#191F28', img: '/character5.png' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', border: '1px solid #F2F4F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#6B7684', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: item.color }}>{item.value}</div>
                </div>
                <img src={item.img} alt={item.label} style={{ width: 90, height: 90, objectFit: 'contain' }} onError={e => e.target.style.display='none'} />
              </div>
            ))}
          </div>
        </div>

        {/* 일리온이 추천하는 공고 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>일리온이 추천하는 공고! 놓치지 마세요!</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
            <FeaturedJobCard id="featured-0" title="[굴림] 프로덕트 디자이너 (Product Designer / UIUX)" meta="충북 청주시 신입 - 경력 5년" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12 }}>
              {Array(4).fill(null).map((_, i) => (
                <SmallJobCard key={i} id={`illione-${i}`} title="[굴림] 프로덕트 디자이너 (Product Designer / UIUX)" meta="충북 청주시 신입 - 경력 5년" />
              ))}
            </div>
          </div>
        </div>

        {/* AI가 평가해준 내 이력서 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>AI가 평가해준 내 이력서</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { role: 'Product Designer', score: 70, date: '18일 목요일', note: '김여주 님이 부족한 부분', skills: ['UX Research', 'Figma'] },
                { role: 'UX/UI Designer', score: 40, date: '18일 목요일', note: '김여주 님이 부족한 부분', skills: ['Design skill', '그냥 다'] },
              ].map((item, i) => (
                <div key={i} style={{ background: '#F8FAFC', borderRadius: 14, padding: '16px 20px', border: '1px solid #F2F4F7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#ADB5BD' }}>이력서 분석</div>
                      <div style={{ fontSize: 11, color: '#ADB5BD' }}>{item.date}</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#191F28' }}>{item.role}</div>
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#2196F3', marginBottom: 6 }}>{item.score}</div>
                  <div style={{ fontSize: 11, color: '#6B7684', marginBottom: 8 }}>{item.note}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {item.skills.map((s, j) => (
                      <span key={j} style={{ fontSize: 11, color: '#6B7684', background: '#EEF2FF', borderRadius: 6, padding: '3px 10px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <div style={{ position: 'relative', width: 160, height: 160 }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="64" fill="none" stroke="#E5E8EB" strokeWidth="16"/>
                  <circle cx="80" cy="80" r="64" fill="none" stroke="#2196F3" strokeWidth="16"
                    strokeDasharray={`${2 * Math.PI * 64 * 0.7} ${2 * Math.PI * 64 * 0.3}`}
                    strokeDashoffset={2 * Math.PI * 64 * 0.25} strokeLinecap="round"/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#191F28' }}>70</div>
                  <div style={{ fontSize: 13, color: '#6B7684' }}>양호</div>
                </div>
              </div>
              <button onClick={() => setView('resume-result')}
                style={{ background: '#2196F3', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                더보러 가기 <span>›</span>
              </button>
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '20px', border: '1px solid #F2F4F7', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
              {[
                { label: '스킬', value: 84 },
                { label: '경력', value: 84 },
                { label: '포트폴리오', value: 84 },
                { label: '직무적합성', value: 84 },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#4D5562', width: 64, flexShrink: 0 }}>{stat.label}</span>
                  <div style={{ flex: 1, height: 7, background: '#E5E8EB', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${stat.value}%`, height: '100%', background: '#2196F3', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#191F28', width: 24, textAlign: 'right' }}>{stat.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid #E5E8EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#4D5562' }}>내 이력서 총 점수 :</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#2196F3' }}>70점</span>
              </div>
            </div>
          </div>
        </div>

        {/* 취업 배너 2 */}
        <div style={{ background: 'linear-gradient(90deg, #1976D2 0%, #2196F3 60%, #64B5F6 100%)', borderRadius: 16, padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 180, top: 0, bottom: 0, width: 50, background: 'rgba(255,255,255,0.08)', transform: 'skewX(-12deg)' }} />
          <div style={{ position: 'absolute', right: 140, top: 0, bottom: 0, width: 25, background: 'rgba(255,255,255,0.05)', transform: 'skewX(-12deg)' }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>취업이 하고 싶긴 하니?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>근데 니발은 왜 발레를 하나도 안해본 사람 발같아:?</div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 10, padding: '9px 18px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            발레 배우러 가기 ›
          </button>
        </div>

        {/* 충청남도 지역별 공고 - 실제 API */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>충청남도 지역별 공고</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {regions.map((r) => (
              <button key={r} onClick={() => setSelectedRegion(r)}
                style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: selectedRegion === r ? 700 : 400, background: selectedRegion === r ? '#2196F3' : '#fff', color: selectedRegion === r ? '#fff' : '#6B7684', border: `1px solid ${selectedRegion === r ? '#2196F3' : '#E5E8EB'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                {r}
              </button>
            ))}
          </div>
          {regionJobsLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#ADB5BD' }}>불러오는 중...</div>
          ) : regionJobs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {regionJobs.map((job) => (
                <SmallJobCard key={job.id} id={job.id} title={job.title} meta={`${job.company} · ${job.location}`} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 30, color: '#ADB5BD', fontSize: 14 }}>해당 지역 공고가 없어요.</div>
          )}
        </div>

        {/* 전체 공고 - 실제 API */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>전체 공고</div>
          {jobsLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#ADB5BD' }}>공고 불러오는 중...</div>
          ) : allJobs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {allJobs.map((job) => (
                <SmallJobCard key={job.id} id={job.id} title={job.title} meta={`${job.company} · ${job.location}`} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {Array(16).fill(null).map((_, i) => (
                <SmallJobCard key={i} id={`all-${i}`} title="[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)" meta="올투 천연수소 · 경력 3년↑" />
              ))}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <button style={{ background: '#fff', border: '1px solid #E5E8EB', borderRadius: 10, padding: '10px 32px', fontSize: 13, fontWeight: 700, color: '#6B7684', cursor: 'pointer' }}>
              더보러가기 ›
            </button>
          </div>
        </div>

      </div>

      {/* 푸터 */}
      <div style={{ background: '#fff', borderTop: '1px solid #F2F4F7', padding: '48px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <img src="/logo2.png" alt="ILLO-ON" style={{ height: 28, marginBottom: 12 }} onError={e => e.target.style.display='none'} />
            <div style={{ fontSize: 12, color: '#ADB5BD', lineHeight: 2, marginBottom: 4 }}>
              (주) 000 &nbsp;|&nbsp; 대표리더 노영래
            </div>
            <div style={{ fontSize: 12, color: '#ADB5BD', lineHeight: 2, marginBottom: 4 }}>
              충남시 동남구 두정동 노영래집 00구 000로 뿜뿜뿜뿜, 뀨뀨뀨 뿌직 &nbsp;|&nbsp; 전화번호 : 010-노영래전화번호
            </div>
            <div style={{ fontSize: 12, color: '#ADB5BD', marginTop: 16 }}>
              Copyright © 2024 MESSE ESANG All Rights Reserved.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28' }}>일로온의 디자이너와 개발자</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E5E8EB', borderRadius: 10, padding: '10px 28px', fontSize: 14, fontWeight: 600, color: '#191F28', cursor: 'pointer' }}>
              <img src="/fish.png" alt="" style={{ height: 18 }} onError={e => e.target.style.display='none'} />
              보러가기
            </button>
            <img src="/character6.png" alt="character" style={{ width: 160 }} onError={e => e.target.style.display='none'} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;