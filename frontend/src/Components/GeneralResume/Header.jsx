import GG from '../../GR.module.css'

const Header = ({profile}) => (
    <>
        <div className={GG.name}>{profile.fullName ? profile.fullName : "Full Name"}</div>
        <div className={GG.contact}>
            <div className={GG.link}>
                <div className={GG.linkdin}>
                    <div className={GG.lindin1}>LinkedIn: </div>
                    <a
                        href={profile.linkedinLink ? profile.linkedinLink : ""}
                        className={GG.linkdin2}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {profile.linkedinP? profile.linkedinP : "Linkedin link"}
                    </a>
                </div>
                <div className={GG.email}>Email: {profile.email ? profile.email : "Email ID"}</div>
            </div>
            <div className={GG.con}>
                <div className={GG.linkdin}>
                    <div className={GG.lindin1}>GitHub: </div>
                    <a
                        href={profile.github ? profile.github : ""}
                        className={GG.linkdin2}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {profile.github ? profile.github : "Github Link"}
                    </a>
                </div>
                <div className={GG.phone}>Mobile: +91{profile.phone ? profile.phone : "xxxxxxxxxx"}</div>
            </div>
        </div>
    </>
);

export default Header
