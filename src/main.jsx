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
import AddStudent from "./pages/AddStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import AddExamType from "./pages/AddExamType.jsx";
import EditExamType from "./pages/EditExamType.jsx";
import AddSubject from "./pages/AddSubject.jsx";
import EditSubject from "./pages/EditSubject.jsx";
import AddChapter from "./pages/AddChapter.jsx";
import EditChapter from "./pages/EditChapter.jsx";

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
      // STUDENT PAGES
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/add-student",
        element: <AddStudent />,
      },
      {
        path: "students/edit/:id",
        element: <EditStudent />,
      },
      // EXAM TYPES
      {
        path: "exam-types",
        element: <ExamTypes />,
      },
      {
        path: "exam-types/add-exam-type",
        element: <AddExamType />,
      },
      {
        path: "exam-types/edit/:id",
        element: <EditExamType />,
      },
      // SUBJECTS
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "subjects/add-subject",
        element: <AddSubject />,
      },
      {
        path: "subjects/edit/:id",
        element: <EditSubject />,
      },
      // CHAPTER
      {
        path: "chapters",
        element: <Chapters />,
      },
      {
        path: "chapters/add-chapter",
        element: <AddChapter />,
      },
      {
        path: "chapters/edit/:id",
        element: <EditChapter />,
      },
      // TEST TYPES
      {
        path: "test-types",
        element: <TestTypes />,
      },
      // QUESTIONS
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
