import React, { useState } from 'react';

const Signup = ({ onGoLogin }) => {
  const [authState, setAuthState] = useState('none'); // 'none', 'requesting', 'done'
  
  return (
    <div className="flex flex-col items-center w-full max-w-[450px] mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-12">회원가입</h2>

      <div className="w-full space-y-8 text-left">
        {/* 이메일 & 비밀번호 (처음 화면) */}
        {authState === 'none' && (
          <>
            <div>
              <label className="block text-sm font-bold mb-2">이메일</label>
              <input type="text" placeholder="이메일을 입력해주세요." className="w-full p-4 bg-[#F3F4F7] rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">비밀번호</label>
              <div className="relative">
                <input type="password" placeholder="비밀번호를 입력해주세요." className="w-full p-4 bg-[#F3F4F7] rounded-xl outline-none" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">👁️</button>
              </div>
            </div>
          </>
        )}

        {/* 휴대폰 인증 영역 */}
        <div>
          <label className="block text-sm font-bold mb-2">휴대폰</label>
          {authState === 'none' ? (
            <button onClick={() => setAuthState('requesting')} className="w-full py-4 bg-[#2094F3] text-white font-bold rounded-xl shadow-md">인증요청</button>
          ) : authState === 'requesting' ? (
            <div className="space-y-3">
               <div className="flex gap-2">
                  <input type="text" value="01012345678" readOnly className="flex-1 p-4 bg-[#F3F4F7] rounded-xl text-gray-500" />
                  <button onClick={() => setAuthState('done')} className="px-6 bg-white border border-[#2094F3] text-[#2094F3] font-bold rounded-xl text-sm">인증완료</button>
               </div>
               <p className="text-[11px] text-gray-400 ml-1">인증번호가 발송되었습니다.</p>
            </div>
          ) : (
            <div className="space-y-2">
               <input type="text" value="01012345678" readOnly className="w-full p-4 bg-[#F3F4F7] rounded-xl text-gray-500" />
               <p className="text-[11px] text-[#2094F3] ml-1">인증이 완료되었습니다.</p>
            </div>
          )}
        </div>

        {/* 약관 동의 박스 (지현님 디자인 포인트!) */}
        <div className="space-y-4">
          <div className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input type="checkbox" id="all" className="mt-1 w-5 h-5 accent-[#2094F3]" />
              <div>
                <label htmlFor="all" className="font-bold text-sm text-gray-700">모두 동의합니다.</label>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">위치기반 서비스 이용약관 (선택), 마케팅 정보 수신 동의<br/>(이메일,SMS/MMS)(선택) 동의를 포함합니다.</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 space-y-5">
            {[ 
              { t: "(필수) 개인회원 약관에 동의", req: true },
              { t: "(선택) 위치기반서비스 이용약관에 동의", req: false },
              { t: "(선택) 마케팅 정보 수신 동의 · 이메일", req: false },
              { t: "(선택) 마케팅 정보 수신 동의 · SMS/MMS", req: false }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 accent-[#2094F3]" />
                  <span className={item.req ? "font-medium" : ""}>{item.t}</span>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            ))}
            <div className="text-[11px] text-gray-400 pt-1">
              <span className="ml-7 cursor-pointer hover:underline">· 개인정보 수집 및 이용 안내</span>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-[#2094F3] text-white font-bold rounded-xl shadow-md mt-6 opacity-90 hover:opacity-100">가입 완료</button>
      </div>
    </div>
  );
};

export default Signup;