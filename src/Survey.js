import React from 'react';

const Survey = () => {
  return (
    <main className="flex-grow flex flex-col items-center pt-20 px-4 w-full">
      <div className="w-full max-w-[800px] flex flex-col items-center">
        
        {/* 캐릭터 및 프로그레스 바 영역 */}
        <div className="w-full relative flex flex-col mb-16">
          <div className="relative mb-2" style={{ left: '10%', width: 'fit-content', transform: 'translateX(-50%)' }}>
            <div className="bg-[#2094F3] text-white text-[10px] font-bold px-2 py-1 rounded-md absolute -top-8 left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#2094F3]">1/5</div>
            <img src="/hi.png" alt="설문 캐릭터" className="w-24" />
          </div>
          <div className="w-full h-3 bg-blue-50 rounded-full overflow-hidden">
            <div className="w-[20%] h-full bg-[#2094F3] rounded-full"></div>
          </div>
          <p className="w-full text-center text-[#2094F3] font-bold text-lg mt-8">맞춤 공고 추천을 위해 설문 조사를 할게요!</p>
        </div>

        {/* 질문 영역 */}
        <div className="w-full flex flex-col items-center space-y-8">
          <h3 className="text-lg font-bold text-gray-700">원하는 직무가 있으신가요?</h3>
          <div className="w-full max-w-[400px]">
            <input type="text" placeholder="예 : IT 기업에서 개발자로 일하고 싶어요" className="w-full p-4 border border-gray-200 rounded-lg outline-none text-center text-sm focus:border-blue-400 transition-all placeholder:text-gray-300" />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="w-full border-t border-gray-100 mt-32 pt-10 flex justify-center">
          <button className="w-full max-w-[320px] py-4 border border-gray-300 text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition-colors">다음</button>
        </div>
      </div>
    </main>
  );
};

export default Survey;