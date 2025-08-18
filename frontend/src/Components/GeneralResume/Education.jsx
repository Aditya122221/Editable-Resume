import GG from '../../GR.module.css';

export default function Education({ education, onDelete, isDownloadable }) {
    return (
        <div className={GG.tt}>
            <div className={GG.title}>EDUCATION</div>
            <hr className={GG.regularHR} />

            <div className={GG.ea}>
                {education.map((edu, index) => (
                    <div
                        key={edu.id || index}
                        className={GG.eb}
                        id={index !== 0 ? "sec" : undefined}
                    >
                        <div className={GG.ec}>
                            <div className={GG.ee}>
                                <i className="fa-solid fa-circle fa-2xs"></i>
                                <div className={GG.ef}>{edu.institute}</div>
                            </div>
                            <div className={GG.eg}>{edu.address || ""}</div>
                        </div>
                        <div className={GG.ed}>
                            <div className={GG.eh}>
                                {edu.field}; {edu.marks}
                            </div>
                            <div className={GG.ei}>
                                {edu.startDate ? formatDate(edu.startDate) : ""}
                                {edu.endDate
                                    ? ` - ${formatDate(edu.endDate)}`
                                    : " - Present"}
                                <button
                                    className={isDownloadable ? GG.noPrint : GG.print}
                                    onClick={() => onDelete && onDelete(index, 4)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

// Helper to format dates nicely, e.g. "Aug 2022"
function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback if invalid
    return date.toLocaleString("default", { month: "short", year: "numeric" });
}
