import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../client/src/styles/Result.css";
import {
  attemps_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import ResultTable from "./ResultTable";

const Result = () => {
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => console.log("attempts", attempts));
  useEffect(() => console.log("earnPoints", earnPoints));

  const totalPoints = queue.length * 10;
  const attempts = attemps_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed" : "Fail",
  });

  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };
  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Username</span>
          <span className="bold">{userId}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points</span>
          <span className="bold">50</span>
        </div>
        <div className="flex">
          <span>Total Questions</span>
          <span className="bold">5</span>
        </div>
        <div className="flex">
          <span>Total Attempts</span>
          <span className="bold">{attempts}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points</span>
          <span className="bold">{earnPoints}</span>
        </div>
        <div className="flex">
          <span>Quiz Result</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>
      <div className="start">
        <Link to={"/"} className="btn" onClick={onRestart}>
          Restart
        </Link>
      </div>
      <ResultTable />
    </div>
  );
};

export default Result;
