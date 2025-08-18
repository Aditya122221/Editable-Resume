import styles from '../../style.module.css';

function Education({ education = [], onDelete, isDownloadable }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>

            {education.map((edu, index) => (
                <div key={index} className={styles.educationItem}>
                    <div className={styles.educationHeader}>
                        <h3 className={styles.institutionName}>
                            {edu.institute ? edu.institute : "College Name"}
                        </h3>

                        <div className={styles.educationRight}>
                            <span className={styles.date}>
                                {edu.endDate
                                    ? `${formatMonthYear(edu.startDate)} - ${formatMonthYear(edu.endDate)}`
                                    : `Since ${formatMonthYear(edu.startDate)}`}
                            </span>

                            <button
                                className={isDownloadable ? styles.noPrint : styles.print}
                                onClick={() => onDelete && onDelete(index, 4)}
                            >
                                ✕
                            </button>
                        </div>
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