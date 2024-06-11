import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Login from "./routes/Login.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const isAuthenticated = () => {
    return false;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        element: <ProtectedRoute isAuthenticated={isAuthenticated()}/>,
        children: [
            {
                path: "dashboard",
                element: <Root />
            }
        ],
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
