import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Project_ID: {
        type: String
    },
    name: {
        type: String
    },
    technologies: {
        type: [String],

    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    description: {
        type: [String],
    },
    githubLink: {
        type: String
    }
}, { timestamps: true })

const Project = mongoose.model("project", ProjectSchema)

export default Project