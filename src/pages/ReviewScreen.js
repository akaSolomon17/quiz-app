import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Typography,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "./store/context";
import { resetState } from "../redux/actions";

const ReviewScreen = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { resetQuiz } = useContext(QuizContext);
  const { yourAnswers, correctAnswers, question } = useSelector(
    (state) => state
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < yourAnswers.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleExit = () => {
    nav("/");
    dispatch(resetState());
    resetQuiz();
  };

  return (
    <Container
      style={{
        backgroundColor: "#872657",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 10,
          width: 500,
          backgroundColor: "white",
          boxShadow: 20,
        }}
      >
        <CardHeader
          title={`Wrong answer of question ${currentQuestionIndex + 1}`}
          sx={{
            textAlign: "center",
            backgroundColor: "crimson",
            color: "white",
            padding: 2,
          }}
        />
        <CardContent>
          <Box mb={2}>
            <Typography variant="h5" mb={1} alignItems="center">
              Question: {question[currentQuestionIndex]}
            </Typography>
            <Typography variant="h6">
              Correct Answer: {correctAnswers[currentQuestionIndex]}
            </Typography>
            <Typography variant="h6" color="error">
              Your Answer: {yourAnswers[currentQuestionIndex]}
            </Typography>
          </Box>
        </CardContent>
        <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 100,
              marginRight: 1,
              color: "crimson",
              borderColor: "crimson",
              ":hover": {
                borderColor: "#E3256B",
              },
            }}
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === question.length - 1}
          >
            Next
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 100,
              color: "crimson",
              borderColor: "crimson",
              ":hover": {
                borderColor: "#E3256B",
              },
            }}
            onClick={handleExit}
          >
            Exit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ReviewScreen;
