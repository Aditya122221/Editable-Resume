import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("EditableResumeToken");
    return isLoggedIn ? children : <Navigate to="/" replace />;
};

// For routes that should be blocked if user is logged in
export const PublicRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("EditableResumeToken");
    return isLoggedIn ? <Navigate to="/profile" replace /> : children;
};
