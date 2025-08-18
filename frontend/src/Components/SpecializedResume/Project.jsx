import styles from '../../style.module.css';

function Project({ projects = [], onDelete, isDownloadable }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>

            {projects.map((proj, index) => (
                <div key={index} className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <div className={styles.projectTitleLine}>
                            <h3 className={styles.projectTitle}>
                                {proj.name ? proj.name : "Project Name"} |{" "}
                                <span className={styles.techUsed}>
                                    {proj.technologies
                                        ? proj.technologies.join(", ")
                                        : "Technologies used"}
                                </span>
                            </h3>
                            <div className={styles.projectRight}>
                                <span className={styles.date}>
                                    {proj.endDate
                                        ? `${formatMonthYear(proj.startDate) || "From"} - ${formatMonthYear(proj.endDate)}`
                                        : `Since ${formatMonthYear(proj.startDate) || "From"}`}
                                </span>

                                <button
                                    className={isDownloadable ? styles.noPrint : styles.print}
                                    onClick={() => onDelete && onDelete(index, 2)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    <ul className={styles.bulletList}>
                        {proj.description && proj.description.length > 0
                            ? proj.description.map((des, i) => (
                                <li key={i}>{des}</li>
                            ))
                            : <li>Description goes here</li>}
                    </ul>

                    {proj.githubLink ? (
                        <p className={styles.githubLink}>
                            <strong>GitHub Repository Link:</strong>{" "}
                            <a href={proj.githubLink} target='_blank' className={styles.linkgit}>{proj.githubLink}</a>
                        </p>
                    ) : ''}
                </div>
            ))}
        </div>
    );
}

export default Project;