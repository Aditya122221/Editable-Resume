import Certificate from "../Models/CertificateModels.js";

const CertificateController = async (req, res) => {
    try {
        const { Registration_ID, Certificate_ID, name, startDate, endDate, company, flag } = req.body;

        if (flag === 1) {
            const cert = await Certificate.find({ Registration_ID })

            return res.status(200).json({ cert: cert })
        } else if (flag === 2) {
            const cert = await Certificate.updateOne(
                { Certificate_ID },
                {
                    $set: { name, startDate, endDate, company }
                }
            )

            if (cert.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Certificate Updated" })
        } else if (flag === 3) {
            const cert = await Certificate.deleteOne({ Certificate_ID })

            if (cert.deletedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Deleting Error from server side. Please try again later" })
            }

            return res.status(200).json({ message: "Certificate Deleted" })
        } else if(flag === 4) {
            let c_id;
            let isDuplicate = true
            while (isDuplicate) {
                c_id = "C" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Certificate.findOne({ Certificate_ID: c_id })
            }

            const newCertificate = new Certificate(
                {
                    Registration_ID, Certificate_ID: c_id, name, startDate, endDate,company
                }
            )

            await newCertificate.save()

            return res
            .status(201)
            .json({ status: true, message: "Certificate Added" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default CertificateController