import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Difficulty, loadQuestions, QuestionState } from "./helpers/API";
// components
import Question from "./components/Question";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto",
    textAlign: "center",
    margin: "0 auto",
    paddingTop: 50,
    width: 500,
  },

  h1: {
    fontFamily: "Dancing Script",
    fontSize: 40,
    color: "#5e8bc9",
  },

  score: {
    padding: "10px 20px",
    backgroundColor: theme.palette.grey[200],
    borderRadius: 5,
    margin: "20px 0",
  },
}));

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const classes = useStyles();
  // state
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(true);

  /**
   * The function to load the next question
   */
  const loadNextQuestion = () => {
    // move to the next question except the last one
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setFinished(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  /**
   * The function to verify user's answer
   * @param e
   */
  const verifyAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!finished) {
      const answer = e.currentTarget.value;
      // check user's answer
      const isCorrect = questions[questionNumber].correct_answer === answer;

      // increase score if correct
      if (isCorrect) setScore((prev) => prev + 1);

      // save the answer in the user answers array
      const answerObj = {
        question: questions[questionNumber].question,
        answer,
        correct: isCorrect,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setGivenAnswers((prev) => [...prev, answerObj]);
    }
  };

  /**
   * The function to start the quiz
   */
  const startQuiz = async () => {
    setLoading(true);
    setFinished(false);

    try {
      const questions = await loadQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      setQuestions(questions);
      setScore(0);
      setGivenAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className={classes.h1}>Sam's quiz</h1>
          {!loading && (finished || givenAnswers.length === TOTAL_QUESTIONS) && (
            <Button variant="contained" color="primary" onClick={startQuiz}>
              Start
            </Button>
          )}
          {loading && <CircularProgress />}
          {!loading && !finished && (
            <Alert severity="info">Score: {score}</Alert>
          )}
          {!finished && !loading && (
            <Question
              number={questionNumber + 1}
              total={TOTAL_QUESTIONS}
              question={questions[questionNumber].question}
              answers={questions[questionNumber].answers}
              givenAnswer={
                givenAnswers ? givenAnswers[questionNumber] : undefined
              }
              handleOnClick={verifyAnswer}
            />
          )}
          {!finished &&
            !loading &&
            givenAnswers.length === questionNumber + 1 &&
            questionNumber !== TOTAL_QUESTIONS - 1 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={loadNextQuestion}
              >
                Next
              </Button>
            )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
