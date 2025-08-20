import Profile from "../Models/ProfileModel.js"

const TempController = async (req, res) => {
    try {
        const deleteOneField = await Profile.updateMany({}, { $unset: { linkedin: "" } })

        if (deleteOneField.modifiedCount === 0) {
            return res.status(404).json({ message: "Update failed" })
        }

        return res.status(200).json({ message: "Updated" })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export default TempController