import Profile from "../Models/ProfileModel.js";
import Project from "../Models/ProjectModel.js";
import Certificate from "../Models/CertificateModels.js";
import Skill from "../Models/SkillsModel.js";
import Education from "../Models/EducationModel.js";
import Internship from "../Models/InternshipModel.js";
import Achievements from "../Models/AchievementsModels.js";

const FetchController = async (req, res) => {
    try {
        const { Registration_ID } = req.body;

        const [
            profile,
            project,
            certificate,
            skill,
            education,
            internship,
            achievements
        ] = await Promise.all([
            Profile.findOne({ Registration_ID }),
            Project.find({ Registration_ID }).sort({ startDate: -1 }),
            Certificate.find({ Registration_ID }).sort({ startDate: -1 }),
            Skill.findOne({ Registration_ID }),
            Education.find({ Registration_ID }).sort({ startDate: -1 }),
            Internship.find({ Registration_ID }).sort({ startDate: -1 }),
            Achievements.find({ Registration_ID })
        ]);

        return res.status(200).json({
            profile,
            project,
            certificate,
            skill,
            education,
            internship,
            achievements
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
};

export default FetchController;
