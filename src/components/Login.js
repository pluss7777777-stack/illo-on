import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://illoon.cloud/api/auth/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        // 데이터가 객체로 올 경우를 대비해서 확실하게 문자열로 변환해서 저장
        const userId = response.data.userId;
        const accessToken = response.data.accessToken;

        localStorage.setItem('user_id', String(userId));
        localStorage.setItem('access_token', String(accessToken));
        
        // 에러 방지를 위해 alert에는 문자열만 넣기
        alert('로그인 성공!');

        // 무조건 설문조사 페이지로 이동
        setView('survey'); 
      }
    } catch (error) {
      console.error('로그인 상세 에러:', error);
      alert('로그인 실패! 이메일이나 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center w-[380px] pt-24 mx-auto">
      {/* 로고 영역 */}
      <div className="w-full mb-8 relative flex items-end h-[100px]">
        <div className="flex flex-col items-start">
          <img src="/logo.png" alt="ILLO-ON" className="w-[150px] mb-3" />
          <h1 className="text-[20px] font-bold text-[#333] leading-[1.3] tracking-tighter">
            충청도 취업은<br />일로온!
          </h1>
        </div>
        <img src="/character.png" alt="character" className="w-[155px] absolute right-[-0px] bottom-[-5px]" />
      </div>

      {/* 입력 폼 */}
      <div className="w-full space-y-2.5">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요."
          className="w-full h-[56px] px-5 bg-[#F3F4F8] rounded-[12px] outline-none placeholder:text-[#ADB5BD]"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="w-full h-[56px] px-5 bg-[#F3F4F8] rounded-[12px] outline-none placeholder:text-[#ADB5BD]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20"
          >
            <img src="/eye.png" alt="eye" className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full h-[58px] bg-[#2196F3] text-white font-bold rounded-[12px] mt-2 shadow-sm hover:bg-blue-600 transition-all"
        >
          로그인
        </button>
      </div>

      {/* 하단 링크 */}
      <div className="flex items-center gap-4 mt-8 text-[13px] text-[#ADB5BD]">
        <button className="hover:text-gray-600">계정 찾기</button>
        <div className="w-[1px] h-[10px] bg-[#E5E8EB]"></div>
        <button
          className="text-[#4E5968] font-bold hover:text-black"
          onClick={() => setView('signup')}
        >
          회원가입
        </button>
      </div>

      {/* 간편 로그인 */}
      <div className="w-full mt-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-[#F2F4F7]"></div>
          <span className="text-[12px] text-[#D1D5DB]">간편로그인</span>
          <div className="flex-1 h-[1px] bg-[#F2F4F7]"></div>
        </div>
        <div className="flex justify-center gap-5 mb-10">
          {['naver', 'kakao', 'apple', 'google'].map((sns) => (
            <img
              key={sns}
              src={`/${sns}.png`}
              alt={sns}
              className={`w-[48px] h-[48px] cursor-pointer hover:opacity-80 transition-opacity ${
                sns === 'google' ? 'border border-[#F2F4F7] rounded-full' : ''
              }`}
              onClick={() => {
                if (sns === 'naver') {
                  window.location.href = 'https://illoon.cloud/oauth2/authorization/naver';
                } else {
                  setView('sns-signup');
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;