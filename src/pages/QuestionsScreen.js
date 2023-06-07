import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { decode } from "html-entities";

import useAxios from "../hooks/useAxios";
import {
  handleScoreChange,
  handleYourAnswer,
  handleAnswerCorrect,
  handleQuestion,
} from "../redux/actions";
import { QuizContext } from "./store/context";

// CSS Button MUI
const ButtonStyled = styled(Button)({
  textTransform: "none",
  borderRadius: 100,
  marginTop: 20,
  color: "crimson",
  borderColor: "crimson",
  ":hover": {
    borderColor: "#E3256B",
  },
});

// CSS Radio MUI
const StyledRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    width: "1.2em",
    height: "1.2em",
    marginRight: theme.spacing(1),
    color: "crimson",
    borderColor: "crimson",
    "&$checked": {
      color: "crimson",
    },
  },
}));

const getRandomMaxInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  let apiUrl = `/api.php?amount=10`;

  const { score } = useSelector((state) => state);
  const { stopQuiz } = useContext(QuizContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [numQuestion, setNumQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answer, setAnswer] = useState([]);

  const { response, error, loading } = useAxios({ url: apiUrl });

  useEffect(() => {
    if (response?.results?.length) {
      const question = response.results[numQuestion - 1];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomMaxInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setAnswer(answers);
    }
  }, [response, numQuestion]);

  //LOADING
  if (loading) {
    return (
      <Box
        textAlign="center"
        style={{
          backgroundColor: "#872657",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            justifyContent: "center",
            alignItems: "center",
            color: "crimson",
          }}
        />
      </Box>
    );
  }

  //ERROR
  if (error) {
    return (
      <Typography variant="h6" mt={50} color="red">
        Something went wrong!
      </Typography>
    );
  }

  const handleSubmit = () => {
    const question = response?.results[numQuestion - 1];
    dispatch(handleQuestion(decode(question.question)));
    if (selectedAnswer === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (question.incorrect_answers.includes(selectedAnswer)) {
      dispatch(handleAnswerCorrect(decode(question.correct_answer)));
      dispatch(handleYourAnswer(decode(selectedAnswer)));
    }

    if (numQuestion < response.results.length) {
      setSelectedAnswer("");
      setNumQuestion(numQuestion + 1);
    } else {
      navigate("/result");
      stopQuiz();
    }
  };

  function isRadioSelected() {
    return selectedAnswer !== undefined && selectedAnswer !== "";
  }

  const handleAnswerChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    setSelectedAnswer(e.target.value);
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
        textAlign="center"
        sx={{
          border: 1,
          borderRadius: 10,
          width: 500,
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          backgroundColor: "white",
          boxShadow: 20,
        }}
      >
        <Typography>Questions {numQuestion}/10</Typography>
        <Typography mt={5} mb={5}>
          {decode(response?.results[numQuestion - 1].question)}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {answer.map((option, id) => (
              <FormControlLabel
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "crimson",
                  marginBottom: 1,
                  width: "100%",
                  paddingLeft: 3,
                }}
                key={id}
                value={option}
                control={<StyledRadio size="medium" />}
                label={decode(option)}
              />
            ))}
          </RadioGroup>
          <ButtonStyled
            variant="outlined"
            onClick={handleSubmit}
            disabled={!isRadioSelected()}
          >
            {numQuestion === 10 ? "Result" : "Next Question"}
          </ButtonStyled>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Questions;
