import {
  CHANGE_SCORE,
  GET_YOUR_ANSWERS,
  GET_CORRECT_ANSWER,
  RESET_STATE,
  GET_QUESTION,
} from "./actionsTypes";

const initialState = {
  isRunning: false,
  time: 0,
  totalTime: 0,
  score: 0,
  yourAnswers: [],
  correctAnswers: [],
  question: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YOUR_ANSWERS:
      return {
        ...state,
        yourAnswers: [...state.yourAnswers, action.payload],
      };
    case GET_CORRECT_ANSWER:
      return {
        ...state,
        correctAnswers: [...state.correctAnswers, action.payload],
      };
    case GET_QUESTION:
      return {
        ...state,
        question: [...state.question, action.payload],
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default Reducer;
