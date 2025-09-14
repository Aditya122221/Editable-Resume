import mongoose from 'mongoose'

const AchievementsSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Achievement_ID: {
        type: String
    },
    achievements: {
        type: [String]
    }
}, { timestamps: true })

const Achievements = mongoose.model("achievement", AchievementsSchema)

export default Achievements