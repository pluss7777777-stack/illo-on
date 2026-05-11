import React, { useState } from 'react';


// 1. 설문조사 컴포넌트 (디자인 가이드 반영)
const Survey = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto pt-24">
      <div className="w-[80%] max-w-[800px] mb-24 relative">
        <div className="absolute bottom-full left-[10%] -mb-1 flex flex-col items-center translate-x-[-50%]">
          <div className="bg-[#2196F3] text-white text-[13px] font-bold px-2.5 py-1.5 rounded-[6px] mb-2 relative shadow-sm">
            1/5
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2196F3] rotate-45"></div>
          </div>
          <img src="/hi.png" alt="character" className="w-[85px] h-auto" />
        </div>
        <div className="w-full h-4 bg-[#F2F8FF] rounded-full overflow-hidden">
          <div className="w-[20%] h-full bg-[#2196F3] rounded-full"></div>
        </div>
        <h3 className="text-center text-[22px] font-bold text-[#2196F3] mt-10 tracking-tight">
          맞춤 공고 추천을 위해 설문 조사를 할게요!
        </h3>
      </div>

      <div className="w-full flex flex-col items-center space-y-10">
        <h2 className="text-[26px] font-bold text-[#333] tracking-tight">원하는 직무가 있으신가요?</h2>
        <div className="w-full max-w-[560px]">
          <input 
            type="text" 
            placeholder="예 : IT 기업에서 개발자로 일하고 싶어요" 
            className="w-full h-[72px] px-8 border border-[#E5E8EB] rounded-[16px] outline-none text-center text-[18px] text-[#333] placeholder:text-[#ADB5BD] shadow-sm focus:border-[#2196F3] transition-all"
          />
        </div>
      </div>

      <div className="w-full mt-32 relative">
        <div className="w-full h-[1px] bg-[#F2F4F7]"></div>
        <div className="flex justify-center mt-12">
          <button className="w-[460px] h-[68px] border border-[#E5E8EB] text-[#B0B8C1] font-bold rounded-[14px] text-[20px] bg-white transition-colors hover:bg-[#F9FAFB]">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. 회원가입 컴포넌트
