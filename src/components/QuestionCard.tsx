import React from 'react';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';



type Props = {
    question: string;
    asnwers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({ question, asnwers, callback, userAnswer, questionNumber, totalQuestions }) => {
    return (
        <Wrapper>
            <p className="number"> Question : {questionNumber + 1} / {totalQuestions} </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {asnwers.map((answer) => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))
                }
            </div>

        </Wrapper>
    )
}