import React, {useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuestionState } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;

}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    console.log(newQuestion)

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
};



  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => { 

    if (!gameOver) {
      const answer = e.currentTarget.value
      console.log(answer)

      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prv => prv + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject])
    }


  };



  const nextQuestion = () => { };
  
  
  return (
    <div className="App">
          <h1> React Quiz </h1>
          {
            gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
            (<button className="start" onClick={startQuiz}> Start </button>) :
            null
          }
          
          {
            !gameOver ?( <p className="score"> Score: {score} </p>) : null 
          }
          
          {
            loading ? <p> Loading . . . </p>  : null
          }

          {!loading && !gameOver && (
          
          <QuestionCard 
          questionNumber={number}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          asnwers = {questions[number].answer}
          userAnswer = {userAnswers ? userAnswers : undefined}
          callback = {checkAnswer}

          /> )} <br />

          {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion} > Next </button>
          )}
  
  
    </div>
  );
}

export default App;
