import config from "../config/config";
export const configEntities = [
    config.nodeEnv === "production"
        ? "dist/entities/*.js"
        : "src/entities/*.ts",
];

export const configMigrations = [
    config.nodeEnv === "production"
        ? "dist/db/migrations/*.js"
        : "src/db/migrations/*.ts",
];
