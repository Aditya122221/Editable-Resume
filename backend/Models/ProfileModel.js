import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Profile_ID: {
        type: String
    },
    fullName: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
}, { timestamps: true })

const Profile = mongoose.model("profile", ProfileSchema)

export default Profile