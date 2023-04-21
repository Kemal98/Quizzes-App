import { Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";

function QuizQuestion({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <>
      <Typography textAlign="center" color="#808080" variant="subtitle1">
        {question.question}
      </Typography>
      <Divider variant="middle" sx={{ mb: "10px" }} />
      <Stack
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        my={2}
      >
        <Button
          variant="outlined"
          sx={{ fontSize: "0.7rem", letterSpacing: "2px" }}
          onClick={handleShowAnswer}
        >
          {!showAnswer ? "Show Answer" : " Hide Answer"}
        </Button>
        <Typography
          sx={{
            fontSize: "0.93rem",
            color: "#808080",
            letterSpacing: "1px",
            textAlign: "center",
            mt: "10px",
            filter: !showAnswer && "blur(5px)",
          }}
        >
          Answer: {question.answer}
        </Typography>
      </Stack>
    </>
  );
}

export default QuizQuestion;
