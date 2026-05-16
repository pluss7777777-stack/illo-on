import React, { useState } from 'react';

const Home = ({ setView }) => {
  const [selectedRegion, setSelectedRegion] = useState('천안시');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'];

  const recommendedJobs = [
    { company: '[위시스트] 너 감긴적이지 (Product Designer / UIUX)', type: '정규 · 경력 3년↑ · 천안지역', color: '#4FC3F7' },
    { company: '[여벌] 블러 디자인 어시스턴트', type: '정규 · 경력 3년↑ · 천안지역', color: '#4FC3F7' },
    { company: '[위시스트] 너 감긴적이지 (Product Designer)', type: '정규 · 경력 3년↑ · 천안지역', color: '#4FC3F7' },
  ];

  const wantedJobs = [
    { title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑', featured: true },
    { title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑', featured: false },
    { title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑', featured: false },
    { title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑', featured: false },
    { title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑', featured: false },
  ];

  const allJobs = Array(16).fill({ title: '[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)', meta: '올투 천연수소 · 경력 3년↑' });

  const JobCard = ({ title, meta, featured }) => (
    <div style={{
      background: '#fff', border: '1px solid #F2F4F7', borderRadius: 12,
      padding: '14px', cursor: 'pointer', position: 'relative',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      {featured && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, background: '#E3F2FD', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 10 }}>⭐</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{ fontSize: 11, color: '#2196F3', fontWeight: 700 }}>wanted</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#191F28', lineHeight: 1.5, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 11, color: '#ADB5BD' }}>{meta}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* 헤더 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F2F4F7', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <img src="/logo.png" alt="ILLO-ON" style={{ height: 28 }} onError={e => { e.target.style.display='none'; }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 13, color: '#4D5562', cursor: 'pointer' }}>이력서 관리</span>
            <button style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: '#2196F3', border: 'none', borderRadius: 8, padding: '7px 16px', cursor: 'pointer' }}>공고 보러가기</button>
            <div style={{ display: 'flex', gap: 12 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7684" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7684" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 80px' }}>

        {/* 검색바 */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E8EB', display: 'flex', alignItems: 'center', padding: '0 16px', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="공고 검색"
            style={{ flex: 1, height: 50, border: 'none', outline: 'none', fontSize: 15, color: '#333', background: 'transparent' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: '#2196F3', fontWeight: 700, background: '#E3F2FD', borderRadius: 6, padding: '3px 8px' }}>1</span>
            <span style={{ fontSize: 13, color: '#ADB5BD' }}>도스</span>
            <span style={{ fontSize: 13, color: '#ADB5BD' }}>—</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7684" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        {/* 메인 배너 + 추천 공고 */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>

          {/* 왼쪽: 인사 + 배너 */}
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#191F28' }}>김여주 님!<br /></span>
              <span style={{ fontSize: 13, color: '#6B7684' }}>취업하러 이리와봐유 🔥</span>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)', borderRadius: 20, padding: '20px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: 160 }}>
              <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.15, fontSize: 80 }}>🤖</div>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.4, marginBottom: 16 }}>AI로 이력서 바르게<br />평가 받기</div>
              <button
                onClick={() => setView('resume')}
                style={{ background: '#fff', color: '#2196F3', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                평가하기 <span>›</span>
              </button>
              <img src="/character.png" alt="" style={{ position: 'absolute', right: 10, bottom: 0, width: 90, opacity: 0.9 }} onError={e => e.target.style.display='none'} />
            </div>
          </div>

          {/* 오른쪽: 추천 공고 */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 12 }}>
              <span style={{ color: '#2196F3' }}>김여주</span> 님을 위한 추천 공고!
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {recommendedJobs.map((job, i) => (
                <div key={i} style={{ minWidth: 180, background: '#fff', borderRadius: 14, border: '1px solid #F2F4F7', padding: '14px', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2196F3" opacity="0.2"/><path d="M12 6v6l4 2" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#191F28', lineHeight: 1.5, marginBottom: 6 }}>{job.company}</div>
                  <div style={{ fontSize: 11, color: '#ADB5BD' }}>{job.type}</div>
                </div>
              ))}
              <div style={{ minWidth: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1px solid #E5E8EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ color: '#2196F3', fontWeight: 700 }}>›</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 취업 배너 */}
        <div style={{ background: 'linear-gradient(90deg, #1565C0 0%, #2196F3 100%)', borderRadius: 16, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>취업이 하고 싶진 하나요?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>근처 나들이 쪽 방향에 하나도 연락 사람 달라이가?</div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 10, padding: '8px 16px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            일대 배우러가기 ›
          </button>
        </div>

        {/* 오늘의 스크랩 현황 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 14 }}>오늘의 스크랩 현황</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: '새로운 공고', value: 5, color: '#2196F3' },
              { label: '마감 임박 공고', value: 2, color: '#FF6B6B' },
              { label: '전체 스크랩', value: 28, color: '#191F28' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px', border: '1px solid #F2F4F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 13, color: '#6B7684', marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 어바구가 추천하는 공고 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 14 }}>어바구가 추천하는 공고! 놓치지 마세요!</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {wantedJobs.slice(0, 3).map((job, i) => (
              <JobCard key={i} {...job} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
            {wantedJobs.slice(3, 5).map((job, i) => (
              <JobCard key={i} {...job} />
            ))}
            <div style={{ background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', borderRadius: 12, padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #BFDBFE' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2196F3', marginBottom: 4 }}>더보러가기</div>
              <div style={{ fontSize: 20, color: '#2196F3' }}>›</div>
            </div>
          </div>
        </div>

        {/* AI 평가해준 내 이력서 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 14 }}>AI 평가해준 내 이력서</div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #F2F4F7', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>

              {/* 이력서 카드들 */}
              <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                {[
                  { role: 'Product Designer', score: 70, skills: ['UX Research', 'Figma'] },
                  { role: 'UX/UI Designer', score: 40, skills: ['Design-all', 'TUFT'] },
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1, background: '#F8FAFC', borderRadius: 12, padding: '14px', border: '1px solid #F2F4F7' }}>
                    <div style={{ fontSize: 11, color: '#ADB5BD', marginBottom: 4 }}>이력서 분석</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#2196F3', marginBottom: 2 }}>{item.score}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#191F28', marginBottom: 8 }}>{item.role}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {item.skills.map((s, j) => (
                        <span key={j} style={{ fontSize: 11, color: '#6B7684', background: '#EEF2FF', borderRadius: 6, padding: '2px 8px' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 도넛 차트 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
                <div style={{ position: 'relative', width: 100, height: 100 }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E8EB" strokeWidth="12"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2196F3" strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.7} ${2 * Math.PI * 40 * 0.3}`}
                      strokeDashoffset={2 * Math.PI * 40 * 0.25}
                      strokeLinecap="round"/>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#191F28' }}>70</div>
                    <div style={{ fontSize: 10, color: '#ADB5BD' }}>양호</div>
                  </div>
                </div>
                <button
                  onClick={() => setView('resume-result')}
                  style={{ marginTop: 12, background: '#2196F3', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  더보러가기 ›
                </button>
              </div>

              {/* 스탯 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
                {[
                  { label: '스킬', value: 84 },
                  { label: '경력', value: 84 },
                  { label: '기타스펙', value: 84 },
                  { label: '경험/활동', value: 84 },
                ].map((stat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: '#6B7684', width: 48, flexShrink: 0 }}>{stat.label}</span>
                    <div style={{ flex: 1, height: 6, background: '#F2F4F7', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${stat.value}%`, height: '100%', background: '#2196F3', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#191F28', width: 24 }}>{stat.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 6, paddingTop: 10, borderTop: '1px solid #F2F4F7', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#6B7684' }}>내 이력서 총점 :</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#2196F3' }}>70점</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 취업 배너 2 */}
        <div style={{ background: 'linear-gradient(90deg, #1565C0 0%, #2196F3 100%)', borderRadius: 16, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>취업이 하고 싶진 하나요?</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>근처 나들이 쪽 방향에 하나도 연락 사람 달라이가?</div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 10, padding: '8px 16px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            일대 배우러가기 ›
          </button>
        </div>

        {/* 충청남도 지역별 공고 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 14 }}>충청남도 지역별 공고</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {regions.map((r) => (
              <button key={r} onClick={() => setSelectedRegion(r)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: selectedRegion === r ? 700 : 400,
                  background: selectedRegion === r ? '#2196F3' : '#fff',
                  color: selectedRegion === r ? '#fff' : '#6B7684',
                  border: `1px solid ${selectedRegion === r ? '#2196F3' : '#E5E8EB'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                {r}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {Array(8).fill(null).map((_, i) => (
              <JobCard key={i} title="[글로벌] 프로덕트 디자이너 (Product Designer / UIUX)" meta="올투 천연수소 · 경력 3년↑" />
            ))}
          </div>
        </div>

        {/* 전체 공고 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#191F28', marginBottom: 14 }}>전체 공고</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {allJobs.map((job, i) => (
              <JobCard key={i} title={job.title} meta={job.meta} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <button style={{ background: '#fff', border: '1px solid #E5E8EB', borderRadius: 10, padding: '10px 32px', fontSize: 13, fontWeight: 700, color: '#6B7684', cursor: 'pointer' }}>
              더보러가기 ›
            </button>
          </div>
        </div>

      </div>

      {/* 푸터 */}
      <div style={{ background: '#F2F4F7', borderTop: '1px solid #E5E8EB', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <img src="/logo.png" alt="ILLO-ON" style={{ height: 24, marginBottom: 12 }} onError={e => e.target.style.display='none'} />
            <div style={{ fontSize: 12, color: '#ADB5BD', lineHeight: 1.8 }}>
              © Illo-on Lab, Inc<br />
              <span style={{ cursor: 'pointer', marginRight: 12 }}>이용약관</span>
              <span style={{ cursor: 'pointer', color: '#6B7684', fontWeight: 600, marginRight: 12 }}>개인정보처리방침</span>
              한국어 ▾
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 13, color: '#4D5562', marginBottom: 8 }}>일로온에서 디자이너로 취업!</div>
            <img src="/character.png" alt="" style={{ width: 80 }} onError={e => e.target.style.display='none'} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;