import GG from '../../GR.module.css'

export default function Internship({ internship }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <div className={GG.tt}>
            <div className={GG.title}>{internship[0].type.toUpperCase()}</div>
            <hr className={GG.regularHR} />
            {internship.map((intern) => (
                <div className={GG.ba} key={intern.Internship_ID}>
                    <div className={GG.bb}>
                        <div className={GG.bc}>
                            <div className={GG.bf}>
                                <i className="fa-solid fa-circle fa-2xs"></i>
                                <div className={GG.bd}>{intern.companyName}</div>
                            </div>
                            <div className={GG.be}>
                                {formatMonthYear(intern.startDate)} - {intern.endDate ? formatMonthYear(intern.endDate) : 'Present'}
                            </div>
                        </div>

                        <div className={GG.bh}>
                            {intern.description.length > 0 && intern.description.map((desc, index) => (
                                <div key={index} className={GG.bi}>
                                    <i className="fa-regular fa-circle fa-2xs"></i>
                                    <div className={GG.bj}>{desc}</div>
                                </div>
                            ))}

                            {intern.technologies.length > 0 && (
                                <div className={GG.bi}>
                                    <i className="fa-regular fa-circle fa-2xs"></i>
                                    <span className={GG.points}>Tech stack used: </span>
                                    <span className={GG.bk}>{intern.technologies.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
