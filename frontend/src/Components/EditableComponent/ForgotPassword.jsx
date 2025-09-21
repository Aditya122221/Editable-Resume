import { useState } from 'react';
import styles from '../../CSS/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [resetLink, setResetLink] = useState('');
    const Navigate = useNavigate();

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
            setResetLink('');
        }
    };

    const validateForm = () => {
        if (!formData.email) {
            setError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Email is invalid');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        const payload = {
            email: formData.email
        };

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/forgot-password`, payload)
            .then((res) => {
                if (res.data.resetLink) {
                    // Show the reset link directly
                    setMessage(`${res.data.message}\n\n⏰ Expires: ${new Date(res.data.expiresAt).toLocaleString()}\n\nClick the link below to reset your password.`);
                    setResetLink(res.data.resetLink);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log("forgot password error", err);
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(resetLink).then(() => {
            alert('Reset link copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy link. Please copy manually.');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Forgot Password</h1>
                    <p className={styles.subtitle}>Enter your email address and we'll send you a reset link</p>
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
                            className={`${styles.input} ${error ? styles.inputError : ''}`}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                        {error && <span className={styles.error}>{error}</span>}
                        {message && <div className={styles.success} style={{ whiteSpace: 'pre-line' }}>{message}</div>}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Generating...' : 'Generate Reset Link'}
                    </button>
                </form>

                {resetLink && (
                    <div className={styles.resetLinkContainer}>
                        <div className={styles.resetLinkBox}>
                            <h3>🔗 Your Reset Link:</h3>
                            <div className={styles.linkDisplay}>
                                <a
                                    href={resetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.resetLink}
                                >
                                    {resetLink}
                                </a>
                                <button
                                    onClick={copyToClipboard}
                                    className={styles.copyButton}
                                >
                                    📋 Copy
                                </button>
                            </div>
                            <p className={styles.linkNote}>
                                Click the link above or copy it to reset your password
                            </p>
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <p>Remember your password? <Link to="/login" className={styles.signupLink}>Sign in</Link></p>
                    <p>Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
