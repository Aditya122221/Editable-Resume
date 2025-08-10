import GG from '../../GR.module.css';

function SkillSection({ skills }) {
    return (
        <div className={GG.tt} id="special">
            <div className={GG.title}>SKILLS</div>
            <hr className={GG.regularHR} />

            <div className={GG.aa}>
                {skills.language?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Languages:</div>
                        <div className={GG.ad}>{skills.language.join(", ")}</div>
                    </div>
                )}

                {skills.technologies?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Frameworks:</div>
                        <div className={GG.ad}>{skills.technologies.join(", ")}</div>
                    </div>
                )}

                {skills.skill?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Tools/Platforms:</div>
                        <div className={GG.ad}>{skills.skill.join(", ")}</div>
                    </div>
                )}

                {skills.softskill?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Soft Skills:</div>
                        <div className={GG.ad}>{skills.softskill.join(", ")}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SkillSection;
