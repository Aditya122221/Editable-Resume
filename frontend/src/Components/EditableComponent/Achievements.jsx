import { useEffect, useState } from 'react';
import styles from '../../CSS/Achievements.module.css';
import axios from 'axios';
import Navbar from './Navbar';

const api = `${import.meta.env.VITE_API_BASE_URL}/achievement`;

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [achievementID, setAchievementID] = useState('');
    const [achievementInput, setAchievementInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addAchievement = () => {
        if (achievementInput.trim() !== '') {
            setAchievements([...achievements, achievementInput.trim()]);
            setAchievementInput('');
        }
    };

    const removeAchievement = (index) => {
        const newAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(newAchievements);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            Registration_ID: localStorage.getItem("EditableReg"),
            Achievement_ID: achievementID,
            achievements: achievements,
            flag: achievementID ? 2 : 3
        };

        try {
            const response = await axios.post(api, payload);
            if (response.data.status) {
                alert(response.data.message);
                if (!achievementID) {
                    // If this was a new achievement, we might want to refresh the data
                    fetchAchievements();
                }
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error submitting achievements:', error);
            alert('Error submitting achievements. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchAchievements = async () => {
        try {
            const payload = {
                Registration_ID: localStorage.getItem("EditableReg"),
                flag: 1
            };

            const response = await axios.post(api, payload);
            if (response.data.achi && response.data.achi.length > 0) {
                const achievementData = response.data.achi[0];
                setAchievements(achievementData.achievements || []);
                setAchievementID(achievementData.Achievement_ID || '');
            } else {
                setAchievements([]);
                setAchievementID('');
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    return (
        <><Navbar />
            <div className={styles.container}>
                <h2 className={styles.title}>Achievements</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputSection}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                value={achievementInput}
                                onChange={(e) => setAchievementInput(e.target.value)}
                                placeholder="Enter your achievement"
                                className={styles.input}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addAchievement();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={addAchievement}
                                className={styles.addButton}
                            >
                                Add Achievement
                            </button>
                        </div>
                    </div>

                    {achievements.length > 0 && (
                        <div className={styles.achievementsList}>
                            <h3 className={styles.listTitle}>Your Achievements:</h3>
                            {achievements.map((achievement, index) => (
                                <div key={index} className={styles.achievementItem}>
                                    <div className={styles.achievementContent}>
                                        <span className={styles.bullet}>•</span>
                                        <span className={styles.achievementText}>{achievement}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAchievement(index)}
                                        className={styles.removeButton}
                                        aria-label={`Remove ${achievement}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting || achievements.length === 0}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Achievements'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Achievements;
