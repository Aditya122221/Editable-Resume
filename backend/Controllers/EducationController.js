import Education from "../Models/EducationModel.js";

const EducationController = async (req, res) => {
    try {
        const { Registration_ID, Education_ID, institute, startDate, endDate, field, marks, address, flag } = req.body;

        if (flag === 1) {
            const education = await Education.find({ Registration_ID })

            return res.status(200).json({ education: education })
        } else if (flag === 2) {
            const education = await Education.updateOne(
                { Education_ID },
                {
                    $set: { institute, startDate, endDate, field, marks, address }
                }
            )

            if (education.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Education Updated" })
        } else if (flag === 3) {
            const education = await Education.deleteOne({ Education_ID })

            if (education.deletedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Deleting Error from server side. Please try again later" })
            }

            return res.status(200).json({ message: "Education Deleted" })
        } else if (flag === 4) {
            let e_id;
            let isDuplicate = true
            while (isDuplicate) {
                e_id = "E" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Education.findOne({ Education_ID: e_id })
            }

            const newEducation = new Education(
                {
                    Registration_ID, Education_ID: e_id, institute, startDate, endDate, field, marks, address
                }
            )

            await newEducation.save()

            return res
            .status(201)
            .json({ status: true, message: "Education Added" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default EducationController