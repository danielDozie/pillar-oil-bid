export const FROM_NAME = "POL RFX.";

export const ADMIN_OTP_EMAIL = [
    "babajide.gbolagun@pillaroil.com",
    "peter.akinjo@pillaroil.com",
    "luchidan63@gmail.com",
] as const;

export const APPROVE_SIGN_IN_HTML = (otp: number | number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Approve Sign-in</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Approve an operator account sign-in with the one-time pin (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
};

export const APPROVE_SIGN_UP_HTML = (otp: string | number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Confirm your OTP</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Verify your account with the one-time password (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
}

export const RESEND_OTP_HTML = APPROVE_SIGN_UP_HTML;

export const ADD_VENDOR_HTML = (companyName: string, token: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL RFX, ${companyName}!</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Your account has been successfully created.</p>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Please use the link below to set your password and start exploring our services:</p>
                <a href="${process.env.HOST}/auth/set-password?token=${token}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; margin: 20px 0; border-radius: 5px; text-decoration: none;">Set Your Password</a>
                <p style="color: #555; font-size: 14px;">This link will expire in 24 hours.</p>
            </div>
            `;
};

export const ONBOARDING_COMPLETE_HTML = (companyName: string, platform: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL RFX</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Welcome ${companyName}, your account registration is complete</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">You have successfully registered on ${platform} app. ,<br/>Ensure you follow all our guidlines to avoid desciplinary actions against you.<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; ${new Date().getFullYear()}. POL RFX</p>
            </div>
            `
}

export const GENERATE_PASSWORD_RESET_OTP_HTML = (otp: string | number) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #333; font-size: 24px;">Password Reset OTP</h1>
            <p style="color: #555; font-size: 16px; margin: 20px 0;">Your OTP for password reset is below:</p>
            <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
            </div>
            <p style="color: #555; font-size: 14px;">This OTP is valid for 15 minutes.</p>
        </div>
        `
}

export const EXTEND_END_DATE_OTP_HTML = (otp: number | number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Extend End Date</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Extend tender end date with the one-time pin (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
};

export const BID_ACCEPTANCE_HTML = (companyName: string, title: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Bid Accepted</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Congratulations ${companyName}, your bid has been accepted</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">Your recent bid on ${title} has been accepted.<br/>We will reach out to you for further details.<br/><br/>Feel free to reach out to us for any inquiry.
                    <br/><br/> Once again, congratulations.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; ${new Date().getFullYear()}. POL RFX</p>
            </div>
            `
}
export const BID_REJECTION_HTML = (companyName: string, title: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Bid Rejected</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Sorry ${companyName}, your bid has been rejected</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">Your recent bid on ${title} has been rejected.<br/>While we appreciate your time and submission, we decided to move on with other candidate(s)<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; ${new Date().getFullYear()}. POL RFX</p>
            </div>
            `
}