import DoneIcon from "@mui/icons-material/Done";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion";

const ViewQuiz = () => {
  const params = useParams();
  const [quiz, setQuiz] = useState({});
  const { quizzes } = useSelector((state) => state.quizzesReducer);

  useEffect(() => {
    const quizFind = quizzes?.find((quiz) => quiz.id == params.id);
    console.log(quizFind);
    setQuiz(quizFind);
  }, []);

  const [showAnswer, setShowAnswer] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    maxWidth: "600px",
    left: "50%",
    minHeight: "200px",
    p: 2,
    width: {xs:"90%", sm:"70%"},
    transform: "translate(-50%, -50%)",
    bgcolor: "#ffffff96",
    boxShadow: 24,
  };

  return (
    <Box sx={style}>
      <Typography gutterBottom textAlign="center" color="#277fd5" variant="h5">
        {quiz.name}
      </Typography>
      <Box sx={{ my: 3, mx: 2, maxWidth: "600px" }}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="#808080"
            >
              Question
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="#808080"
            >
              {currentQuestionIndex + 1}
            </Typography>
          </Grid>
        </Grid>
        {quiz?.questions?.map((question, index) => (
          <div
            key={question.id}
            style={{
              display: index === currentQuestionIndex ? "block" : "none",
            }}
          >
            <QuizQuestion question={question} />
            <Stack alignItems={{ xs: "center", sm: "flex-end" }} display="flex">
              {index === quiz.questions.length - 1 ? (
                <Link to={`/`}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      color: "green",
                      borderColor: "green",
                    }}
                    endIcon={<DoneIcon />}
                  >
                    Finish Quiz
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ fontSize: "0.7rem" }}
                  onClick={handleNextQuestion}
                  endIcon={<NavigateNextIcon />}
                >
                  Next Question
                </Button>
              )}
            </Stack>
          </div>
        ))}{" "}
      </Box>
    </Box>
  );
};

export default ViewQuiz;
