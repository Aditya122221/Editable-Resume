import GG from '../../GR.module.css';

export default function Certificate({ certificate }) {
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
                                    {cert.startDate} {cert.endDate ? `- ${cert.endDate}` : "Present"}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
