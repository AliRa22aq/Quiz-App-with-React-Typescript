import {shufflArray} from './Utilities';


export type Question = {
    category: string;
    correct_answer:  string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answer: string[]};

// export enum Difficulty {
//     EASY = "easy",
//     MEDIUM = "medium",
//     HARD = "hard",
// }

//https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple

export const fetchQuizQuestions = async (amount: number, catagory: number, difficulty: string) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${catagory}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
            ...question,
            answer: shufflArray([...question.incorrect_answers, question.correct_answer,])
        }))
    
} 

