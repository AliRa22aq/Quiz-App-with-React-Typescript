import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper} from './App.styles';

export type AnswerObject = {
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

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore(prv => prv + 1);
      }
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, AnswerObject])
    }

  };


  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  };


  return (
    <>
      <GlobalStyle />

      <Wrapper>

        <h1> React Quiz </h1>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ?
            (<button className="start" onClick={startQuiz}> Start </button>) :
            null
        }

        {
          !gameOver ? (<p className="score"> Score: {score} </p>) : null
        }

        {
          loading ? <p> Loading . . . </p> : null
        }

        {!loading && !gameOver && (

          <QuestionCard
            questionNumber={number}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            asnwers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}

            />)}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion} > Next </button>
        )}

      </Wrapper>
    </>
  );
}

export default App;
