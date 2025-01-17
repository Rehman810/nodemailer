const transporter = require('../src/config/nodemailerConfig');

exports.sendEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // HTML email for the user
        const userEmailHTML = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <header style="background-color: #003366; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
                </header>
                <main style="padding: 20px; line-height: 1.6;">
                    <p style="margin-bottom: 15px;">Dear User,</p>
                    <p>Thank you for getting in touch with me. I’ve received your message and will respond as soon as possible. Here’s a summary of your inquiry:</p>
                    <div style="margin: 20px 0; padding: 15px; background-color: #f7f9fc; border-left: 4px solid #003366; border-radius: 4px;">
                        <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
                        <p style="margin: 0;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0; color: #555;">${message}</p>
                    </div>
                    <p>If you have any further questions or additional information to share, feel free to reply to this email.</p>
                    <p style="margin-top: 20px;">Warm regards,</p>
                    <p><strong>Abdul Rehman Waseem</strong></p>
                    <p style="margin: 0;">MERN Stack Developer</p>
                    <p style="margin: 0; color: #555; font-size: 14px;">Email: ${process.env.EMAIL_USER}</p>
                </main>
                <footer style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0;">© 2025 Abdul Rehman Waseem. All rights reserved.</p>
                </footer>
            </div>
        `;

        // HTML email for yourself
        const ownerEmailHTML = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <header style="background-color: #003366; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">New Inquiry Notification</h1>
                </header>
                <main style="padding: 20px; line-height: 1.6;">
                    <p style="margin-bottom: 15px;">Dear Abdul,</p>
                    <p>You have received a new inquiry. Below are the details:</p>
                    <div style="margin: 20px 0; padding: 15px; background-color: #f7f9fc; border-left: 4px solid #003366; border-radius: 4px;">
                        <p style="margin: 0;"><strong>Sender:</strong> ${email}</p>
                        <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
                        <p style="margin: 0;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0; color: #555;">${message}</p>
                    </div>
                    <p style="margin-top: 20px;">Please respond to the sender promptly to address their inquiry.</p>
                </main>
                <footer style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0;">© 2025 Abdul Rehman Waseem. All rights reserved.</p>
                </footer>
            </div>
        `;

        // Send email to the user
        await transporter.sendMail({
            from: `Abdul Rehman <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Confirmation: ${subject}`,
            html: userEmailHTML,
        });

        // Send email to yourself
        await transporter.sendMail({
            from: `Abdul Rehman <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Inquiry: ${subject}`,
            html: ownerEmailHTML,
        });

        res.status(200).json({ success: 'Emails sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send emails.' });
    }
};
