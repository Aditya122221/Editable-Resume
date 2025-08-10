import Profile from "../Models/ProfileModel.js"
import Project from "../Models/ProjectModel.js"
import Certificate from '../Models/CertificateModels.js'
import Skill from '../Models/SkillsModel.js'
import Education from '../Models/EducationModel.js'
import Internship from '../Models/InternshipModel.js'

const FetchController = async (req, res) => {
    try {
        const { Registration_ID } = req.body

        const profile = await Profile.findOne({ Registration_ID })
        const project = await Project.find({ Registration_ID })
        const certificate = await Certificate.find({ Registration_ID })
        const skill = await Skill.findOne({ Registration_ID })
        const education = await Education.find({ Registration_ID })
        const internship = await Internship.find({ Registration_ID })

        return res.status(200).json({ profile: profile, project: project, certificate: certificate, skill: skill, education: education, internship: internship })
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default FetchController