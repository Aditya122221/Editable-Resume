import GG from '../../GR.module.css';

export default function Certificate({ certificate, onDelete, isDownloadable }) {
    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <div className={GG.tt}>
            <div className={GG.title}>CERTIFICATES</div>
            <hr className={GG.regularHR} />

            <div className={GG.da}>
                <ul className={GG.cul}>
                    {certificate.map((cert, index) => (
                        <li key={cert.id || index} className={GG.cli}>
                            <div className={GG.de}>
                                <div className={GG.dc}>{cert.title || cert.name}</div>
                                <div className={GG.dd}>
                                    {formatMonthYear(cert.startDate)}{" "}
                                    {cert.endDate
                                        ? `- ${formatMonthYear(cert.endDate)}`
                                        : "Present"}
                                    <button
                                        className={isDownloadable ? GG.noPrint : GG.print}
                                        onClick={() => onDelete && onDelete(index, 3)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}