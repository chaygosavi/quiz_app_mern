import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attemps_Number(result) {
  return result.filter((r) => r != undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((ele, i) => {
      return answers[i] === ele;
    })
    .filter((i) => i)
    .map((el) => point)
    .reduce((total, item) => (total += item), 0);
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints;
}

// Check user Auth

export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to={"/"} replace="true" />;
}

// get server data
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}

// post server data
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
