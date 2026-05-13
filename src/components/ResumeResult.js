import React, { useEffect, useState } from 'react';

const ResumeResult = ({ setView }) => {
  const [animated, setAnimated] = useState(false);
  const [barHeight, setBarHeight] = useState({ my: 0, avg: 0 });

  useEffect(() => {
    // 페이지 로드 후 애니메이션 시작
    const timer = setTimeout(() => {
      setAnimated(true);
      setBarHeight({ my: 70, avg: 80 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scores = { '기초직무\n역량': 70, '경험량·\n자격증': 45, '포트폴리오\n완성도': 55, '문제해결능력\n·기획력': 60, '신뢰성·\n일관성': 50 };
  const scoreValues = Object.values(scores);
  const labels = Object.keys(scores);
  const n = 5;
  const cx = 140, cy = 140, R = 100;

  const getPoint = (i, pct) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + R * pct * Math.cos(angle), y: cy + R * pct * Math.sin(angle) };
  };

  const getLabelPos = (i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + (R + 28) * Math.cos(angle), y: cy + (R + 28) * Math.sin(angle) };
  };

  // 배경 격자 오각형
  const gridPolygon = (pct) =>
    Array.from({ length: n }, (_, i) => {
      const p = getPoint(i, pct);
      return `${p.x},${p.y}`;
    }).join(' ');

  // 데이터 오각형
  const dataPolygon = (scale = 1) =>
    scoreValues.map((v, i) => {
      const p = getPoint(i, (v / 100) * scale);
      return `${p.x},${p.y}`;
    }).join(' ');

  const card = (dashed = false) => ({
    border: `1.5px ${dashed ? 'dashed' : 'solid'} ${dashed ? '#D1D5DB' : '#E5E8EB'}`,
    borderRadius: 14, padding: '14px 16px', marginBottom: 10, background: '#fff',
  });
  const iconBox = (color = '#EEF6FF') => ({
    width: 36, height: 36, borderRadius: 10, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  });
  const metaText = { fontSize: 12, color: '#6B7684' };
  const boldTitle = { fontSize: 14, fontWeight: 700, color: '#191F28' };
  const divider = { height: 1, background: '#F2F4F7', margin: '10px 0' };

  const SVGIcon = ({ d, size = 18 }) => (
    <div style={iconBox()}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* 배너 */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '9px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>!</span>
            </div>
            <span style={{ fontSize: 13, color: '#4D5562' }}>따로 작성한 이력서를 업로드 할게요</span>
          </div>
          <button style={{ fontSize: 13, fontWeight: 700, color: '#2196F3', background: 'none', border: 'none', cursor: 'pointer' }}>이동</button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 16px 120px' }}>

        {/* ── 프로필 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 20, gap: 16 }}>
          <div style={{ width: 88, height: 110, borderRadius: 12, background: '#EEF6FF', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/profile.png" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} onError={e => e.target.style.display = 'none'} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#191F28' }}>김여주</span>
              <span style={{ border: '1px solid #E5E8EB', borderRadius: 7, padding: '2px 10px', fontSize: 12, color: '#4D5562' }}>신입</span>
            </div>
            <div style={{ fontSize: 13, color: '#6B7684', marginBottom: 7 }}>2000.02.21 (25세)</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.91-2.18h3a2 2 0 0 1 2 1.72c.13 1 .38 1.97.72 2.9a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.93.34 1.9.59 2.9.72A2 2 0 0 1 22 16.92z"/></svg>
                <span style={{ fontSize: 12, color: '#4D5562' }}>01012345678</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span style={{ fontSize: 12, color: '#4D5562' }}>plus3@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 경력 */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#191F28', margin: '28px 0 12px' }}>경력</h2>
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <SVGIcon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            <div>
              <div style={boldTitle}>(주) 토스</div>
              <div style={{ ...metaText, marginTop: 2 }}>2024.03 - 2025.03 (1년 1개월)&nbsp;|&nbsp;계약직&nbsp;|&nbsp;uxui디자이너&nbsp;사원</div>
            </div>
          </div>
          <div style={divider} />
          <div style={{ fontSize: 13, fontWeight: 600, color: '#191F28', marginBottom: 3 }}>uxui/gui 디자인 및 qa</div>
          <div style={{ ...metaText, marginBottom: 7 }}>2024.03 - 2025.03&nbsp;|&nbsp;uxui디자이너&nbsp;사원</div>
          <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.75, margin: 0 }}>인바디 벤처사와 인바디 디자인팀 소속으로 근무하여 의료기기 제품의 UX/UI 디자인 업무를 수행하였습니다. 직관적보행 분석기, 밸런스스케 등 의료 헬스케어 기기의 사용자 인터페이스 및 사용자 경험 설계를 담당하였습니다.</p>
        </div>

        {/* ── 학력 */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#191F28', margin: '28px 0 12px' }}>학력</h2>
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SVGIcon d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
            <div>
              <div style={boldTitle}>상명대학교</div>
              <div style={{ ...metaText, marginTop: 2 }}>2024.03 - 2025.03&nbsp;|&nbsp;졸업&nbsp;|&nbsp;커뮤니케이션디자인</div>
            </div>
          </div>
        </div>

        {/* ── 수상/자격증 */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#191F28', margin: '28px 0 12px' }}>수상/자격증/기타</h2>
        {[
          { icon: '🏆', name: '커뮤니케이션 디자인 국제 공모전', date: '2024.03', type: '수상', detail: '커뮤니케이션디자인 부문 입선' },
          { icon: '📋', name: 'GTQ 1급', date: '2024.01', type: '자격증', detail: '그래픽 기술자 자격증 포토샵 1급 취득' },
        ].map((item, i) => (
          <div key={i} style={card()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={iconBox()}><span style={{ fontSize: 16 }}>{item.icon}</span></div>
              <div>
                <div style={boldTitle}>{item.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                  <span style={metaText}>{item.date}</span>
                  <span style={{ fontSize: 12, color: '#ADB5BD' }}>|</span>
                  <span style={{ fontSize: 12, color: '#2196F3', fontWeight: 600 }}>{item.type}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7684', marginTop: 2 }}>{item.detail}</div>
              </div>
            </div>
          </div>
        ))}

        {/* ── 링크 */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#191F28', margin: '28px 0 12px' }}>링크</h2>
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SVGIcon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            <div>
              <div style={boldTitle}>포트폴리오</div>
              <div style={{ fontSize: 12, color: '#2196F3', marginTop: 2 }}>https://myip.lc/krWBR</div>
            </div>
          </div>
        </div>

        {/* ── 자기소개서 */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#191F28', margin: '28px 0 12px' }}>자기소개서</h2>
        <div style={card()}>
          <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.85, margin: 0 }}>기술적 이해와 UX 설계 역량을 겸비하여 개발자와 원활하게 소통하는 디자이너.<br /><br />사용자 중심의 UI 설계와 시스템 구조화 경험에 개발 환경에 대한 깊이 있는 이해를 더하여, '실전 가능한 솔루션을 도출하는 데 강점을 지니고 있습니다.</p>
        </div>

        {/* ══ 이력서 분석 결과 ══ */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#191F28', margin: '40px 0 16px' }}>이력서 분석 결과</h2>

        {/* AI 종합 분석 */}
        <div style={{ ...card(), marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ ...iconBox(), fontSize: 15 }}>🤖</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#191F28' }}>AI 종합 분석</span>
          </div>
          <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.8, margin: 0 }}>현재의 AI 역할에서의 지원 활동들을 분석한 결과, 디자인 및 개발/협업/소통 분야에서 실제 역량이 갖추고 있었습니다.</p>
          <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.8, margin: '10px 0 0' }}>특기사항으로 직무 <strong>2가지, 자격증, 수상이력</strong>에서 부족하니 님들하고 요모 과역하여, 관련된 추천활동을 참고 제안에 드립니다.</p>
        </div>

        {/* 내 이력서 분석 - 차트 */}
        <div style={{ ...card(), marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 4 }}>내 이력서 분석</div>
          <p style={{ fontSize: 12, color: '#6B7684', margin: '0 0 24px' }}>점수 종합 등 수 기반을, 경력 대비 분야의 필요한 정보의 제공합니다. 점수 이내를 확인하고 취업 중요을 살펴보세요.</p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>

            {/* ── 레이더 차트 SVG */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#191F28', marginBottom: 8 }}>영역별 분석</div>
              <svg width="280" height="280" viewBox="0 0 280 280">
                {/* 배경 격자 */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((pct, i) => (
                  <polygon key={i} points={gridPolygon(pct)} fill="none" stroke="#E5E8EB" strokeWidth="1" />
                ))}
                {/* 축선 */}
                {Array.from({ length: n }, (_, i) => {
                  const p = getPoint(i, 1);
                  return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E5E8EB" strokeWidth="1" />;
                })}
                {/* 데이터 영역 - 애니메이션 */}
                <polygon
                  points={dataPolygon(animated ? 1 : 0)}
                  fill="rgba(33,150,243,0.15)"
                  stroke="#2196F3"
                  strokeWidth="2"
                  style={{ transition: 'points 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}
                />
                {/* 데이터 포인트 */}
                {scoreValues.map((v, i) => {
                  const p = getPoint(i, animated ? v / 100 : 0);
                  return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2196F3" style={{ transition: `cx 0.8s, cy 0.8s` }} />;
                })}
                {/* 라벨 */}
                {labels.map((label, i) => {
                  const pos = getLabelPos(i);
                  const lines = label.split('\n');
                  return (
                    <text key={i} x={pos.x} y={pos.y} textAnchor="middle" fontSize="11" fill="#4D5562">
                      {lines.map((line, j) => (
                        <tspan key={j} x={pos.x} dy={j === 0 ? `-${(lines.length - 1) * 7}` : '14'}>{line}</tspan>
                      ))}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* ── 막대 차트 CSS */}
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#191F28', marginBottom: 8 }}>종합 점수</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 180 }}>
                {/* Y축 */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 150, paddingBottom: 0, marginBottom: 24 }}>
                  {[100, 75, 50, 25, 0].map(v => (
                    <span key={v} style={{ fontSize: 10, color: '#ADB5BD', lineHeight: 1 }}>{v}</span>
                  ))}
                </div>
                {/* 막대들 */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: '100%' }}>
                  {[
                    { label: '선택자\n점수', score: 70, color: '#2196F3', h: barHeight.my },
                    { label: '평균', score: 80, color: '#E5E8EB', h: barHeight.avg },
                  ].map((bar, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: bar.color === '#2196F3' ? '#2196F3' : '#ADB5BD', marginBottom: 6 }}>{bar.score}점</span>
                      <div style={{
                        width: 50,
                        height: `${bar.h * 1.5}px`,
                        background: bar.color,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                        minHeight: 0,
                      }} />
                      <span style={{ fontSize: 11, color: '#6B7684', marginTop: 8, textAlign: 'center', whiteSpace: 'pre-line' }}>{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 분석 내용 설명 */}
        <div style={{ ...card(), marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 4 }}>분석 내용 설명</div>
          <p style={{ fontSize: 12, color: '#6B7684', margin: '0 0 16px' }}>분석의 각각 학목들을 경험하요, 사이터 하신다들 전문 중 다양한 5가지 핵심 분석으로 정비에 설명해드려요.</p>
          {[
            { title: '1.기초직무 역량도', content: '지원하는 교포의 직무기여방에 이끌어 있는 기술 자격 획득이 이력서에 포트폴리오를 연결하면 11.9% 제고.\n창의력 경험을 내재화는 없어 이익을, 회사의 요구 임도 내용 회사에 기여하는 서비가에 어떻 정착에 내분화는 경험이 담기 매력업무어요.' },
            { title: '2.경험량·자격증', content: '포트폴리오에서 확인된 미약한 자격증 관련하면 계량을, 참고로 고로 인지 경험이 관련을 명사의 기술해서요.\n특히 관련 통계에서는 자격 관련 다는 경험내기 수준으로 진짜여요 실도 20% 가진, 내용의 법 134 중이 경력에 경험이 만들어질이 권장려요.' },
            { title: '3.문제해결능력·기획력', content: 'IT 기업에서의 사용자 조사를 한 것들이 실음, 특히 기회에서 소 서울들 관련된 시간이 근거가 제시하이의 돼요.\n과한 경력에서 이력은 기술의 한에서 트너경험이 서비를 통해 경력을 경험에서 소개하지요도 받아야 해요.' },
            { title: '4.포트폴리오 완성도', content: '이력서 내용에서 이해이력이 충분하게 예제이것이 관련표를, 충분한 경험들의 기술해당 수정을 경험 공들여 가져오세요.\n저부여이고 이는 다른 경영이 이력서 설명이 항목을 들의에 경력인 총합에서 내용의 이력내 서비스를 공들이기.' },
            { title: '5.신뢰성·자격증·일관성', content: '이력서의 신뢰이에서 이 서로 경험이에서 참고 하거나 공도이 저를 밝히 내리어 해경의 경험해이요.\n관련된 이수이어의 이기에들이 공들이이들은 하면들이어, 사업이 이러면 현재 고려중의 정도에 평서하면 내부이어서 자격이 해나영이들 있어요.' },
          ].map((item, i, arr) => (
            <div key={i} style={{ marginBottom: i < arr.length - 1 ? 16 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#191F28', marginBottom: 5 }}>{item.title}</div>
              <p style={{ fontSize: 13, color: '#4D5562', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-line' }}>{item.content}</p>
            </div>
          ))}
        </div>

        {/* 관련 추천활동 */}
        <div style={{ ...card(), marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#191F28', marginBottom: 4 }}>관련 추천활동</div>
          <p style={{ fontSize: 12, color: '#6B7684', margin: '0 0 16px' }}>이력 그래프에서 보이어 분석이어 기반 추천이어서 이력 경력 취준 활동을 제거을, 3분야 추천드립니다.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { icon: '📚', title: '변리사 자격증 취득', desc: '디자인 실무 경험이 시울를 소유 학공\n경영화교와 Google Developer Group가\nOPIc 강의 학습을 추천해요.' },
              { icon: '🎨', title: '디자이너 자격증 취득', desc: 'GTQ능력이나 관련 자격증\n수능 경험에 이력이 항공을 해결하\n경험을 볼 것을 추천해요.' },
              { icon: '🏆', title: '디자인 공모전 수상', desc: '수상 경력이 7점 3 이제 경험에\n기인한 자격이어 이해처에 이\n인이 이력을 추천드려요.' },
            ].map((rec, i) => (
              <div key={i} style={{ flex: 1, minWidth: 160, border: '1.5px solid #2196F3', borderRadius: 12, padding: '14px 14px 16px' }}>
                <div style={{ ...iconBox(), fontSize: 16, marginBottom: 10 }}>{rec.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#191F28', marginBottom: 6 }}>{rec.title}</div>
                <p style={{ fontSize: 12, color: '#6B7684', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line' }}>{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 하단 고정 버튼 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #F2F4F7', padding: '12px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#6B7684' }}>이력서 제목</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#191F28' }}>김여주의 이력서</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setView('resume')}
              style={{ width: 90, height: 42, border: '1px solid #E5E8EB', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#6B7684', background: '#fff', cursor: 'pointer' }}>
              수정하기
            </button>
            <button style={{ width: 90, height: 42, background: '#2196F3', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}>
              제출하기
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResumeResult;