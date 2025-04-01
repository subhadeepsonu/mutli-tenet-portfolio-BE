import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function Mail(to: string, subject: string, token: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'support@hivefolio.xyz',
            to: [to],
            subject: subject,
            html: `
            <h1>Welcome to Our Platform</h1>
            <p>Thank you for signing up! 🎉</p>
            <a href="https://portfolio.subhadeep.xyz/api/v1/user/verify?token=${token}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Verify Email</a>
          `,
        });
        if (error) {
            return console.error({ error });
        }

        console.log({ data });

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }

}