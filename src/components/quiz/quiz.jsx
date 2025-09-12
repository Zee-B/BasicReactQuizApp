import React, { useRef, useState } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

// Component (your quiz app)
const quiz = () => {
  // keep track of which question we're on
  let [index, setIndex] = useState(0);

  // store the current question itself (from data array)
  let [question, setQuestion] = useState(data[index]);

  // lock = makes sure once an answer is picked, you can’t pick again
  let [lock, setLock] = useState(false);

  // user score
  let [score, setScore] = useState(0);

  // result = if quiz is finished or not
  let [result, setResult] = useState(false);

  // refs to directly control each <li> (answer option)
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  // easier to handle options as an array
  let option_array = [Option1, Option2, Option3, Option4];

  // when user clicks an answer
  const checkAns = (e, ans) => {
    // only allow clicking if not locked yet
    if (lock === false) {
      // ✅ if user picked correct answer
      if (question.ans === ans) {
        e.target.classList.add("correct"); // turn green
        setLock(true); // lock question
        setScore((prev) => prev + 1); // +1 to score
      }
      // ❌ if user picked wrong answer
      else {
        e.target.classList.add("wrong"); // turn red
        setLock(true); // lock question
        // highlight the real correct answer in green
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  // move to next question
  const next = () => {
    if (lock === true) {
      // only if current is locked
      if (index === data.length - 1) {
        // if last question → show result
        setResult(true);
        return 0;
      }
      // go to next question
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);

      // remove old styles (reset colors)
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  // reset quiz back to start
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {/* If finished show result, else show questions */}
      {result ? (
        <></>
      ) : (
        <>
          {/* Show question */}
          <h2>
            {index + 1}. {question.question}
          </h2>

          {/* Show 4 answer options */}
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          {/* Next question button */}
          <button onClick={next}>NEXT</button>

          {/* Show progress e.g. 2 of 5 Questions */}
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}

      {/* When finished, show score + reset button */}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          {/* Conditional message */}
          {score === data.length ? (
            <p>🎉 Perfect Score! You nailed it!</p>
          ) : score >= data.length / 2 ? (
            <p>👍 Good job! You passed, but you can do even better.</p>
          ) : (
            <p>😢 Keep practicing, this is terrible!</p>
          )}
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}

      {/* 👇 Footer Section */}
      <footer>Made with ❤️ + React by Zeesar</footer>
    </div>
  );
};

export default quiz;
