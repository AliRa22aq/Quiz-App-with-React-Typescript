import React from 'react';


type Props = {
    question: string;
    asnwers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({ question, asnwers, callback, userAnswer, questionNumber, totalQuestions }) => {
    console.log(userAnswer)
    return (
        <div>
            <p className="number"> Question : {questionNumber + 1} / {totalQuestions} </p> 
            <p dangerouslySetInnerHTML={{__html: question}} /> 
            <div> 
                {asnwers.map((answer) => (
                    <div key ={answer}>
                        <button disabled={userAnswer ? true:false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))
                }

            </div>

        </div>
    )
}