import Achievements from "../Models/AchievementsModels.js";

const AchievementsController = async (req, res) => {
    try {
        const { Registration_ID, Achievement_ID, achievements, flag } = req.body;

        if (flag === 1) {
            const achi = await Achievements.find({ Registration_ID })

            return res.status(200).json({ achi })
        } else if (flag === 2) {
            const cert = await Achievements.updateOne(
                { Achievement_ID },
                {
                    $set: { achievements }
                }
            )

            if (cert.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Achievements Updated" })
        } else if(flag === 3) {
            let a_id;
            let isDuplicate = true
            while (isDuplicate) {
                a_id = "A" + Math.floor(Math.random() * 900000 + 100000).toString();
                isDuplicate = await Achievements.findOne({ Achievement_ID: a_id })
            }

            const newAchievements = new Achievements(
                {
                    Registration_ID, Achievement_ID: a_id, achievements
                }
            )

            await newAchievements.save()

            return res
            .status(201)
            .json({ status: true, message: "Achievements Added" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default AchievementsController