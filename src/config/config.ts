import dotenv from "dotenv";
dotenv.config();

const config = {
    port: Number(process.env.PORT),
    dbUser: String(process.env.DB_USER),
    dbPassword: String(process.env.DB_PASS),
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT),
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
    userMail: process.env.USER_MAIL,
    passMail: process.env.USER_PASS,
    urlFront: process.env.URL_FRONT,
    apiKeyOpenAi: process.env.API_KEY,
};

export default config;
