import Login from "./Components/EditableComponent/Login";
import ProfilePage from "./Components/EditableComponent/Profile";
import Signup from "./Components/EditableComponent/Signup";
import SpecializedResume from "./SpecializedResume";
import Projects from "./Components/EditableComponent/Projects";
import Certificate from "./Components/EditableComponent/Certificate";
import SkillsSection from "./Components/EditableComponent/SkillSection";
import EducationSection from "./Components/EditableComponent/Education";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./AuthRoute";
import GeneralResume from "./GeneralResume";
import Internship from "./Components/EditableComponent/Internship";
import AboutUs from "./Components/AboutUs";
import LandingPage from "./LandingPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Landing page - accessible to all */}
				<Route
					path="/"
					element={<LandingPage />}
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
					path="/about"
					element={<AboutUs />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
