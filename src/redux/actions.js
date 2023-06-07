import {
  CHANGE_SCORE,
  GET_YOUR_ANSWERS,
  GET_CORRECT_ANSWER,
  GET_QUESTION,
  RESET_STATE,
} from "./actionsTypes";

export const handleScoreChange = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});

export const handleYourAnswer = (answer) => ({
  type: GET_YOUR_ANSWERS,
  payload: answer,
});

export const handleAnswerCorrect = (answer) => ({
  type: GET_CORRECT_ANSWER,
  payload: answer,
});

export const handleQuestion = (question) => ({
  type: GET_QUESTION,
  payload: question,
});

export const resetState = () => ({
  type: RESET_STATE,
});
