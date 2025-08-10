import jwt from "jsonwebtoken"
import userData from "../Models/UserModel.js"

const secretCode = process.env.ACCESS_TOKEN

const LoginController = async (req, res) => { 
    try {
        const { email, password } = req.body

        const user = await userData.findOne({ email })

        if (!user) {
            return res
                .status(215)
                .json({ status: false, message: "User does not exists" })
        } else if (user.password !== password) {
            return res.status(215).send({ status: false, message: "Password did not matched" })
        }

        const token = jwt.sign({ id: user._id, role: user.Registration_ID }, secretCode)
        const RegID = user.Registration_ID

        return res.status(200).json({
            status: true,
            message: "Login Successful!",
            token,
            RegID,
        })
    } catch (err) {
        console.error(err) // Log the error for debugging
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default LoginController