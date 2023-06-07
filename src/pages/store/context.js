import React, { createContext, useState, useEffect } from "react";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const startQuiz = () => {
    setIsRunning(true);
  };

  const stopQuiz = () => {
    setIsRunning(false);
    setTotalTime(time);
  };

  const resetQuiz = () => {
    setIsRunning(false);
    setTime(0);
    setTotalTime(0);
  };

  const value = {
    isRunning,
    time,
    totalTime,
    startQuiz,
    stopQuiz,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };
