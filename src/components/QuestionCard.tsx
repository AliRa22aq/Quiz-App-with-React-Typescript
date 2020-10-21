import React from 'react';

type Props = {
    question: string;
    asnwer: string[];
    callback: any;
    userAnswer: string;
    QuestionNumber: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({}) => {
    return (
        <div>
            Questions
        </div>
    )
}
