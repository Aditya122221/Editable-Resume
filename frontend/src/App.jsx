import Login from "./Components/EditableComponent/Login";
import ForgotPassword from "./Components/EditableComponent/ForgotPassword";
import ResetPassword from "./Components/EditableComponent/ResetPassword";
import ProfilePage from "./Components/EditableComponent/Profile";
import Signup from "./Components/EditableComponent/Signup";
import SpecializedResume from "./SpecializedResume";
import Projects from "./Components/EditableComponent/Projects";
import Certificate from "./Components/EditableComponent/Certificate";
import SkillsSection from "./Components/EditableComponent/SkillSection";
import EducationSection from "./Components/EditableComponent/Education";
import Achievements from "./Components/EditableComponent/Achievements";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./AuthRoute";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import GeneralResume from "./GeneralResume";
import Internship from "./Components/EditableComponent/Internship";
import AboutUs from "./Components/AboutUs";
import LandingPage from "./LandingPage";

// Component to handle landing page with authentication check
const LandingPageWithAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem("EditableResumeToken");
		setIsLoggedIn(!!token);
		setIsLoading(false);
	}, []);

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				fontSize: '18px'
			}}>
				Loading...
			</div>
		);
	}

	// If logged in, redirect to profile page
	if (isLoggedIn) {
		return <Navigate to="/profile" replace />;
	}

	// If not logged in, show landing page
	return <LandingPage />;
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Landing page - redirects logged-in users to profile */}
				<Route
					path="/"
					element={<LandingPageWithAuth />}
				/>
				{/* Public routes (blocked if logged in) */}
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<PublicRoute>
							<Signup />
						</PublicRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<PublicRoute>
							<ForgotPassword />
						</PublicRoute>
					}
				/>
				<Route
					path="/reset-password"
					element={
						<PublicRoute>
							<ResetPassword />
						</PublicRoute>
					}
				/>

				{/* Protected routes (require login) */}
				<Route
					path="/sresume"
					element={
						<ProtectedRoute>
							<SpecializedResume />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/gresume"
					element={
						<ProtectedRoute>
							<GeneralResume />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/projects"
					element={
						<ProtectedRoute>
							<Projects />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/certificate"
					element={
						<ProtectedRoute>
							<Certificate />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/skill"
					element={
						<ProtectedRoute>
							<SkillsSection />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/education"
					element={
						<ProtectedRoute>
							<EducationSection />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/internship"
					element={
						<ProtectedRoute>
							<Internship />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/achievements"
					element={
						<ProtectedRoute>
							<Achievements />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/about"
					element={<AboutUs />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
