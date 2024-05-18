import * as env from 'dotenv';

env.config();

export default {
  port: parseInt(process.env.PORT!, 10),
  address: process.env.ADDRESS!,
  clientAppUrl: process.env.CLIENTAPPURL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeCurrency: process.env.STRIPE_CURRENCY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  openAiSecretKey: process.env.OPEN_AI_SECRET_KEY,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  forgotLink: process.env.CLIENT_URL,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    runMigrations: process.env.DB_RUN_MIGRATIONS,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  hashSalt: parseInt(process.env.HASH_SALT!, 10),
  nanoid: {
    customAlphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    size: 15,
  },
  // mail: {
  //   api_key: process.env.MAILGUN_API_KEY!,
  //   domain: process.env.MAILGUN_DOAMIN!,
  //   from: process.env.MAIL_FROM!,
  // },
  // timezone: process.env.TIMEZONE!,
};
