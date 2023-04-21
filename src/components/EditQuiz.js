import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, updateQuizAarchive } from "../action/quizzesAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%" },
  maxWidth: "800px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflowY: "scroll",
  maxHeight: "500px",
  p: 2,
};

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const EditQuiz = ({ quiz, open, setOpen, setNewQuiz }) => {
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleEdit = (id) => {
    setEditingQuestionId(id);
  };

  const dispatch = useDispatch();
  let { quizzesAarchive } = useSelector((state) => state.quizzesReducer);

  const [isFuncCalled, setIsFuncCalled] = useState(false);

  const handleSaveChanges = () => {
    setIsFuncCalled(true);

    const updatedQuestions = quiz.questions.map((question) => {
      if (question.id === editingQuestionId) {
        return {
          ...question,
          question: newQuestion,
          answer: newAnswer,
        };
      }
      return question;
    });
    const updatedQuizData = {
      ...quiz,
      questions: updatedQuestions,
    };
    setNewQuiz(updatedQuizData);
    dispatch(updateQuiz(updatedQuizData));

    // history quiz
    const updateArhivee = quizzesAarchive?.map((question) => {
      if (question.id === editingQuestionId) {
        return {
          ...question,
          question: newQuestion,
          answer: newAnswer,
        };
      }
      return question;
    });
    dispatch(updateQuizAarchive(updateArhivee));
    setNewQuestion("");
    setNewAnswer("");
    setEditingQuestionId("");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {quiz?.questions?.map((questionObj, index) => (
            <>
              {editingQuestionId === questionObj.id ? (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    color="#808080"
                  >
                    Question {index + 1}
                  </Typography>

                  <TextField
                    id="outlined-multiline-flexible"
                    label="Question"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}
                    type="text"
                    name="Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Answer"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}
                    type="text"
                    name="answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                  />
                  {!newQuestion || !newAnswer ? (
                    <Button
                      disabled
                      variant="outlined"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleSaveChanges}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  )}
                </Stack>
              ) : (
                <Grid item xs={12} md={6} sx={{ maxHeight: "300px" }}>
                  <Demo>
                    <List dense={false}>
                      <Typography
                        gutterBottom
                        variant="overline"
                        component="div"
                        color="#808080"
                      >
                        Question {index + 1}
                      </Typography>
                      <ListItem
                        sx={{ mb: "10px" }}
                        secondaryAction={
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="center"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            spacing={1}
                          >
                            <IconButton edge="end" aria-label="delete">
                              <EditIcon
                                color="primary"
                                onClick={() => {
                                  setNewAnswer(questionObj.answer);
                                  setNewQuestion(questionObj.question);
                                  handleEdit(questionObj.id);
                                }}
                              />
                            </IconButton>
                          </Stack>
                        }
                      >
                        <ListItemText
                          primary={`Question: ${questionObj.question}`}
                          secondary={`Answer: ${questionObj.answer}`}
                        />
                      </ListItem>
                      <Divider component="li" sx={{ mb: 1, width: "99%" }} />
                    </List>
                  </Demo>
                </Grid>
              )}
            </>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default EditQuiz;
