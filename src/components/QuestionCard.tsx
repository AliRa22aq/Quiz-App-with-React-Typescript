import React from 'react';

type Props = {
    question: string;
    asnwer: string[];
    callback: any;
    userAnswer: string;
    questionNumber: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({question, asnwer, callback, userAnswer, questionNumber, totalQuestions}) => {
    return (
        <div>
            Questions
        </div>
    )
}
