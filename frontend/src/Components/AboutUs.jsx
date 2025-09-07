import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, User, Calendar, Download, Send, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import styles from '../CSS/AboutUs.module.css';
import ProfileImage from '../assets/profileImage.png';
import Navbar from '../Navbar';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Personal details - replace with your actual information
    const personalDetails = {
        name: "Aditya Kumar",
        email: "adityakumar122221@gmail.com",
        linkedin: "https://www.linkedin.com/in/aditya122221",
        github: "https://github.com/Aditya122221",
        profilePhoto: ProfileImage,
        resumeUrl: "#" // Add your resume download link
    };

    const handleIconClick = (type, url) => {
        if (type === 'email') {
            try {
                // Create a mailto link and open it
                const mailtoLink = `mailto:${url}?subject=Hello from your portfolio&body=Hi Aditya, I came across your portfolio and would like to connect!`;

                // Try to open the mailto link
                const link = document.createElement('a');
                link.href = mailtoLink;
                link.click();

                // Fallback: copy email to clipboard
                setTimeout(() => {
                    navigator.clipboard.writeText(url).then(() => {
                        alert(`Email copied to clipboard: ${url}`);
                    }).catch(() => {
                        alert(`Please email me at: ${url}`);
                    });
                }, 1000);

            } catch (error) {
                console.error('Error opening email client:', error);
                // Fallback: show email in alert
                alert(`Please email me at: ${url}`);
            }
        } else if (type === 'resume') {
            if (url && url !== '#') {
                window.open(url, '_blank');
            } else {
                alert('Resume link not available yet');
            }
        } else {
            // For LinkedIn and GitHub
            if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                alert('Link not available');
            }
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, formData);
            if (response.data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className={`${styles.aboutUsContainer} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>About Me</h1>
                    <p className={styles.subtitle}>Get to know me better</p>
                </div>

                <div className={styles.navigation}>
                    <button
                        className={`${styles.navButton} ${activeSection === 'about' ? styles.active : ''}`}
                        onClick={() => handleSectionChange('about')}
                    >
                        <User size={20} />
                        About Me
                    </button>
                    <button
                        className={`${styles.navButton} ${activeSection === 'contact' ? styles.active : ''}`}
                        onClick={() => handleSectionChange('contact')}
                    >
                        <Mail size={20} />
                        Contact
                    </button>
                </div>

                <div className={styles.content}>
                    {activeSection === 'about' && (
                        <div className={styles.aboutSection}>
                            <div className={styles.profileCard}>
                                <div className={styles.profileHeader}>
                                    <div className={styles.profileImageContainer}>
                                        <img
                                            src={personalDetails.profilePhoto}
                                            alt={personalDetails.name}
                                            className={styles.profileImage}
                                        />
                                    </div>
                                    <div className={styles.profileInfo}>
                                        <h2 className={styles.profileName}>{personalDetails.name}</h2>
                                    </div>
                                </div>


                                <div className={styles.socialLinks}>
                                    <button
                                        className={`${styles.socialButton} ${styles.email}`}
                                        onClick={() => handleIconClick('email', personalDetails.email)}
                                        onMouseEnter={() => setHoveredIcon('email')}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                        title="Send Email"
                                    >
                                        <Mail size={20} />
                                        <span>Email</span>
                                    </button>

                                    <button
                                        className={`${styles.socialButton} ${styles.linkedin}`}
                                        onClick={() => handleIconClick('linkedin', personalDetails.linkedin)}
                                        onMouseEnter={() => setHoveredIcon('linkedin')}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                        title="LinkedIn Profile"
                                    >
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </button>

                                    <button
                                        className={`${styles.socialButton} ${styles.github}`}
                                        onClick={() => handleIconClick('github', personalDetails.github)}
                                        onMouseEnter={() => setHoveredIcon('github')}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                        title="GitHub Profile"
                                    >
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </button>

                                    {personalDetails.resumeUrl && personalDetails.resumeUrl !== '#' && (
                                        <button
                                            className={`${styles.socialButton} ${styles.resume}`}
                                            onClick={() => handleIconClick('resume', personalDetails.resumeUrl)}
                                            onMouseEnter={() => setHoveredIcon('resume')}
                                            onMouseLeave={() => setHoveredIcon(null)}
                                            title="Download Resume"
                                        >
                                            <Download size={20} />
                                            <span>Resume</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}


                    {activeSection === 'contact' && (
                        <div className={styles.contactSection}>
                            <div className={styles.contactCard}>
                                <h2>Get In Touch</h2>
                                <p>I'm always interested in new opportunities and collaborations. Feel free to reach out!</p>

                                <form onSubmit={handleFormSubmit} className={styles.contactForm}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.formLabel}>
                                            <UserIcon size={20} />
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={styles.formInput}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.formLabel}>
                                            <Mail size={20} />
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={styles.formInput}
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message" className={styles.formLabel}>
                                            <Send size={20} />
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className={styles.formTextarea}
                                            placeholder="Tell me about your project, opportunity, or just say hello!"
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={styles.submitButton}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className={styles.spinner}></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {submitStatus === 'success' && (
                                        <div className={styles.successMessage}>
                                            ✅ Thank you! Your message has been sent successfully. I'll get back to you soon!
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className={styles.errorMessage}>
                                            ❌ Sorry, there was an error sending your message. Please try again or contact me directly.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
