import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Quiz from "./pages/Quiz.tsx";
import Layout from "./pages/Layout.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {QuizProvider} from "./contexts/QuizContext.tsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Homepage/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/quiz",
                element: <Quiz/>,
            }
        ]
    }
])

function App() {
  return (
      <AuthProvider>
          <QuizProvider>
                <RouterProvider router={router} />
          </QuizProvider>
      </AuthProvider>
  );
}

export default App
