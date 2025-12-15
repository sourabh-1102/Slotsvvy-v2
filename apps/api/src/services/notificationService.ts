export const sendEmail = async (to: string, subject: string, body: string) => {
    // Stub for SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'replace_me') {
        // console.log(`[SendGrid] Sending email to ${to}: ${subject}`);
    } else {
        console.log(`[Console-Mode] EMAIL to ${to} | Subject: ${subject} | Body: ${body}`);
    }
};

export const sendSMS = async (to: string, body: string) => {
    // Stub for Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID !== 'replace_me') {
        // console.log(`[Twilio] Sending SMS to ${to}: ${body}`);
    } else {
        console.log(`[Console-Mode] SMS to ${to}: ${body}`);
    }
};
