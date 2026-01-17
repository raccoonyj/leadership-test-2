import { useState } from 'react';
import './App.css';

type Indicator = 'H' | 'E' | 'A' | 'R' | 'T';
// 화면 상태를 정의합니다: 'HOME' (시작), 'QUIZ' (진행), 'RESULT' (결과)
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
  const [view, setView] = useState<ViewState>('HOME'); // 현재 화면 상태
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<Indicator, number>>({
    H: 0, E: 0, A: 0, R: 0, T: 0
  });

  const questions: Question[] = [
    { // 1번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[정도] 나는 단기성과를 위해 꼼수를 부리지 않고 '정도' 영업(업무)를 지시한다.", type: "H" },
        { text: "[문제해결] 나는 어려운 문제가 생겼을 때 최선의 해결책을 제시한다.", type: "E" }
      ]
    },
    { // 2번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[방향제시] 나는 목표 달성을 위해 적극적이고 구체적인 사례와 방향성을 제시한다.", type: "A" },
        { text: "[존중] 나는 나의 의견과 구성원의 의견이 다를 때에도 무시하지 않고 경청한다.", type: "T" }
      ]
    },
    { // 3번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[대내협력] 나는 실무자 간의 갈등 발생 시 적극적으로 중재한다.", type: "T" },
        { text: "[공정] 나는 직관이나 기분이 아닌 객관적인 기준에 따라 의사결정한다.", type: "H" }
      ]
    },
    { // 4번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[경험,지식] 나는 업무관련 뛰어난 지식과 경험을 갖고 있다.", type: "E" },
        { text: "[일정관리] 나는 철저한 일정 관리를 통해 결과물을 완성한다.", type: "A" }
      ]
    },
    { // 5번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[인재육성] 나는 구성원들의 역량 향상을 위해 정기적으로 면담을 진행한다.", type: "R" },
        { text: "[대외협력] 나는 타부서와 신뢰관계를 바탕으로 원활한 협업을 이끌어낸다.", type: "T" }
      ]
    },
    { // 6번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[일정관리] 나는 철저한 일정 관리를 통해 결과물을 완성한다.", type: "A" },
        { text: "[정도] 나는 단기성과를 위해 꼼수를 부리지 않고 '정도' 영업(업무)를 지시한다.", type: "H" }
      ]
    },
    { // 7번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[존중] 나는 나의 의견과 구성원의 의견이 다를 때에도 무시하지 않고 경청한다.", type: "R" },
        { text: "[경험,지식] 나는 업무관련 뛰어난 지식과 경험을 갖고 있다.", type: "E" }
      ]
    },
    { // 8번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[문제해결] 나는 어려운 문제가 생겼을 때 최선의 해결책을 제시한다.", type: "E" },
        { text: "[대내협력] 실무자 간의 갈등 발생 시 적극적으로 중재한다.", type: "T" }
      ]
    },
    { // 3번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[공정] 나는 직관이나 기분이 아닌 객관적인 기준에 따라 의사결정한다.", type: "H" },
        { text: "[인재육성] 나는 구성원들의 역량 향상을 위해 정기적으로 면담을 진행한다.", type: "R" }
      ]
    },
    { // 3번 문제
      q: "다음 중 부장님의 평소 모습과 더 가까운 선택지를 골라주세요.",
      options: [
        { text: "[대외협력] 나는 타부서와 신뢰관계를 바탕으로 원활한 협업을 이끌어낸다.", type: "T" },
        { text: "[방향제시] 나는 목표 달성을 위해 적극적이고 구체적인 사례와 방향성을 제시한다.", type: "A" }
      ]
    },
  ];

  const handleStart = () => {
    setView('QUIZ');
  };
// App.tsx 내의 handleAnswer 함수

// App.tsx

const handleAnswer = (type: Indicator) => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  // 0.2초(200)에서 0.35초(350)로 늘려보세요. 
  // 이 시간이 길어질수록 '깜빡'임이 줄어들고 리드미컬하게 변합니다.
  setTimeout(() => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setView('RESULT');
    }
  }, 350); 
};

  return (
    <div className="App">
      {/* 1. 시작 화면 */}
      {view === 'HOME' && (
        <div className="card start-card">
          <h1>리더십 설문조사</h1>
          <p>부장님께서 생각하시는 본인의 리더십은 어떤 모습일까요?<br/>10개의 질문을 통해 알아보세요.</p>
          <button className="main-btn" onClick={handleStart}>테스트 시작하기</button>
        </div>
      )}

      {/* 2. 질문 화면 */}
{view === 'QUIZ' && (
  <div className="card" key={`step-${step}`}> {/* 질문 번호를 key로 주어 카드 전체를 새로 고침 */}
    <p className="progress">Q {step + 1} / {questions.length}</p>
    <h2 className="question-text">{questions[step].q}</h2>
    <div className="button-group">
      {questions[step].options.map((option, idx) => (
        <button 
          key={`btn-${step}-${idx}`} // 질문 번호를 포함한 유니크한 key
          onClick={() => handleAnswer(option.type)}
        >
          {option.text}
        </button>
      ))}
    </div>
  </div>
)}

      {/* 3. 결과 화면 */}
      {view === 'RESULT' && (
        <div className="card result-card">
          <h2 className="result-type">분석 완료!</h2>
          <p>아래 결과를 부서원이 한 리더십 설문 결과에 덧그려 주세요.</p>
          <div className="score-details">
            <h2>H:  {scores.H} <br/>
            E: {scores.E} <br/>A: {scores.A} <br/>R: {scores.R} <br/>T: {scores.T}<br/></h2>
          </div>
          <button className="retry-btn" onClick={() => window.location.reload()}>다시 하기</button>
        </div>
      )}
    </div>
  );
}

export default App;