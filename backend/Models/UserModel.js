import mongoose from 'mongoose'

const userDataSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, { timestamps: true })

const userData = mongoose.model("userData", userDataSchema)

export default userData