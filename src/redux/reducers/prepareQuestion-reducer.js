import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// /tests/${id}/getQuestionsNoPagination
const baseUrl = "http://localhost:8080";

const token = localStorage.getItem("auth-token");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Set content type to JSON
  },
};

export const getAllQuestionsThunk = createAsyncThunk(
  "/getQuestionsNoPagination",
  async (id) => {
    const responce = await fetch(
      `${baseUrl}/tests/${id}/getQuestionsNoPagination`,
      options
    );
    const data = responce.json();

    return data;
  }
);

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

  extraReducers: (builder) => {
    builder.addCase(getAllQuestionsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllQuestionsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
  },
});

export const { setAllQuestions, removeQuestion, addQuestions } =
  questionsState.actions;

export default questionsState.reducer;
