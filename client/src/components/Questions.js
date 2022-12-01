import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/FetchQuestions";
import { updateResult } from "../hooks/setResult";
import { updateResultAction } from "../redux/result_reducer";

const Questions = ({ onChecked }) => {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  const dispatch = useDispatch();
  useEffect(() => {}, [checked]);

  const onSelect = (i) => {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  };

  if (isLoading) return <h4 className="text-light">isLoading</h4>;
  if (serverError)
    return <h4 className="text-light">{serverError || "Unknown Error"}</h4>;

  return (
    <div className="questions">
      <h2 className="text-light">
        {questions?.question}
        <ul key={questions?.id}>
          {questions?.options.map((q, i) => (
            <li key={i}>
              <input
                type="radio"
                name="options"
                id={`q${i}-option`}
                value={false}
                onChange={() => onSelect(i)}
              />
              <label htmlFor={`q${i}-option`} className="text-primary">
                {q}
              </label>
              <div
                className={`check ${result[trace] === i ? "checked" : ""}`}
              ></div>
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
};

export default Questions;
