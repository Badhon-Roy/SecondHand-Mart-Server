import nodemailer from 'nodemailer';

// Define TypeScript types for the sendMail function
interface MailOptions {
  avatar: string;
  senderName: string;
  senderEmail: string;
  message: string;
  receiverEmail: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendMassageToMail({
  avatar,
  senderName,
  senderEmail,
  message,
  receiverEmail
}: MailOptions): Promise<void> {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Inquiry Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                font-size: 30px;
                font-weight: bold;
                color: #ff8e00;
                margin-bottom: 20px;
            }
            .order-details {
                margin: 20px 0;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 8px;
                box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .order-details p {
                margin: 12px 0;
                font-size: 16px;
                color: #333;
            }
            .order-details span {
                font-weight: bold;
                color: #ff8e00;
            }
            .buttons {
                text-align: center;
                margin-top: 20px;
            }
            .btn {
                padding: 12px 25px;
                font-size: 18px;
                font-weight: bold;
                color: #fff;
                background-color: #ff8e00;
                text-decoration: none;
                border-radius: 8px;
                transition: background 0.3s ease;
                display: inline-block;
                margin: 10px 0;
            }
            .btn:hover {
                background-color: #ff6f00;
                cursor: pointer;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #777;
            }
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .sender-info {
                display: flex;
                align-items: center;
            }
            .sender-name {
                font-weight: bold;
                color: #333;
            }
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="header">You Have a New Inquiry!</div>

        <div class="sender-info">
            <img src="${avatar}" alt="Sender Avatar" class="avatar" />
            <p class="sender-name">${senderName} (${senderEmail})</p>
        </div>

        <div class="order-details">
            <p><span>Message:</span> ${message}</p>
        </div>

        <div class="buttons">
            <a target="_blank" rel="noopener noreferrer" href="${process.env.CLIENT_SITE_URL}/user/dashboard/message" class="btn">View Inquiry</a>
        </div>
    </div>

    <div class="footer">
        <p>Thank you for using our platform! 🚀</p>
    </div>

    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: '"SecondHand-Mart" <secondhandmart@gmail.com>',
    to: receiverEmail,
    subject: 'New Inquiry Notification 📩',
    html: emailHTML,
  });

  console.log('Message sent: %s', info.messageId);
}

export default sendMassageToMail;
