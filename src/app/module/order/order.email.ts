import nodemailer from 'nodemailer';

// Define TypeScript types for the sendMail function
interface MailOptions {
    image: string[];
    productName: string;
    productPrice: string;
    buyerName: string;
    sellerName: string;
    sellerEmail: string;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

async function sendMail({
    image,
    productName,
    productPrice,
    buyerName,
    sellerName,
    sellerEmail
}: MailOptions): Promise<void> {

    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                font-size: 40px;
                font-weight: bold;
                color: #ff8e00;
            }
            .product-image {
                text-align: center;
                margin-top: 20px;
            }
            .product-image img {
                max-width: 100%;
                border-radius: 8px;
            }
            .order-details {
                margin: 20px 0;
                padding: 15px;
                background: #f9f9f9;
                border-radius: 8px;
            }
            .order-details p {
                margin: 8px 0;
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
                display: inline-block;
                padding: 10px 20px;
                margin: 5px;
                font-size: 16px;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
          .confirm-btn {
    background: linear-gradient(to right, #ffbe0c, #ff8e00); /* Gradient background */
    padding: 10px 30px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
}

.confirm-btn:hover {
    background: linear-gradient(to right, #e9a912, #ff6f00); /* Hover gradient */
    cursor: pointer; /* Optional: Change cursor to pointer on hover */
}
        </style>
    </head>
    <body>

    <div class="email-container">
        <div class="header">
            Order Confirmation ✅
        </div>

        <div class="product-image">
            <img src="${image}" alt="Product Image">
        </div>

        <div class="order-details">
            <p><span>Product Name:</span> ${productName}</p>
            <p><span>Price:</span> ৳${productPrice}</p>
            <p><span>Buyer:</span> ${buyerName}</p>
            <p><span>Seller:</span> ${sellerName}</p>
        </div>

        <div class="buttons">
           <a target="_blank" rel="noopener noreferrer" href="${process.env.CLIENT_SITE_URL}/user/dashboard/sales-history" class="btn confirm-btn">
    Confirm Order
    </a>

        </div>
    </div>

    </body>
    </html>
    `;

    const info = await transporter.sendMail({
        from: '"SecondHand-Mart" <secondhandmart@gmail.com>',
        to: sellerEmail,
        subject: "Order Confirmation ✅",
        html: emailHTML,
    });

    console.log("Message sent: %s", info.messageId);
}

export default sendMail;
