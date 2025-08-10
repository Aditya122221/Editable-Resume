import userData from "../Models/UserModel.js"

const SignupController = async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body
        
        const existingEmail = await userData.findOne({ email })
        if (existingEmail) {
            return res.status(209).json({
                status: false,
                message: "User with this email already exists",
            })
        }

        let Registration_ID
        let isDuplicate = true
        while (isDuplicate) {
            Registration_ID =
                Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
            isDuplicate = await userData.findOne({ Registration_ID })
        }

        const newUser = new userData({
            Registration_ID,
            fName,
            lName,
            email,
            password,
        })

        await newUser.save()

        return res.status(200).json({
                status: false,
                message: "User Registered",
            })
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default SignupController