import React, { useState, useEffect } from 'react';
import { Wine, Activity, ArrowRight, ClipboardList, Stethoscope, Pill, QrCode, X, AlertTriangle } from 'lucide-react';

const SoulClinicApp = () => {
  const [step, setStep] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setCurrentUrl(url);
      setIsPreviewMode(false);
    } else {
      setCurrentUrl('https://example.com/soul-clinic-demo'); 
      setIsPreviewMode(true);
    }
  }, []);

  const questions = [
    {
      id: 1,
      type: 'EI',
      question: "終於熬到週五晚上，你現在電力剩 10%，你會選擇怎麼充電？",
      options: [
        { label: "A", text: "找三五好友去居酒屋喝一杯，大聊特聊發洩一下。", value: "E" },
        { label: "B", text: "誰都別吵我！回家洗澡、叫外送，窩在沙發追劇或打電動。", value: "I" }
      ]
    },
    {
      id: 2,
      type: 'SN',
      question: "當你在聽別人講八卦或敘述一件事情時，你通常更在意：",
      options: [
        { label: "A", text: "「然後呢？細節是什麼？誰說了什麼？」(想知道具體發生的事實過程)", value: "S" },
        { label: "B", text: "「所以這代表什麼？背後有什麼沒說的隱情？」(想知道事情的意義和關聯)", value: "N" }
      ]
    },
    {
      id: 3,
      type: 'TF',
      question: "朋友失戀了，哭著打電話給你，你的第一反應通常是：",
      options: [
        { label: "A", text: "先安撫他的情緒，跟著一起罵對方渣男/渣女，給他抱抱和支持。", value: "F" },
        { label: "B", text: "分析對方為什麼會分手，幫朋友釐清這段關係的問題點，避免下次重蹈覆轍。", value: "T" }
      ]
    },
    {
      id: 4,
      type: 'JP',
      question: "原定好的週末出遊計畫，突然下起大雨被打亂，你會：",
      options: [
        { label: "A", text: "感到焦慮或煩躁，急著趕快想出備案 B、C、D 來填補行程。", value: "J" },
        { label: "B", text: "沒差啦，那就睡飽一點，看心情隨便找個室內的地方晃晃，或乾脆不出門。", value: "P" }
      ]
    },
    {
      id: 5,
      type: 'SN',
      question: "如果這輩子只能選一種超能力，你會選：",
      options: [
        { label: "A", text: "過目不忘：能精準記住所有看過的書、數字、路徑和回憶細節。", value: "S" },
        { label: "B", text: "預知未來：能看見未來五年的趨勢，或洞察別人心裡在想什麼。", value: "N" }
      ]
    },
    {
      id: 6,
      type: 'TF',
      question: "在做一個重大決定（例如買房或換工作）時，最終讓你下定決心的是：",
      options: [
        { label: "A", text: "邏輯分析後的優缺點評估，哪個CP值最高、最合理。", value: "T" },
        { label: "B", text: "內心的直覺與感受，「我喜不喜歡」、「這裡給我的感覺對不對」。", value: "F" }
      ]
    },
    {
      id: 7,
      type: 'JP',
      question: "你的手機相簿或電腦桌面通常是：",
      options: [
        { label: "A", text: "即使有點亂，但我大概知道東西在哪；或是亂到我自己都放棄整理。", value: "P" },
        { label: "B", text: "有分類資料夾，定期會整理刪除，看到紅點通知沒消掉會覺得阿雜。", value: "J" }
      ]
    },
    {
      id: 8,
      type: 'SN',
      question: "終於收到網購的複雜櫃子（像是 IKEA），倒出一地零件後，你會：",
      options: [
        { label: "A", text: "先找說明書：確認螺絲有幾顆、板子編號對不對，按步驟 1-2-3 施工才安心。", value: "S" },
        { label: "B", text: "直接拿起來拚：看著封面成品圖大概就知道結構了，憑感覺先鎖再說，說明書是卡關時才看的東西。", value: "N" }
      ]
    },
    {
      id: 9,
      type: 'TF',
      question: "假設你和伴侶/好友吵架了，你覺得「講道理」重要嗎？",
      options: [
        { label: "A", text: "重要。如果不把誰對誰錯的邏輯釐清，下次還是會吵一樣的事。", value: "T" },
        { label: "B", text: "不重要。重要的是對方的感受有沒有被顧到，講贏了道理卻輸了感情沒意義。", value: "F" }
      ]
    },
    {
      id: 10,
      type: 'JP',
      question: "去一家沒去過的餐廳點餐時，你通常會：",
      options: [
        { label: "A", text: "猶豫很久，這也想吃那也想吃，最後可能問店員推薦或看隔壁桌吃什麼。", value: "P" },
        { label: "B", text: "快速掃描菜單，依照自己的習慣或預算，很快就決定好要吃什麼。", value: "J" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setStep('calculating');
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    setTimeout(() => {
      const sCount = (finalAnswers[2] === 'S' ? 1 : 0) + (finalAnswers[5] === 'S' ? 1 : 0) + (finalAnswers[8] === 'S' ? 1 : 0);
      const nCount = 3 - sCount;
      const mainType = sCount > nCount ? 'S' : 'N';

      let subType = '';
      let category = '';
      
      if (mainType === 'S') {
        const jCount = (finalAnswers[4] === 'J' ? 1 : 0) + (finalAnswers[7] === 'J' ? 1 : 0) + (finalAnswers[10] === 'J' ? 1 : 0);
        const pCount = 3 - jCount;
        subType = jCount > pCount ? 'J' : 'P';
        category = subType === 'J' ? 'SJ' : 'SP';
      } else {
        const tCount = (finalAnswers[3] === 'T' ? 1 : 0) + (finalAnswers[6] === 'T' ? 1 : 0) + (finalAnswers[9] === 'T' ? 1 : 0);
        const fCount = 3 - tCount;
        subType = tCount > fCount ? 'T' : 'F';
        category = subType === 'T' ? 'NT' : 'NF';
      }

      const energyType = finalAnswers[1];

      setResult({
        category,
        energyType,
        details: getResultDetails(category, energyType)
      });
      setStep('result');
    }, 2000);
  };

  const getResultDetails = (category, energyType) => {
    const db = {
      'SJ': {
        title: "SJ 守護者",
        drinkName: "SOP 快樂水",
        ingredients: "Rum Coke w/ Lemon Ice",
        traits: "你是辦公室的定海神針，熱愛 SOP，看到計畫趕不上變化會血壓升高。你堅信：「只有按照規矩來，世界才不會毀滅。」",
        mechanism: "這杯是調酒界的「公務員」。經典黃金比例、絕對不踩雷，加上慢慢融化的檸檬冰塊，給你滿滿的、可預測的「安全感」。",
        tags: ["秩序", "SOP控", "安全感"],
        color: "from-amber-600 to-yellow-800"
      },
      'SP': {
        title: "SP 探險家",
        drinkName: "薪水小偷的逆襲",
        ingredients: "Vodka Sprite w/ Pop Candy",
        traits: "靈魂拒絕無聊，大腦隨時在找刺激。你是天生的機會主義者，擅長在規則邊緣遊走，座右銘是：「人生苦短，先玩再說。」",
        mechanism: "你需要驚喜。透明無害的伏特加方便隱藏殺傷力，入口後跳跳糖瘋狂炸裂，正如同你看似乖巧，實則隨時準備搞大事。",
        tags: ["隨性", "驚喜", "極限操作"],
        color: "from-blue-400 to-cyan-500"
      },
      'NF': {
        title: "NF 外交官",
        drinkName: "暈船處方箋",
        ingredients: "Gin Cranberry w/ Sparkling Water",
        traits: "內建情緒雷達，內心戲豐富到可以寫三季影集。追求意義與連結，容易因為別人無心的一句話而「情感過敏」。",
        mechanism: "你需要層次。琴酒複雜的草本香氣對應你深邃的內心，酸甜蔓越莓詮釋了你對世界「又愛又受傷」的矛盾心情。",
        tags: ["共情", "層次", "內心戲"],
        color: "from-pink-500 to-rose-400"
      },
      'NT': {
        title: "NT 分析家",
        drinkName: "邏輯冷卻劑",
        ingredients: "Whisky Winter Melon Sour",
        traits: "你是行走的 CPU，擅長用邏輯手術刀解剖所有不合理的事物（包括老闆的決策）。你常因為別人的「低效率」或「邏輯死亡」而感到火氣很大。你的大腦 24 小時都在高速運轉，雖然你看起來冷靜，但核心溫度其實已經嚴重過熱 (Overheat)。",
        mechanism: "為什麼開這杯給你？因為你需要「降火氣」。冬瓜茶是古老的退火良方，專治你因為看到笨蛋而產生的肝火；檸檬酸尖銳得就像你的批判性思維，能瞬間切開甜膩的虛偽。最後搭配威士忌的厚重底蘊——這杯酒不跟你玩花俏的裝飾，它用最高的效率，讓你的大腦風扇停止運轉，強制進入待機模式。",
        tags: ["邏輯", "效率", "直球對決"],
        color: "from-indigo-600 to-slate-800"
      }
    };

    const advice = energyType === 'E' 
      ? "處方建議：飲用後請至吧台搭訕三位陌生人，釋放你的社交能量。" 
      : "處方建議：飲用後請找個燈光昏暗的角落窩著，靜靜觀察人類。";

    return { ...db[category], advice };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
        <header className="p-6 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 p-2 rounded-lg">
              <Wine size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-wider">靈魂特調診所</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowQR(true)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-full transition-colors"
              title="手機掃描"
            >
              <QrCode size={20} />
            </button>
            <div className="flex items-center gap-1 text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              營業中
            </div>
          </div>
        </header>

        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowQR(false)}>
            <div className="bg-white text-slate-900 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold mb-2 text-center">掃描掛號</h3>
              
              {isPreviewMode ? (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                   <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-1 justify-center">
                     <AlertTriangle size={16} />
                     預覽模式提示
                   </div>
                   <p className="text-xs text-amber-700 text-center leading-relaxed">
                     目前的網址為本機預覽（手機無法讀取）。<br/>
                     下方的 QR Code 僅為示意，指向範例網站。<br/>
                     <span className="font-bold">請將網站正式部署後，即可生成真實連結！</span>
                   </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center mb-6">
                  使用手機掃描下方 QR Code<br/>即可在手機上體驗診所服務
                </p>
              )}

              <div className="flex justify-center mb-4">
                <img src={qrCodeUrl} alt="Page QR Code" className="w-48 h-48 border-4 border-slate-100 rounded-lg" />
              </div>
              <p className="text-xs text-center text-slate-400 break-all px-2">
                {isPreviewMode ? "連結模擬中: example.com..." : currentUrl}
              </p>
            </div>
          </div>
        )}

        <main className="flex-1 flex flex-col p-6">
          
          {step === 'start' && (
            <div className="flex-1 flex flex-col justify-center animate-fade-in">
              <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-2xl mb-8 shadow-xl backdrop-blur-md">
                <div className="flex justify-center mb-4">
                  <Stethoscope size={48} className="text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-4 text-white">初診紀錄表</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                  <p className="border-l-4 border-rose-500 pl-4 italic">
                    「在進入診間之前，請深呼吸，暫時忘掉你的職稱、KPI 和老闆的臉。」
                  </p>
                  <p>
                    接下來的回答，請依照你 <strong className="text-rose-400">「天生原本的樣子」</strong> 或是 <strong className="text-rose-400">「週末放鬆時的狀態」</strong> 來選擇。
                  </p>
                  <p>
                    而不是那個在會議室裡即使想翻白眼卻還是微笑點頭的「職場人設」。這裡沒有標準答案，只有你最真實的靈魂渴望。
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setStep('quiz')}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                開始掛號 (Start)
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 'quiz' && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2 text-rose-500 text-sm font-bold tracking-widest uppercase">
                  Question {currentQuestion + 1} / {questions.length}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full text-left p-5 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800 hover:border-rose-500/50 transition-all active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          {option.label}
                        </span>
                        <span className="text-slate-200 text-sm md:text-base leading-relaxed">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'calculating' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-700 border-t-rose-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="text-rose-500 animate-pulse" size={24} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">正在掃描靈魂碎片...</h3>
                <p className="text-slate-400 text-sm">正在過濾掉社會化的雜質</p>
              </div>
            </div>
          )}

          {step === 'result' && result && (
            <div className="flex-1 flex flex-col animate-scale-in pb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                
                <div className={`h-2 w-full bg-gradient-to-r ${result.details.color}`}></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {result.details.title}
                      </span>
                      {result.details.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-slate-800/50 text-slate-400 border border-slate-700/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-sm text-slate-400 mb-1 tracking-widest uppercase">Prescription</div>
                    <h2 className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br ${result.details.color} mb-2 leading-tight`}>
                      {result.details.drinkName}
                    </h2>
                    <h3 className="text-lg text-white/80 font-mono border-b border-dashed border-slate-700 pb-4 inline-block">
                      {result.details.ingredients}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2 text-rose-400 text-sm font-bold uppercase tracking-wider">
                        <ClipboardList size={16} />
                        <span className="text-xs">病歷資料 (Traits)</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {result.details.traits}
                      </p>
                    </div>

                    <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2 text-blue-400 text-sm font-bold uppercase tracking-wider">
                        <Pill size={16} />
                        <span className="text-xs">藥理機制 (Mechanism)</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {result.details.mechanism}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 text-center italic">
                      * {result.details.advice}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-slate-800 p-4 bg-slate-950/30 flex justify-between items-center">
                   <div className="text-xs text-slate-500 font-mono">
                     RX-{Math.floor(Math.random() * 10000)}
                   </div>
                   <div className="text-xs text-slate-500 font-mono">
                     CLINIC {new Date().getFullYear()}
                   </div>
                </div>
              </div>

              <div className="mt-6">
                 <button 
                  onClick={() => {
                    const text = `我在靈魂特調診所的處方是：【${result.details.drinkName}】\n(${result.details.ingredients})\n\n病歷：${result.details.traits}\n\n👉 快來測測你的靈魂特調！`;
                    navigator.clipboard.writeText(text);
                    alert("處方籤已複製！");
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors border border-slate-700 shadow-lg flex items-center justify-center gap-2 group"
                >
                  分享處方 (Share)
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SoulClinicApp;
