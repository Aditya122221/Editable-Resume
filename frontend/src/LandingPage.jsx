import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles.landingPage}>
            {/* Header with Login/Signup */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>Editable CV</h1>
                </div>
                <div className={styles.authButtons}>
                    <Link to='/about' className={styles.aboutBtn}>About Us</Link>
                    <Link to="/login" className={styles.loginBtn}>Login</Link>
                    <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Create Professional Resumes That Get You Hired
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Build, customize, and download stunning resumes in minutes.
                        Perfect for every job application with our drag-and-drop editor.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link to="/signup" className={styles.ctaPrimary}>Get Started Free</Link>
                        <Link to="/login" className={styles.ctaSecondary}>View Demo</Link>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.resumePreview}>
                        <div className={styles.previewHeader}>
                            <h3>John Doe</h3>
                            <p>Full Stack Developer</p>
                        </div>
                        <div className={styles.previewContent}>
                            <div className={styles.previewSection}>
                                <h4>Skills</h4>
                                <p>React, Node.js, MongoDB, JavaScript</p>
                            </div>
                            <div className={styles.previewSection}>
                                <h4>Experience</h4>
                                <p>Software Engineer at Tech Corp (2020-2023)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Why Choose Editable CV?</h2>
                    <p className={styles.sectionSubtitle}>
                        Everything you need to create professional resumes that stand out
                    </p>

                    <div className={styles.featuresGrid}>
                        {/* Feature 1: Drag & Drop Skills */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>🎯</div>
                            </div>
                            <h3>Smart Skill Reordering</h3>
                            <p>
                                Drag and drop your skills to prioritize the most relevant ones for each job application.
                                Perfect for tailoring your resume to MERN, Android, Python, or any tech stack.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.skillDemo}>
                                    <div className={styles.skillItem}>React</div>
                                    <div className={styles.skillItem}>Node.js</div>
                                    <div className={styles.skillItem}>MongoDB</div>
                                    <div className={styles.skillItem}>JavaScript</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Multiple Resume Templates */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>📄</div>
                            </div>
                            <h3>Professional Templates</h3>
                            <p>
                                Choose from specialized and general resume templates designed for different industries.
                                Clean, ATS-friendly designs that get past applicant tracking systems.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.templateDemo}>
                                    <div className={styles.templateCard}>Specialized Resume</div>
                                    <div className={styles.templateCard}>General Resume</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Real-time Editing */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>⚡</div>
                            </div>
                            <h3>Real-time Preview</h3>
                            <p>
                                See your changes instantly as you edit. No more guessing how your resume will look.
                                Edit and preview simultaneously for the perfect result.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.previewDemo}>
                                    <div className={styles.editSide}>Edit Panel</div>
                                    <div className={styles.previewSide}>Live Preview</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4: PDF Export */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>📥</div>
                            </div>
                            <h3>One-Click PDF Export</h3>
                            <p>
                                Download your resume as a high-quality PDF instantly. Perfect for emailing to employers
                                or uploading to job portals. Professional formatting guaranteed.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.exportDemo}>
                                    <div className={styles.downloadBtn}>Download PDF</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 5: Comprehensive Sections */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>📋</div>
                            </div>
                            <h3>Complete Resume Sections</h3>
                            <p>
                                Add all essential sections: Personal Info, Education, Experience, Projects,
                                Certificates, Skills, and Internships. Everything you need for a complete profile.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.sectionsDemo}>
                                    <div className={styles.sectionItem}>Personal Info</div>
                                    <div className={styles.sectionItem}>Education</div>
                                    <div className={styles.sectionItem}>Experience</div>
                                    <div className={styles.sectionItem}>Projects</div>
                                    <div className={styles.sectionItem}>Skills</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 6: Easy Management */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <div className={styles.icon}>✏️</div>
                            </div>
                            <h3>Easy Edit & Delete</h3>
                            <p>
                                Simple one-click editing and deletion for all resume sections.
                                Update your information quickly and keep your resume current.
                            </p>
                            <div className={styles.featureImage}>
                                <div className={styles.manageDemo}>
                                    <div className={styles.editBtn}>Edit</div>
                                    <div className={styles.deleteBtn}>Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles.howItWorks}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Sign Up</h3>
                            <p>Create your free account in seconds</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Add Your Information</h3>
                            <p>Fill in your personal details, education, experience, and skills</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>Customize & Reorder</h3>
                            <p>Drag skills to prioritize and choose your template</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <h3>Download & Apply</h3>
                            <p>Export as PDF and start applying to jobs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <h2>Ready to Create Your Professional Resume?</h2>
                    <p>Join thousands of job seekers who've landed their dream jobs with our platform</p>
                    <div className={styles.ctaButtons}>
                        <Link to="/signup" className={styles.ctaPrimary}>Start Building Now</Link>
                        <Link to="/login" className={styles.ctaSecondary}>Login to Continue</Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerSection}>
                            <h3>Editable CV</h3>
                            <p>Creating professional resumes that get you hired.</p>
                        </div>
                        <div className={styles.footerSection}>
                            <h4>Features</h4>
                            <ul>
                                <li>Drag & Drop Skills</li>
                                <li>Multiple Templates</li>
                                <li>PDF Export</li>
                                <li>Real-time Preview</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>&copy; 2024 Editable CV. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
