import { useState, useEffect } from 'react';
import styles from '../../CSS/Login.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const Navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Invalid reset link. Please request a new password reset.');
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear messages when user starts typing
        if (error || message) {
            setError('');
            setMessage('');
        }
    };

    const validateForm = () => {
        if (!formData.newPassword) {
            setError('New password is required');
            return false;
        } else if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (!formData.confirmPassword) {
            setError('Please confirm your password');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const token = searchParams.get('token');
        if (!token) {
            setError('Invalid reset link. Please request a new password reset.');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        const payload = {
            token: token,
            newPassword: formData.newPassword
        };

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/reset-password`, payload)
            .then((res) => {
                setMessage(res.data.message);
                // Redirect to login after successful reset
                setTimeout(() => {
                    Navigate('/login');
                }, 2000);
            })
            .catch((err) => {
                console.log("reset password error", err);
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Reset Password</h1>
                    <p className={styles.subtitle}>Enter your new password</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword" className={styles.label}>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={`${styles.input} ${error ? styles.inputError : ''}`}
                            placeholder="Enter new password"
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`${styles.input} ${error ? styles.inputError : ''}`}
                            placeholder="Confirm new password"
                            disabled={isLoading}
                        />
                        {error && <span className={styles.error}>{error}</span>}
                        {message && <span className={styles.success}>{message}</span>}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading || !searchParams.get('token')}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Remember your password? <Link to="/login" className={styles.signupLink}>Sign in</Link></p>
                    <p>Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