const SignUp = ({ isSns = false, onComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [agreements, setAgreements] = useState({
    all: false, term1: false, term2: false, term3: false, term4: false,
  });

  const handleVerifyRequest = () => {
    if (phone.length > 9) setIsVerified(true);
    else alert("핸드폰 번호를 입력해주세요.");
  };

  const handleToggle = (key) => {
    setAgreements(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      newState.all = newState.term1 && newState.term2 && newState.term3 && newState.term4;
      return newState;
    });
  };

  const handleAllToggle = () => {
    const nextState = !agreements.all;
    setAgreements({ all: nextState, term1: nextState, term2: nextState, term3: nextState, term4: nextState });
  };

  const isSubmitEnabled = agreements.term1 && isVerified;

  const terms = [
    { id: 'term1', text: '(필수) 개인회원 약관에 동의', bold: true },
    { id: 'term2', text: '(선택) 위치기반서비스 이용약관에 동의' },
    { id: 'term3', text: '(선택) 마케팅 정보 수신 동의 · 이메일' },
    { id: 'term4', text: '(선택) 마케팅 정보 수신 동의 · SMS/MMS' },
  ];

  return (
    <div className="flex flex-col items-center w-[440px] mx-auto py-12">
      <h2 className="text-[24px] font-bold text-[#333] mb-10">회원가입</h2>
      <div className="w-full space-y-7">
        {!isSns && (
          <>
            <div className="space-y-2.5">
              <label className="text-[15px] font-bold text-[#333]">이메일</label>
              <input type="text" placeholder="이메일을 입력해주세요." className="w-full h-[56px] px-5 bg-[#F2F4F7] rounded-[12px] outline-none" />
            </div>
            <div className="space-y-2.5">
              <label className="text-[15px] font-bold text-[#333]">비밀번호</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호를 입력해주세요." className="w-full h-[56px] px-5 bg-[#F2F4F7] rounded-[12px] outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20">
                  <img src="/eye.png" alt="toggle" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
        <div className="space-y-2.5">
          <label className="text-[15px] font-bold text-[#333]">휴대폰</label>
          {!isVerified ? (
            <div className="space-y-2.5">
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="핸드폰 번호를 입력해주세요." className="w-full h-[56px] px-5 bg-[#F2F4F7] rounded-[12px] outline-none" />
              <button onClick={handleVerifyRequest} className="w-full h-[56px] bg-[#2196F3] text-white font-bold rounded-[12px]">인증요청</button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-full h-[56px] px-5 bg-[#F2F4F7] rounded-[12px] flex items-center">{phone}</div>
              <p className="text-[13px] text-[#8B95A1]">인증이 완료되었습니다.</p>
            </div>
          )}
        </div>
        <div className="pt-2 space-y-4">
          <div className="border border-[#E5E8EB] rounded-[12px] p-5 bg-white cursor-pointer" onClick={handleAllToggle}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center mt-1 ${agreements.all ? 'bg-[#2196F3] border-[#2196F3]' : 'border-[#E5E8EB]'}`}>
                <span className="text-[10px] text-white">✓</span>
              </div>
              <p className="text-[15px] font-bold text-[#333]">모두 동의합니다.</p>
            </div>
          </div>
          <div className="border border-[#E5E8EB] rounded-[12px] divide-y divide-[#F2F4F7] bg-white overflow-hidden">
            {terms.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-[#F9FAFB]" onClick={() => handleToggle(item.id)}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center ${agreements[item.id] ? 'bg-[#2196F3]' : 'bg-[#F2F4F7]'}`}>
                    <span className="text-[10px] text-white">✓</span>
                  </div>
                  <span className={`text-[14px] ${item.bold ? 'font-bold text-[#333]' : 'text-[#4E5968]'}`}>{item.text}</span>
                </div>
                <span className="text-[#B0B8C1]">〉</span>
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={onComplete}
          disabled={!isSubmitEnabled} 
          className={`w-full h-[60px] font-bold rounded-[12px] text-[18px] transition-all ${isSubmitEnabled ? 'bg-[#2196F3] text-white cursor-pointer' : 'bg-[#E5E8EB] text-[#B0B8C1] cursor-not-allowed'}`}
        >
          가입 완료
        </button>
      </div>
    </div>
  );
};

// 3. 메인 App 컴포넌트
export default function App() {
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-full bg-white flex flex-col font-['Noto_Sans_KR']">
      <header className="w-full h-[65px] border-b border-[#F8F9FA] flex-shrink-0 flex justify-center items-center px-8 bg-white z-10">
        <div className="w-full max-w-[1200px] flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('login')}>
            <img src="/fish.png" alt="logo" className="h-4 w-auto" />
            <span className="font-bold text-[#333] text-[16px]">통합 로그인</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#46484D]">
            <img src="/home.png" alt="home" className="w-4 h-4 opacity-60" />
            <span>일로온 홈</span>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto bg-white">
        <div className="flex items-start justify-center min-h-full">
          {view === 'login' && (
            <div className="flex flex-col items-center w-[380px] pt-24">
              <div className="w-full mb-8 relative flex items-end h-[100px]">
                <div className="flex flex-col items-start">
                  <img src="/logo.png" alt="ILLO-ON" className="w-[150px] mb-3" />
                  <h1 className="text-[20px] font-bold text-[#333] leading-[1.3] tracking-tighter">충청도 취업은<br />일로온!</h1>
                </div>
                <img src="/character.png" alt="character" className="w-[155px] absolute right-[-0px] bottom-[-5px]" />
              </div>

              <div className="w-full space-y-2.5">
                <input type="text" placeholder="이메일을 입력해주세요." className="w-full h-[56px] px-5 bg-[#F3F4F8] rounded-[12px] outline-none" />
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호를 입력해주세요." className="w-full h-[56px] px-5 bg-[#F3F4F8] rounded-[12px] outline-none" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20">
                    <img src="/eye.png" alt="eye" className="w-5 h-5" />
                  </button>
                </div>
                <button className="w-full h-[58px] bg-[#2196F3] text-white font-bold rounded-[12px] mt-2 shadow-sm">로그인</button>
              </div>

              <div className="flex items-center gap-4 mt-8 text-[13px] text-[#ADB5BD]">
                <button>계정 찾기</button>
                <div className="w-[1px] h-[10px] bg-[#E5E8EB]"></div>
                <button className="text-[#4E5968] font-bold" onClick={() => setView('signup')}>회원가입</button>
              </div>

              {/* 간편 로그인 영역 복구 */}
              <div className="w-full mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-[1px] bg-[#F2F4F7]"></div>
                  <span className="text-[12px] text-[#D1D5DB]">간편로그인</span>
                  <div className="flex-1 h-[1px] bg-[#F2F4F7]"></div>
                </div>
                <div className="flex justify-center gap-5">
                  {['naver', 'kakao', 'apple', 'google'].map(sns => (
                    <img 
                      key={sns} 
                      src={`/${sns}.png`} 
                      alt={sns} 
                      className={`w-[48px] h-[48px] cursor-pointer hover:opacity-80 transition-opacity ${sns === 'google' ? 'border border-[#F2F4F7] rounded-full' : ''}`} 
                      onClick={() => setView('sns-signup')} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {view === 'signup' && <SignUp onComplete={() => setView('survey')} />}
          {view === 'sns-signup' && <SignUp isSns={true} onComplete={() => setView('survey')} />}
          {view === 'survey' && <Survey />}
        </div>
      </main>

      {/* 설문조사 시 푸터 제외 */}
      {view !== 'survey' && (
        <footer className="w-full border-t border-[#F8F9FA] py-6 flex-shrink-0 flex justify-center bg-[#FCFDFF]">
          <div className="w-full max-w-[1200px] px-8 flex justify-between items-center text-[11px] text-[#B0B8C1]">
            <span>© Illo-on Lab, Inc</span>
            <div className="flex gap-8 items-center text-[#8B95A1]">
              <div className="flex gap-5">
                <span>이용약관</span>
                <span className="font-bold text-[#6B7684]">개인정보처리방침</span>
              </div>
              <div className="flex items-center border border-[#E5E8EB] rounded-[6px] px-3 py-1.5 gap-3 text-[#6B7684] bg-white cursor-pointer">
                <span>한국어</span>
                <span className="text-[8px]">▼</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}