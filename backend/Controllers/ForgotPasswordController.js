import userData from "../Models/UserModel.js"
import crypto from "crypto"

const ForgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email is required"
            })
        }

        const user = await userData.findOne({ email })

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User with this email does not exist"
            })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

        // Save reset token to user
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetTokenExpiry
        await user.save()

        // Generate reset link
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`

        // Log the reset link for development
        console.log(`\n🔑 Password Reset Link for ${email}:`)
        console.log(`   ${resetLink}`)
        console.log(`   Token: ${resetToken}`)
        console.log(`   Expires: ${resetTokenExpiry}\n`)

        return res.status(200).json({
            status: true,
            message: "Password reset link generated successfully!",
            resetToken: resetToken,
            resetLink: resetLink,
            expiresAt: resetTokenExpiry
        })

    } catch (err) {
        console.error("Forgot password error:", err)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

export default ForgotPasswordController
