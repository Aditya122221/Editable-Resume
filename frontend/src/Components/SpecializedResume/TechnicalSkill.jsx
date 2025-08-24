import styles from '../../style.module.css';

function TechnicalSkill({ skills = {} }) {
    const { language = [], technologies = [], skill = [], softskill = [] } = skills;

    const renderList = (items) =>
        items && items.length > 0
            ? items.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < items.length - 1 && ", "}
                </span>
            ))
            : "";

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsContainer}>
                {language ? <p className={styles.skillLine}>
                    <strong>Languages:</strong> {renderList(language)}
                </p> : ''}
                {technologies ? <p className={styles.skillLine}>
                    <strong>Technologies/Frameworks:</strong> {renderList(technologies)}
                </p> : ''}
                {skill ? <p className={styles.skillLine}>
                    <strong>Tools/Platforms:</strong> {renderList(skill)}
                </p> : ''}
                {softskill ? <p className={styles.skillLine}>
                    <strong>Soft Skills:</strong> {renderList(softskill)}
                </p> : ''}
            </div>
        </div>
    );
}

export default TechnicalSkill;