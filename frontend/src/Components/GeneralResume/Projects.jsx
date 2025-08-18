import GG from '../../GR.module.css';

export default function Project({ project, onDelete, isDownloadable }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <div className={GG.tt}>
            <div className={GG.title}>PROJECTS</div>
            <hr className={GG.regularHR} />

            <div className={GG.ca}>
                {project.map((proj, index) => (
                    <div
                        key={proj.id || index}
                        className={`${GG.cb}`}
                    >
                        <div className={GG.cc}>
                            <div className={GG.cd}>
                                <i className="fa-solid fa-circle fa-2xs"></i>
                                <div className={GG.ce}>{proj.name}</div>
                            </div>

                            <div className={GG.cf}>
                                {formatMonthYear(proj.startDate)} -{" "}
                                {proj.endDate ? formatMonthYear(proj.endDate) : "Present"}
                                <button
                                    className={isDownloadable ? GG.noPrint : GG.print}
                                    onClick={() => onDelete && onDelete(index, 2)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {proj.description && proj.description.length > 0 && (
                            <ul className={GG.pul}>
                                {proj.description.map((desc, i) => (
                                    <li key={i} className={GG.descrip}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {proj.technologies && proj.technologies.length > 0 && (
                            <div className={GG.cg}>
                                <span className={GG.ch}>Tech Stack Used: </span>
                                <span className={GG.ci}>{proj.technologies.join(", ")}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}