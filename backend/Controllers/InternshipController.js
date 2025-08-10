import Internship from "../Models/InternshipModel.js";

const InternshipController = async (req, res) => {
    try {
        const { Registration_ID, Internship_ID, companyName, startDate, endDate, description, technologies, type, flag } = req.body;

        if (flag === 1) {
            const internship = await Internship.find({ Registration_ID })

            return res.status(200).json({ internship: internship })
        } else if (flag === 2) {
            const internship = await Internship.updateOne(
                { Internship_ID },
                {
                    $set: { companyName, startDate, endDate, description, technologies, type }
                }
            )

            if (internship.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Internship Updated" })
        } else if (flag === 3) {
            const internship = await Internship.deleteOne({ Internship_ID })

            if (internship.deletedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Deleting Error from server side. Please try again later" })
            }

            return res.status(200).json({ message: "Internship Deleted" })
        } else if (flag === 4) {
            let i_id;
            let isDuplicate = true
            while (isDuplicate) {
                i_id = "I" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Internship.findOne({ Internship_ID: i_id })
            }

            const newInternship = new Internship(
                {
                    Registration_ID, Internship_ID: i_id, companyName, startDate, endDate, description, technologies, type
                }
            )

            await newInternship.save()

            return res
                .status(201)
                .json({ status: true, message: "Internship Added" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default InternshipController