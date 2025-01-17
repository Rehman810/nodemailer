const transporter = require('../src/config/nodemailerConfig');

exports.sendProposalEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'User name and email are required.' });
    }

    try {
        const proposalEmailHTML = `
            <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                <header style="background-color: #0066cc; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">Your Proposal Template is Ready!</h1>
                </header>
                <main style="padding: 20px;">
                    <p>Dear User,</p>
                    <p>Thank you for reaching out! As per your request, we’ve prepared a detailed proposal template for your project. You can download the template using the link below:</p>
                    <div style="margin: 20px 0; text-align: center;">
                        <a href="https://drive.google.com/file/d/1yQyMAicP03hOZT1O2429gd2kdnQ9Lv2u/view?usp=sharing" style="background-color: #0066cc; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Download Proposal Template</a>
                    </div>
                    <p>If you have any questions or need assistance filling out the template, feel free to reply to this email, and we’ll be happy to assist you.</p>
                    <p style="margin-top: 20px;">Best regards,</p>
                    <p><strong>Abdul Rehman Waseem</strong></p>
                    <p>MERN Stack Developer</p>
                </main>
                <footer style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #777;">
                    <p>© 2025 Abdul Rehman Waseem. All rights reserved.</p>
                </footer>
            </div>
        `;

        await transporter.sendMail({
            from: `Abdul Rehman <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Proposal Template is Ready',
            html: proposalEmailHTML,
        });

        res.status(200).json({ success: 'Proposal email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send proposal email.' });
    }
};
