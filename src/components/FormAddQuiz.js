import { Button, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadQuiz, uploadQuizAarchive } from "../action/quizzesAction";

const FormAddQuiz = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const archiveEmpty = ["There is no history quiz"];
  let archiveQuiz = useSelector(
    (state) => state.quizzesReducer.quizzesAarchive
  );

  const id = Math.floor(Math.random() * 1000);
  const [formData, setFormData] = useState({
    id: Number,
    name: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (question === "There is no history quiz") {
       setQuestion("")
    }
    setCurrentQuestion((prevState) => ({
      ...prevState,
      id: id,
      question: question,
      answer: answer,
    }));
  }, [question, answer]);

  const handleSubmitQuestion = (event) => {
    event.preventDefault();

    if (!question || !answer || !formData.name) {
      setError(true);
    } else {
      setFormData({
        ...formData,
        id: id,
        questions: [...formData.questions, currentQuestion],
      });
      setQuestion("");
      setAnswer("");

      const duplicateArhive = archiveQuiz.find((a) => a.question === question);

      if (!duplicateArhive) {
        dispatch(uploadQuizAarchive(currentQuestion));
      }
      setCurrentQuestion({ question: "", answer: "" });
    }
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    dispatch(uploadQuiz(formData));
    setFormData({ name: "", questions: [] });
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmitQuestion}>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <TextField
            id="outlined-multiline-flexible"
            label="Name quiz"
            multiline
            sx={{ width: "100%" }}
            maxRows={4}
            type="text"
            name="Name quiz"
            value={formData.name}
            onChange={(event) =>
              setFormData({
                ...formData,
                name: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            sx={{ width: "100%" }}
            onInputChange={(event, newInputValue) => {
              setQuestion(newInputValue);
            }}
            inputValue={question}
            options={
              archiveQuiz.length
                ? archiveQuiz?.map((option) => option.question)
                : archiveEmpty
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Question"
                name="question"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Answer"
            multiline
            maxRows={4}
            sx={{ width: "100%" }}
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={6}>
            {!question || !answer || !formData.name ? (
              <Button
                variant="contained"
                color="primary"
                disabled
                fullWidth
                sx={{ fontSize: "0.7rem" }}
              >
                Add a question
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ fontSize: "0.7rem" }}
                fullWidth
              >
                Add a question
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            {formData.questions <= 1 || !formData.name ? (
              <Button
                variant="contained"
                color="primary"
                disabled
                sx={{ fontSize: "0.7rem", height: "100%" }}
                fullWidth
              >
                Save quiz
              </Button>
            ) : (
              <Button
                onClick={handleSubmitQuiz}
                variant="contained"
                color="primary"
                sx={{ fontSize: "0.7rem", height: "100%" }}
                fullWidth
              >
                Save quiz
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormAddQuiz;
