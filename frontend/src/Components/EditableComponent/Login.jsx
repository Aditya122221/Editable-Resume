import { useState } from 'react';
import styles from '../../CSS/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const Navigate = useNavigate()

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm();

		if (Object.keys(newErrors).length === 0) {
			const payload = {
				email: formData.email,
				password: formData.password
			}

			axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, payload).then((res) => {
				alert(res.data.message)
				
				if (res.status === 200) {
					localStorage.setItem("EditableResumeToken", res.data.token)
					localStorage.setItem("EditableReg", res.data.RegID)
					Navigate('/sresume')
				}
			}).catch((err) => {
				console.log("login error", err)
			})
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.loginCard}>
				<div className={styles.header}>
					<h1 className={styles.title}>Welcome Back</h1>
					<p className={styles.subtitle}>Please sign in to your account</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor="email" className={styles.label}>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
							placeholder="Enter your email"
						/>
						{errors.email && <span className={styles.error}>{errors.email}</span>}
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor="password" className={styles.label}>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
							placeholder="Enter your password"
						/>
						{errors.password && <span className={styles.error}>{errors.password}</span>}
					</div>

					<div className={styles.options}>
						<label className={styles.checkboxLabel}>
							<input type="checkbox" className={styles.checkbox} />
							Remember me
						</label>
						<a href="#" className={styles.forgotPassword}>
							Forgot password?
						</a>
					</div>

					<button type="submit" className={styles.submitButton}>
						Sign In
					</button>
				</form>

				<div className={styles.footer}>
					<p>Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link></p>
				</div>
			</div>
		</div>
	);
};

export default Login;