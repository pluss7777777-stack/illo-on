import React, { useState } from 'react';

const BookmarkPage = ({ setView, bookmarks, allJobs, goToJobDetail }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const bookmarkedJobs = allJobs.filter(job => bookmarks[job.id]);

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

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", width: '100%' }}>

      {/* 헤더 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F2F4F7', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <img src="/fish.png" alt="fish" style={{ height: 22, cursor: 'pointer' }} onClick={() => setView('home')} onError={e => e.target.style.display='none'} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 13, color: '#4D5562', cursor: 'pointer' }} onClick={() => setView('resume-manage')}>이력서 관리</span>
            <span style={{ fontSize: 13, color: '#2196F3', fontWeight: 700, cursor: 'pointer' }}>공고 모아보기</span>
            <span onClick={handleLogout} style={{ fontSize: 13, color: '#ADB5BD', cursor: 'pointer' }}>로그아웃</span>
            <img src="/alarm.png" alt="alarm" style={{ width: 24, height: 24, cursor: 'pointer' }} onError={e => e.target.style.display='none'} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF6FF', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="/my.png" alt="my" style={{ width: 32, height: 32, objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* 프로필 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 48 }}>
          <div style={{ width: 160, height: 200, borderRadius: 16, background: '#EEF6FF', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/profile.png" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} onError={e => e.target.style.display='none'} />
          </div>
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#2196F3' }}>김여주</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #E5E8EB', borderRadius: 8, padding: '4px 12px', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: '#4D5562' }}>신입</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#6B7684', marginBottom: 14 }}>2000.02.21 (25세)</div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.91-2.18h3a2 2 0 0 1 2 1.72c.13 1 .38 1.97.72 2.9a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.93.34 1.9.59 2.9.72A2 2 0 0 1 22 16.92z"/></svg>
                <span style={{ fontSize: 13, color: '#4D5562' }}>01012345678</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span style={{ fontSize: 13, color: '#4D5562' }}>pluss3@naver.com</span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #E5E8EB', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, color: '#4D5562', background: '#fff', cursor: 'pointer' }}>
              수정하기
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4D5562" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        </div>

        {/* 저장된 공고 */}
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#191F28', marginBottom: 20 }}>저장된 공고</div>

          {bookmarkedJobs.length === 0 ? (
            <div style={{ background: '#F8FAFC', borderRadius: 20, padding: '60px 20px', textAlign: 'center', border: '1px solid #F2F4F7' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#EEF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 8 }}>저장된 공고가 없어요</div>
              <div style={{ fontSize: 14, color: '#ADB5BD', marginBottom: 24 }}>관심 있는 공고를 북마크해보세요!</div>
              <button onClick={() => setView('home')}
                style={{ background: '#2196F3', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                공고 보러가기
              </button>
            </div>
          ) : (
            <div style={{ background: '#F8FAFC', borderRadius: 20, padding: '24px', border: '1px solid #F2F4F7' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {bookmarkedJobs.map((job) => {
                  const isHovered = hoveredCard === job.id;
                  return (
                    <div
                      key={job.id}
                      onMouseEnter={() => setHoveredCard(job.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => goToJobDetail(job.id)}
                      style={{
                        background: '#fff', borderRadius: 14, padding: '18px 20px', cursor: 'pointer',
                        border: isHovered ? '1.5px solid #2196F3' : '1.5px solid #F2F4F7',
                        boxShadow: isHovered ? '0 4px 16px rgba(33,150,243,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s ease', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                      }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#191F28', lineHeight: 1.5, marginBottom: 8 }}>{job.title}</div>
                        <div style={{ fontSize: 12, color: '#6B7684', marginBottom: 6 }}>{job.company}</div>
                        <div style={{ fontSize: 12, color: '#ADB5BD' }}>{job.location}</div>
                        {job.keywords && job.keywords.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                            {job.keywords.slice(0, 2).map((kw, i) => (
                              <span key={i} style={{ fontSize: 11, color: '#2196F3', background: '#EEF6FF', borderRadius: 6, padding: '2px 8px' }}>{kw}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#2196F3" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ background: '#fff', borderTop: '1px solid #F2F4F7', padding: '48px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <img src="/logo2.png" alt="ILLO-ON" style={{ height: 28, marginBottom: 12 }} onError={e => e.target.style.display='none'} />
            <div style={{ fontSize: 12, color: '#ADB5BD', lineHeight: 2 }}>(주) 000 &nbsp;|&nbsp; 대표리더 노영래</div>
            <div style={{ fontSize: 12, color: '#ADB5BD', lineHeight: 2 }}>충남시 동남구 두정동 노영래집 00구 000로 뿜뿜뿜뿜, 뀨뀨뀨 뿌직 &nbsp;|&nbsp; 전화번호 : 010-노영래전화번호</div>
            <div style={{ fontSize: 12, color: '#ADB5BD', marginTop: 16 }}>Copyright © 2024 MESSE ESANG All Rights Reserved.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, paddingBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', whiteSpace: 'nowrap' }}>일로온의 디자이너와 개발자</div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E5E8EB', borderRadius: 10, padding: '10px 28px', fontSize: 14, fontWeight: 600, color: '#191F28', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <img src="/fish.png" alt="" style={{ height: 18 }} onError={e => e.target.style.display='none'} />
                보러가기
              </button>
            </div>
            <img src="/character6.png" alt="character" style={{ width: 160 }} onError={e => e.target.style.display='none'} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookmarkPage;