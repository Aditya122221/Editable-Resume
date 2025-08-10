import styles from '../../style.module.css';

function Project({ projects = [] }) {
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
                            <span className={styles.date}>
                                {proj.endDate
                                    ? `${proj.startDate || "From"} - ${proj.endDate}`
                                    : `Since ${proj.startDate || "From"}`}
                            </span>
                        </div>
                    </div>

                    <ul className={styles.bulletList}>
                        {proj.description && proj.description.length > 0
                            ? proj.description.map((des, i) => (
                                <li key={i}>{des}</li>
                            ))
                            : <li>Description goes here</li>}
                    </ul>

                    <p className={styles.githubLink}>
                        <strong>GitHub Repository Link:</strong>{" "}
                        <a href={proj.githubLink} target='_blank' className={styles.linkgit}>{proj.githubLink}</a>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Project;