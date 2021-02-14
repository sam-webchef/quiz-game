import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { AnswerObj } from "../App";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: 30,
    display: "inline-flex",
  },
  content: {
    width: "100%",
  },

  question: {
    width: "100%",
    textAlign: "left",
    minHeight: 40,
    minWidth: 400,
  },
  answer: {
    width: "100%",
    margin: 5,
  },
});

type Props = {
  question: string;
  answers: string[];
  givenAnswer: AnswerObj | undefined;
  number: number;
  total: number;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Question: React.FC<Props> = ({
  question,
  answers,
  givenAnswer,
  number,
  total,
  handleOnClick,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h3>
          Question: {number} / {total}
        </h3>
        <p className={classes.question}>
          <span dangerouslySetInnerHTML={{ __html: question }} />
        </p>
        <div>
          {answers.map((answer) => (
            <div key={answer}>
              <Button
                className={classes.answer}
                style={
                  givenAnswer
                    ? givenAnswer.correctAnswer === answer
                      ? { borderColor: "green" }
                      : { borderColor: "red" }
                    : { borderColor: "grey" }
                }
                variant="outlined"
                color="default"
                disabled={!!givenAnswer}
                onClick={handleOnClick}
                value={answer}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
              <br />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Question;
