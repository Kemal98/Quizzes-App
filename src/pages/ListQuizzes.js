import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeQuiz } from "../action/quizzesAction";
import Modale from "../components/AddQuiz";
import EditQuiz from "../components/EditQuiz";
import Header from "../components/Header";
const ListQuizzes = () => {
  const dispatch = useDispatch();

  const quizzes = useSelector((state) => state.quizzesReducer.quizzes);

  const [open, setOpen] = useState(false);

  const [newQuiz, setNewQuiz] = useState({});
  console.log(newQuiz);
  const quizClick = (id) => {
    const quizes = quizzes.find((qu) => qu.id === id);
    if (quizes) {
      setNewQuiz(quizes);
      setOpen(!open);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={3}
      sx={{ margin: "0 auto", maxWidth: "900px" }}
    >
      <Stack sx={{ margin: "0 auto" }}>
        <Header />
      </Stack>
      <Modale />
      <EditQuiz
        quiz={newQuiz}
        setNewQuiz={setNewQuiz}
        open={open}
        setOpen={setOpen}
      />
      {quizzes?.length ? (
        quizzes.map((quiz) => {
          return (
            <Paper elevation={3} sx={{ mt: "2rem" }}>
              <Box
                continer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => quizClick(quiz.id)}
              >
                <Stack p={3} sx={{ width: "100%" }}>
                  <Typography
                    sx={{ mb: "0px", fontSize: { sm: "1.3rem" } }}
                    variant={"subtitle1"}
                  >
                    {quiz.name}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  p={3}
                  sx={{
                    borderLeft: "1px solid #B5B5B4",
                  }}
                >
                  <Link to={`/quiz/${quiz.id}`}>
                    <RemoveRedEyeIcon />
                  </Link>
                  <DeleteIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => dispatch(removeQuiz(quiz.id))}
                  />
                </Stack>
              </Box>
            </Paper>
          );
        })
      ) : (
        <Stack
          height="60vh"
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h6" color="gray" textAlign={"center"}>
            There are currently no quizzes created !
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ListQuizzes;
