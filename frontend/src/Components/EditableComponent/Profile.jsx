import { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react';
import styles from '../../CSS/Profile.module.css';
import axios from 'axios';
import Navbar from './Navbar.jsx'

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
        linkedinLink: '',
        linkedinP: '',
        github: ''
    });

    const [focusedField, setFocusedField] = useState('');
    const [profileId, setProfileId] = useState(null);
    const [isExistingProfile, setIsExistingProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/profile`;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const fetchProfile = async () => {
        const reg = localStorage.getItem('EditableReg');
        if (!reg) {
            setMessage('EditableReg (Registration_ID) not found in localStorage');
            return;
        }

        setLoading(true);
        try {
            const payload = { Registration_ID: reg, flag: 1 };
            const res = await axios.post(apiUrl, payload);

            const user = res?.data?.user;
            // backend returns user: {} when not found
            if (user && Object.keys(user).length > 0) {
                setFormData({
                    fullName: user.fullName || '',
                    address: user.address || '',
                    phone: user.phone || '',
                    email: user.email || '',
                    linkedinLink: user.linkedinLink || '',
                    linkedinP: user.linkedinP || '',
                    github: user.github || ''
                });
                setProfileId(user.Profile_ID || null);
                setIsExistingProfile(true);
                setMessage('');
            } else {
                // no profile found: keep empty form for "Add Profile"
                setIsExistingProfile(false);
                setProfileId(null);
                setMessage('');
            }
        } catch (err) {
            console.error('fetchProfile error', err);
            setMessage('Failed to fetch profile. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        // run once on mount
    }, []);

    const handleSubmit = async () => {
        const reg = localStorage.getItem('EditableReg');
        if (!reg) {
            setMessage('EditableReg (Registration_ID) not found in localStorage');
            return;
        }

        const missingFields = [];
        if (!formData.fullName?.trim()) missingFields.push("Full Name");
        if (!formData.address?.trim()) missingFields.push("Address");
        if (!formData.phone?.trim()) missingFields.push("Phone");
        if (!formData.email?.trim()) missingFields.push("Email");
        if (!formData.linkedinLink?.trim()) missingFields.push("LinkedIn Link");
        if (!formData.linkedinP?.trim()) missingFields.push("LinkedIn Personalized Link");
        if (!formData.github?.trim()) missingFields.push("GitHub");

        if (missingFields.length > 0) {
            setMessage(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            if (isExistingProfile) {
                // update
                const payload = {
                    Registration_ID: reg,
                    Profile_ID: profileId,
                    fullName: formData.fullName,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    linkedinLink: formData.linkedinLink,
                    linkedinP: formData.linkedinP,
                    github: formData.github,
                    flag: 2
                };

                const res = await axios.post(apiUrl, payload);

                if (res?.data?.status) {
                    setMessage(res.data.message || 'Profile updated successfully');
                } else {
                    // backend may return other shapes — show message if present
                    setMessage(res?.data?.message || 'Update response received');
                }
            } else {
                // add
                const payload = {
                    Registration_ID: reg,
                    fullName: formData.fullName,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    linkedinLink: formData.linkedinLink,
                    linkedinP: formData.linkedinP,
                    github: formData.github,
                    flag: 3
                };

                const res = await axios.post(apiUrl, payload);

                if (res?.data?.status) {
                    setMessage(res.data.message || 'Profile added successfully');
                } else {
                    setMessage(res?.data?.message || 'Add response received');
                }
            }

            // re-fetch to sync state (and get Profile_ID if newly created)
            await fetchProfile();
        } catch (err) {
            console.error('submit error', err);
            setMessage('Something went wrong while saving. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>
                        {isExistingProfile ? 'Update Profile' : 'Add Profile'}
                    </h1>
                    <p className={styles.headerSubtitle}>Update your personal information</p>
                </div>

                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="fullName">Full Name</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} />
                            <input
                                id="fullName"
                                type="text"
                                className={styles.input}
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                onFocus={() => setFocusedField('fullName')}
                                onBlur={() => setFocusedField('')}
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="address">Address</label>
                        <div className={styles.inputWrapper}>
                            <MapPin className={styles.inputIcon} />
                            <textarea
                                id="address"
                                className={styles.textarea}
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                onFocus={() => setFocusedField('address')}
                                onBlur={() => setFocusedField('')}
                                placeholder="Enter your address"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phone">Phone Number</label>
                        <div className={styles.inputWrapper}>
                            <Phone className={styles.inputIcon} />
                            <input
                                id="phone"
                                type="tel"
                                className={styles.input}
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField('')}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} />
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField('')}
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="linkedin">LinkedIn URL</label>
                        <div className={styles.inputWrapper}>
                            <Linkedin className={styles.inputIcon} />
                            <input
                                id="linkedinLink"
                                type="url"
                                className={styles.input}
                                value={formData.linkedinLink}
                                onChange={(e) => handleInputChange('linkedinLink', e.target.value)}
                                onFocus={() => setFocusedField('linkedinLink')}
                                onBlur={() => setFocusedField('')}
                                placeholder="https://www.linkedin.com/in/aditya-kumar-482429346/"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="linkedinP">LinkedIn Personalized URL</label>
                        <div className={styles.inputWrapper}>
                            <Linkedin className={styles.inputIcon} />
                            <input
                                id="linkedinP"
                                type="url"
                                className={styles.input}
                                value={formData.linkedinP}
                                onChange={(e) => handleInputChange('linkedinP', e.target.value)}
                                onFocus={() => setFocusedField('linkedinP')}
                                onBlur={() => setFocusedField('')}
                                placeholder="www.linkedin.com/in/aditya122221"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="github">GitHub URL</label>
                        <div className={styles.inputWrapper}>
                            <Github className={styles.inputIcon} />
                            <input
                                id="github"
                                type="url"
                                className={styles.input}
                                value={formData.github}
                                onChange={(e) => handleInputChange('github', e.target.value)}
                                onFocus={() => setFocusedField('github')}
                                onBlur={() => setFocusedField('')}
                                placeholder="https://github.com/yourusername"
                            />
                        </div>
                    </div>

                    {message && <div className={styles.message}>{message}</div>}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className={styles.saveButton}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isExistingProfile ? 'Update Profile' : 'Add Profile')}
                    </button>
                </div>
            </div>
        </div>
    );
}
