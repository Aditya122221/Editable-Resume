import GG from '../../GR.module.css';

function Achievements({ achievements = [], onDelete, isDownloadable }) {
    if (!achievements || achievements.length === 0) return null;

    return (
        <div className={GG.tt} id="achievements">
            <div className={GG.title}>ACHIEVEMENTS</div>
            <hr className={GG.regularHR} />

            <div className={GG.aa}>
                {achievements.map((achievement, index) => (
                    <div key={index} className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <span
                            className={GG.ad}
                            style={{
                                fontSize: '19px',
                            }}
                        >
                            {achievement}
                        </span>
                        <button
                            className={isDownloadable ? GG.noPrint : GG.print}
                            onClick={() => onDelete && onDelete(index, 5)}
                            style={{
                                marginLeft: '10px',
                                background: 'none',
                                border: 'none',
                                color: '#dc2626',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '2px 6px'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Achievements;
