import styles from '../../style.module.css';

function Achievements({ achievements = [], onDelete, isDownloadable }) {
    if (!achievements || achievements.length === 0) return null;

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Achievements</h2>

            <ul className={styles.achievementsList}>
                {achievements.map((achievement, index) => (
                    <li key={index} className={styles.achievementItem}>
                        <span
                            className={styles.achievementText}
                            style={{
                                fontSize: '19px',
                            }}
                        >
                            {achievement}
                        </span>
                        <button
                            className={isDownloadable ? styles.noPrint : styles.print}
                            onClick={() => onDelete && onDelete(index, 5)}
                            style={{
                                marginLeft: '10px',
                                background: 'none',
                                border: 'none',
                                color: '#dc2626',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '2px 6px'
                            }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Achievements;
