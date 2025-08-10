import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Skill_ID: {
        type: String
    },
    language: {
        type: [String],
    },
    technologies: {
        type: [String],
    },
    skill: {
        type: [String],
    },
    softskill: {
        type: [String],
    }
},{ timestamps: true })

const Skill = mongoose.model("skill", SkillSchema)

export default Skill