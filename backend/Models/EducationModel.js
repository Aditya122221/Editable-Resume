import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Education_ID: {
        type: String
    },
    institute: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    field: {
        type: String
    },
    marks: {
        type: String
    },
    address: {
        type: String
    }
}, {timestamps: true})

const Education = mongoose.model("education", EducationSchema)

export default Education