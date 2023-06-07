import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import QuizLogo from "../assets/quiz-logo.png";
import { QuizContext } from "./store/context";
import { useDispatch } from "react-redux";

import { handleScoreChange } from "../redux/actions";

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

const MainScreen = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { resetQuiz, startQuiz } = useContext(QuizContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log();
    resetQuiz();
    dispatch(handleScoreChange(0));
    startQuiz();
    nav("/questions");
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
          boxShadow: "20px 20px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img style={{ maxWidth: "40%", maxHeight: "40%" }} src={QuizLogo}></img>
        <Typography variant="h2">Quiz App</Typography>
        <ButtonStyled size="medium" variant="outlined" onClick={handleClick}>
          Start Quiz!
        </ButtonStyled>
      </Box>
    </Container>
  );
};

export default MainScreen;
