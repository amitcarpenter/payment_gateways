# Installation Process

mkdir payment-gateway-integration
cd payment-gateway-integration
npm init -y

npm install express mongoose body-parser dotenv
npm install @types/express @types/node ts-node typescript --save-dev
npm install stripe razorpay paypal-rest-sdk

# Folder Structure

payment-gateway-integration/
├── src/
│ ├── config/
│ │ └── db.ts
│ ├── controllers/
│ │ ├── stripeController.ts
│ │ ├── razorpayController.ts
│ │ └── paypalController.ts
│ ├── models/
│ │ └── payment.ts
│ ├── routes/
│ │ └── paymentRoutes.ts
│ ├── app.ts
│ └── server.ts
├── .env
├── package.json
└── tsconfig.json


