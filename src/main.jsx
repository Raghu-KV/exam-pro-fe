import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./redux/store/strore.js";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students";
import ExamTypes from "./pages/ExamTypes";
import TestTypes from "./pages/TestTypes";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";
import Subjects from "./pages/Subjects.jsx";
import Chapters from "./pages/Chapters.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/auth",
    element: <App />,
    children: [
      {
        path: "",
        element: <h1>Login</h1>,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "exam-types",
        element: <ExamTypes />,
      },
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "chapters",
        element: <Chapters />,
      },
      {
        path: "test-types",
        element: <TestTypes />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
