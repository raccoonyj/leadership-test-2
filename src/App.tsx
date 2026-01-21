import { useState } from 'react';
import './App.css';

// 타입 정의
type Indicator = 'H' | 'E' | 'A' | 'R' | 'T';
type ViewState = 'HOME' | 'QUIZ' | 'RESULT';

interface Option {
  text: string;
  type: Indicator;
}

interface Question {
  q: string;
  options: [Option, Option];
}

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<Indicator, number>>({
    H: 0, E: 0, A: 0, R: 0, T: 0
  });

  const questions: Question[] = [
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[정도] 나는 단기성과를 위해 꼼수를 부리지 않고 '정도' 영업(업무)를 지시한다.", type: "H" }, { text: "[변화,아이디어] 나는 시장을 선도하는 혁신적인 아이디어를 발굴한다.", type: "E" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[방향제시] 나는 목표 달성을 위해 적극적이고 구체적인 사례와 방향성을 제시한다.", type: "A" }, { text: "[존중] 나는 나의 의견과 구성원의 의견이 다를 때에도 무시하지 않고 경청한다.", type: "T" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[대외협력] 나는 타본부와의 신뢰관계를 바탕으로 원활한 협업을 이끌어낸다.", type: "T" }, { text: "[공정] 나는 직관이나 기분이 아닌 객관적인 기준에 따라 의사결정한다.", type: "H" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[경험,지식] 나는 업무관련 뛰어난 지식과 경험을 갖고 있다.", type: "E" }, { text: "[결단력] 나는 어려운 의사결정이 정체되지 않도록 적기에 결단하여 실행한다.", type: "A" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[인재육성] 나는 구성원들의 역량 향상을 위해 제도적, 교육적으로 지원한다.", type: "R" }, { text: "[신뢰] 나는 업무 과정에서 구성원들의 역량을 믿고 적절한 권한을 위임한다.", type: "T" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[결단력] 나는 어려운 의사결정이 정체되지 않도록 적기에 결단하여 실행한다.", type: "A" }, { text: "[정도] 나는 단기성과를 위해 꼼수를 부리지 않고 '정도' 영업(업무)를 지시한다.", type: "H" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[존중] 나는 나의 의견과 구성원의 의견이 다를 때에도 무시하지 않고 경청한다.", type: "R" }, { text: "[경험,지식] 나는 업무관련 뛰어난 지식과 경험을 갖고 있다.", type: "E" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[변화,아이디어] 나는 시장을 선도하는 혁신적인 아이디어를 발굴한다.", type: "E" }, { text: "[대외협력] 나는 타본부와의 신뢰관계를 바탕으로 원활한 협업을 이끌어낸다.", type: "T" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[공정] 나는 직관이나 기분이 아닌 객관적인 기준에 따라 의사결정한다.", type: "H" }, { text: "[인재육성] 나는 구성원들의 역량 향상을 위해 제도적, 교육적으로 지원한다.", type: "R" }] },
    { q: "다음 중 본부장/단장님의 평소 모습과 더 가까운 선택지를 골라주세요.", options: [{ text: "[신뢰] 나는 업무 과정에서 구성원들의 역량을 믿고 적절한 권한을 위임한다.", type: "T" }, { text: "[방향제시] 나는 목표 달성을 위해 적극적이고 구체적인 사례와 방향성을 제시한다.", type: "A" }] },
  ];

  const handleStart = () => {
    setView('QUIZ');
    setStep(0);
    setScores({ H: 0, E: 0, A: 0, R: 0, T: 0 });
  };

  const handleAnswer = (type: Indicator) => {
    // 1. 점수 즉시 반영
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));

    // 2. 부드러운 전환을 위해 지연 후 이동
    setTimeout(() => {
      setStep(prev => {
        if (prev < questions.length - 1) {
          return prev + 1;
        } else {
          setView('RESULT');
          return prev;
        }
      });
    }, 350);
  };

  const resetTest = () => {
    setView('HOME');
    setStep(0);
    setScores({ H: 0, E: 0, A: 0, R: 0, T: 0 });
  };

  return (
    <div className="App">
      {view === 'HOME' && (
        <div className="card start-card">
          <img src="/images/hdmf_logo.svg" alt="로고" className="intro-logo" />
          <h2>리더십 설문조사</h2>
          <p>본부장님/단장님께서 생각하시는 본인의 리더십은<br/>어떤 모습일까요?<br/>10개의 질문을 통해 알아보세요.</p>
          <button className="main-btn" onClick={handleStart}>테스트 시작하기</button>
        </div>
      )}

      {view === 'QUIZ' && questions[step] && (
        <div className="card" key={`question-${step}`}>
          <p className="progress">Q {step + 1} / {questions.length}</p>
          <h2 className="question-text">{questions[step].q}</h2>
          <div className="button-group">
            {questions[step].options.map((option, idx) => (
              <button key={`btn-${idx}`} onClick={() => handleAnswer(option.type)}>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'RESULT' && (
        <div className="card result-card">
          <h2 className="result-type">분석 완료!</h2>
          <p>아래 결과를 본부원이 한 리더십 설문 결과에 덧그려 주세요.</p>
          <div className="score-details">
            <p>정도(H): {scores.H}</p>
            <p>탁월(E): {scores.E}</p>
            <p>행동(A): {scores.A}</p>
            <p>존중(R): {scores.R}</p>
            <p>신뢰(T): {scores.T}</p>
          </div>
          <button className="retry-btn" onClick={resetTest}>다시 하기</button>
        </div>
      )}
    </div>
  );
}

export default App;