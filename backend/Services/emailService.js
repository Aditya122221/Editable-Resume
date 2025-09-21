import nodemailer from 'nodemailer';

// Create transporter based on environment
const createTransporter = () => {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email configuration missing. Email functionality disabled.');
        return null;
    }

    // For development, use Gmail SMTP
    // For production, you might want to use services like SendGrid, AWS SES, etc.
    if (process.env.NODE_ENV === 'production') {
        // Production email service configuration
        return nodemailer.createTransporter({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } else {
        // Development - using Gmail SMTP
        return nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
};

export const sendPasswordResetEmail = async (email, resetToken, userName) => {
    try {
        const transporter = createTransporter();

        // If email configuration is missing, return success but log the token
        if (!transporter) {
            console.log(`\n📧 EMAIL CONFIGURATION MISSING`);
            console.log(`Password reset token for ${email}: ${resetToken}`);
            console.log(`Reset link: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`);
            console.log(`Please configure EMAIL_USER and EMAIL_PASS in your .env file to enable email sending.\n`);
            return { success: true, messageId: 'no-email-config' };
        }

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request - Editable CV',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <h2 style="color: #333; margin-top: 0;">Hello ${userName || 'User'},</h2>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 16px;">
                            We received a request to reset your password for your Editable CV account. 
                            Click the button below to reset your password:
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      padding: 15px 30px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      font-weight: bold; 
                                      display: inline-block;
                                      font-size: 16px;">
                                Reset Password
                            </a>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If the button doesn't work, you can copy and paste this link into your browser:
                        </p>
                        
                        <p style="color: #667eea; word-break: break-all; font-size: 14px; background: #f1f3f4; padding: 10px; border-radius: 5px;">
                            ${resetUrl}
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                <strong>Important:</strong> This link will expire in 1 hour for security reasons.
                                If you didn't request this password reset, please ignore this email.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('Error sending password reset email:', error);
        return { success: false, error: error.message };
    }
};

export const sendWelcomeEmail = async (email, userName) => {
    try {
        const transporter = createTransporter();

        // If email configuration is missing, skip sending email
        if (!transporter) {
            console.log(`Welcome email skipped for ${email} - email configuration missing`);
            return { success: true, messageId: 'no-email-config' };
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Editable CV!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Editable CV!</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <h2 style="color: #333; margin-top: 0;">Hello ${userName},</h2>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 16px;">
                            Thank you for signing up for Editable CV! You can now create and manage your professional resume.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" 
                               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      padding: 15px 30px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      font-weight: bold; 
                                      display: inline-block;
                                      font-size: 16px;">
                                Get Started
                            </a>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If you have any questions, feel free to contact our support team.
                        </p>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};
