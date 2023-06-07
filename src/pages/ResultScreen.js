import React, { useContext } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import rewardIcon from "../assets/reward.png";
import replayIcon from "../assets/replay.png";
import { QuizContext } from "./store/context";
import { resetState } from "../redux/actions";

const ButtonStyled = styled(Button)({
  textTransform: "none",
  borderRadius: 100,
  marginTop: 10,
  marginRight: 20,
  color: "crimson",
  borderColor: "crimson",
  ":hover": {
    borderColor: "#E3256B",
  },
});

const ResultScreen = () => {
  const { time, resetQuiz } = useContext(QuizContext);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { score } = useSelector((state) => state);

  const handleChangeReview = () => {
    nav("/review");
  };

  const handleChangeReplay = () => {
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
        <img
          style={{ maxWidth: "25%", maxHeight: "25%", marginBottom: 5 }}
          src={score >= 5 ? rewardIcon : replayIcon}
        ></img>
        <Typography variant="h4">
          {score >= 7 ? "Congratulation!!" : "Goodluck next time!"}
        </Typography>
        <Typography mt={1}>
          {score >= 7 ? "You're amazing!!!" : "Better luck next time!"}
        </Typography>
        <Typography mt={2}>
          {score}/10 correct answer in {time} seconds.
        </Typography>
        <ButtonStyled variant="outlined" onClick={handleChangeReplay}>
          Replay
        </ButtonStyled>
        <ButtonStyled variant="outlined" onClick={handleChangeReview}>
          Review
        </ButtonStyled>
      </Box>
    </Container>
  );
};

export default ResultScreen;
