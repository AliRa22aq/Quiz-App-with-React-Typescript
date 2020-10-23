import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuizQuestions, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import { Data } from './components/SelectData';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [totalQuestions, setTotalQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [catagory, setCatagory] = useState(9);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      totalQuestions,
      catagory,
      difficulty
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

    if (nextQuestion === totalQuestions) {
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

        <h1> Quiz </h1>

        {
          gameOver || userAnswers.length === totalQuestions ?
            (
              <div className="startData">
                Number of Questions
                <select  defaultValue={5} onChange={(e) => { setTotalQuestions(Number(e.target.value)) }}>
                  {Data.questions.map((v) => {
                    return (
                      <option value={v} > {v} </option>
                    )
                  })}
                </select>

                Category
                <select onChange={(e) => { setCatagory(Number(e.target.value)) }}>
                  {Object.entries(Data.category).map(([k, v]) => {
                    return (
                      <option value={v} > {k} </option>
                    )
                  })}
                </select>

                Difficulty
                <select onChange={(e) => { setDifficulty(e.target.value) }}>
                {Object.entries(Data.difficulty).map(([k, v]) => {
                    return (
                      <option value={v} > {k} </option>
                    )
                  })}
                </select>
              </div>
              ) :
            null
        }


        {
          gameOver ?
            (<button className="start" onClick={startQuiz}> Start </button>) :
            userAnswers.length === totalQuestions ?
            (<button className="start" onClick={startQuiz}> Restart </button>) :
            null
        }

        {
          !gameOver ? (<p className="score"> Score: {score} </p>) : null
        }

        {
          loading ? <p style={{color: "black", fontSize: "2rem"}}> Loading . . . </p> : null
        }

        {!loading && !gameOver && userAnswers.length !== totalQuestions && (

          <QuestionCard
            questionNumber={number}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            asnwers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}

          />)}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 && (
          <button className="next" onClick={nextQuestion} > Next </button>
        )}

        {
          userAnswers.length === totalQuestions ?
          <p style={{color: "black", fontSize: "2rem"}}> Result : {score} / {totalQuestions}  </p> :
          null
        }


      </Wrapper>
    </>
  );
}

export default App;
