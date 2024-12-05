import config from "../config/config";
export const configEntities = [
    config.nodeEnv === "production"
        ? "dist/src/models/*.js"
        : "src/models/*.ts",
];

export const configMigrations = [
    config.nodeEnv === "production"
        ? "dist/src/db/migrations/*.js"
        : "src/db/migrations/*.ts",
];
