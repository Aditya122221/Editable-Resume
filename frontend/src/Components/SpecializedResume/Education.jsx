import styles from '../../style.module.css';

function Education({ education = [] }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>

            {education.map((edu, index) => (
                <div key={index} className={styles.educationItem}>
                    <div className={styles.educationHeader}>
                        <h3 className={styles.institutionName}>
                            {edu.institute ? edu.institute : "College Name"}
                        </h3>
                        <span className={styles.date}>
                            {edu.endDate
                                ? `${edu.startDate} - ${edu.endDate}`
                                : `Since ${edu.startDate}`}
                        </span>
                    </div>
                    <div className={styles.educationHeader}>
                        <p className={styles.degree}>
                            {edu.field ? edu.field : "Stream"} - {edu.marks ? edu.marks : "Marks"}
                        </p>
                        <p className={styles.educationLocation}>
                            {edu.address ? edu.address : "Address"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Education;