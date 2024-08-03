import { createSlice } from "@reduxjs/toolkit";

const questionsState = createSlice({
  name: "questionState",
  initialState: {
    value: [],
    isLoading: false,
  },
  reducers: {
    setAllQuestions: (state, action) => {
      state.value = action.payload;
    },
    removeQuestion: (state, action) => {
      state.value = state.value.filter(
        (item) => item.questionId != action.payload
      );
    },

    addQuestions: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { setAllQuestions, removeQuestion, addQuestions } =
  questionsState.actions;

export default questionsState.reducer;
