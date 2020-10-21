import React from 'react';
import { RefactorActionInfo } from 'typescript';
import { QuestionCard } from './components/QuestionCard';

function App() {

  const startQuiz = async() => {  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => { };
  const nextQuestion = () => { };

  return (
    <div className="App">
          <h1> React Quiz </h1>
          <button className="start" onClick={startQuiz}> Start </button>
          <p className="score"> Score:  </p>
          <p> Loading . . . </p>  
          <QuestionCard /> <br />
          <button className="next" onClick={nextQuestion} > Next </button>
    </div>
  );
}

export default App;
