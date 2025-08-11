import styles from '../../style.module.css';

function Certificate({ certificates = [] }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Certificates</h2>

            {certificates.map((cert, index) => (
                <div key={index} className={styles.certificateItem}>
                    <div className={styles.certificateHeader}>
                        <h3 className={styles.certificateTitle}>
                            {cert.name ? cert.name : "Certificate Name"}
                        </h3>
                        <span className={styles.date}>
                            {cert.endDate
                                ? `${cert.startDate ? formatMonthYear(cert.startDate) : "From"} - ${formatMonthYear(cert.endDate)}`
                                : `Since ${cert.startDate ? formatMonthYear(cert.startDate) : "From"}`}
                        </span>
                    </div>
                    <p className={styles.certificateOrg}>
                        {cert.company ? cert.company : "Platform Name"}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Certificate;