import React from 'react';

const Login = ({ onGoSignup }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto px-4">
      {/* 로고 및 캐릭터 */}
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className="relative">
          <img src="/logo.png" alt="ILLO-ON" className="w-32 mb-2" />
          <p className="text-gray-700 font-bold text-xl text-center leading-tight">충청도 취업은<br/>일로온!</p>
          <img src="/hi.png" alt="character" className="w-32 absolute -right-32 -top-4" />
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="w-full space-y-3">
        <input type="text" placeholder="이메일을 입력해주세요." className="w-full p-4 bg-[#F3F4F7] rounded-xl outline-none placeholder:text-gray-400" />
        <div className="relative">
          <input type="password" placeholder="비밀번호를 입력해주세요." className="w-full p-4 bg-[#F3F4F7] rounded-xl outline-none placeholder:text-gray-400" />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">👁️</button>
        </div>
        <button className="w-full py-4 bg-[#2094F3] text-white font-bold rounded-xl shadow-md hover:bg-blue-600 transition-all mt-4">로그인</button>
      </div>

      {/* 링크 */}
      <div className="flex gap-4 mt-6 text-sm text-gray-400">
        <button className="hover:text-gray-600">계정 찾기</button>
        <span className="text-gray-200">|</span>
        <button onClick={onGoSignup} className="hover:text-gray-600">회원가입</button>
      </div>

      {/* 간편로그인 */}
      <div className="w-full mt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[1px] bg-gray-100"></div>
          <span className="text-xs text-gray-400">간편로그인</span>
          <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>
        <div className="flex justify-center gap-4">
          <img src="/naver.png" alt="naver" className="w-12 h-12 cursor-pointer" />
          <img src="/kakao.png" alt="kakao" className="w-12 h-12 cursor-pointer" />
          <img src="/apple.png" alt="apple" className="w-12 h-12 cursor-pointer" />
          <img src="/google.png" alt="google" className="w-12 h-12 cursor-pointer shadow-sm rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;