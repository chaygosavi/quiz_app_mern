import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      let { question, answers } = action.payload;
      return {
        ...state,
        queue: question,
        answers,
      };
    },
    moveNextAction: (state) => ({
      ...state,
      trace: state.trace + 1,
    }),
    movePrevAction: (state) => ({
      ...state,
      trace: state.trace - 1,
    }),
    resetAllAction: () => ({
      queue: [],
      answers: [],
      trace: 0,
    }),
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
} = questionReducer.actions;

export default questionReducer.reducer;
