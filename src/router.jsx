import { createBrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Tasks from "./components/task/Tasks"
import NotFound from "./components/NotFound"
import RestrictedRoute from "./components/auth/RestrictedRoute"

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
                <Home />
        ),
    },
    {
        path: "/login",
        element: (
            <RestrictedRoute>
                <Login />
            </RestrictedRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <RestrictedRoute>
            <Register />
        </RestrictedRoute>
        )

    },
    {
        path: "/tasks",
        element: (
            <ProtectedRoute>
                <Tasks />
            </ProtectedRoute>
        )
    },
    {
        path: "*",
        element: <NotFound />
    }
])