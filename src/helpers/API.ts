import Question from "../components/Question";
import { randomizeArray } from "./utils";

export enum Difficulty {
  "EASY" = "easy",
  "MEDIUM" = "medium",
  "HARD" = "hard",
}

export type QuestionObj = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = QuestionObj & { answers: string[] };

export const loadQuestions = async (amount: number, difficulty: Difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(url)).json();
  return data.results.map((question: QuestionObj) => ({
    ...question,
    answers: randomizeArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }));
};
