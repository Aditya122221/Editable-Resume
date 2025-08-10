import styles from '../../style.module.css'

function Summer({ internship }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{internship[0].type}</h2>
            {internship.map((item, index) => (
                <div key={index} className={styles.experienceItem}>
                    <div className={styles.experienceHeader}>
                        <h3 className={styles.jobTitle}>{item.companyName}</h3>
                        <span className={styles.date}>
                            {item.endDate
                                ? `${item.startDate} - ${item.endDate}`
                                : `Since ${item.startDate}`}
                        </span>
                    </div>
                    {item.description && (
                        <ul className={styles.bulletList}>
                            {item.description.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                            ))}
                        </ul>
                    )}
                    {item.technologies && (
                        <p className={styles.techStack}>
                            <strong>Tech stack used:</strong> {(item.technologies).join(', ')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Summer
