import userData from "../Models/UserModel.js"

const ResetPasswordController = async (req, res) => {
    try {
        const { token, newPassword } = req.body

        if (!token || !newPassword) {
            return res.status(400).json({
                status: false,
                message: "Token and new password are required"
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 6 characters long"
            })
        }

        // Find user with valid reset token
        const user = await userData.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        })

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Invalid or expired reset token"
            })
        }

        // Update password and clear reset token
        user.password = newPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        return res.status(200).json({
            status: true,
            message: "Password reset successfully"
        })

    } catch (err) {
        console.error("Reset password error:", err)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

export default ResetPasswordController
