import { useState } from 'react';
import styles from '../../CSS/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
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
                fName: formData.firstName,
                lName: formData.lastName,
                email: formData.email,
                password: formData.password
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, payload).then((res) => {
                if (res.status === 200) {
                    alert(res.data.message)
                    Navigate('/')
                } else {
                    alert(res.data.message)
                }
            }).catch((err) => {
                console.log("signup error", err)
            })
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupCard}>
                <h1 className={styles.title}>Create Your Account</h1>
                <p className={styles.subtitle}>Join us today and get started</p>

                <div className={styles.form}>
                    <div className={styles.nameGroup}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName" className={styles.label}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <span className={styles.errorText}>{errors.firstName}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName" className={styles.label}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <span className={styles.errorText}>{errors.lastName}</span>
                            )}
                        </div>
                    </div>

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
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <span className={styles.errorText}>{errors.email}</span>
                        )}
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
                            placeholder="Create a password (min. 6 characters)"
                        />
                        {errors.password && (
                            <span className={styles.errorText}>{errors.password}</span>
                        )}
                    </div>

                    <button type="button" onClick={handleSubmit} className={styles.submitButton}>
                        Create Account
                    </button>
                </div>

                <p className={styles.loginLink}>
                    Already have an account? <Link to="/" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;