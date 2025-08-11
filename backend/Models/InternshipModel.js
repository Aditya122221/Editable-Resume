import mongoose from 'mongoose'

const InternshipSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Internship_ID: {
        type: String
    },
    companyName: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    description: {
        type: [String]
    },
    technologies: {
        type: [String]
    },
    type: {
        type: String
    }
}, { timestamps: true })

const Internship = mongoose.model("internship", InternshipSchema)

export default Internship