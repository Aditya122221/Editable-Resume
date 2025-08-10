import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    Certificate_ID: {
        type: String
    },
    name: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    company: {
        type: String
    }
}, { timestamps: true })

const Certificate = mongoose.model("certificate", CertificateSchema)

export default Certificate