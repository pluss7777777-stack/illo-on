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
export default Survey;