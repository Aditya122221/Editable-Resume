# Email Configuration Setup

To enable email functionality for password reset, you need to configure the following environment variables in your `.env` file:

## Required Environment Variables

Add these to your `backend/.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

## Alternative Email Services

For production, consider using:
- **SendGrid** (recommended for production)
- **AWS SES**
- **Mailgun**
- **Postmark**

## Testing Without Email

In development mode, the reset token will still be returned in the API response for testing purposes.

## Email Template

The password reset email includes:
- Professional HTML template
- Reset button with secure link
- 1-hour expiry notice
- Fallback text link
- Security warnings
