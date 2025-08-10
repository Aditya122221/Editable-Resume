import Skill from "../Models/SkillsModel.js"

const SkillController = async (req, res) => { 
    try {
        const { Registration_ID, Skill_ID, language, technologies, skill, softskill, flag } = req.body
        
        if (flag === 1) {
            const skill = await Skill.findOne({ Registration_ID })

            return res.status(200).json({ skill: skill })
        } else if (flag === 2) {
            const skil = await Skill.updateOne(
                { Skill_ID },
                {
                    $set: { language, technologies, skill, softskill }
                }
            )

            if (skil.modifiedCount === 0) {
                 return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Skill Updated" })
        } else if(flag === 3){
            let s_id;
            let isDuplicate = true
            while (isDuplicate) {
                s_id = "S" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Skill.findOne({ Skill_ID: s_id })
            }

            const newSkill = new Skill({
                Registration_ID,
                Skill_ID: s_id,
                language,
                technologies,
                skill,
                softskill
            })

            await newSkill.save()

            return res
            .status(201)
            .json({ status: true, message: "Skill Added" })
        }
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default SkillController