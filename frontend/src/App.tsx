import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Quiz from "./pages/Quiz.tsx";
import Layout from "./pages/Layout.tsx";

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
  return <RouterProvider router={router} />
}

export default App
