import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";
import { configEntities, configMigrations } from "../db/config";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: false,
    logging: false,
    entities: configEntities,
    migrations: configMigrations,
    subscribers: [],
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
});

export async function connectDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        // await AppDataSource.runMigrations();
        console.log(
            "Entities:",
            AppDataSource.entityMetadatas.map((e) => e.name)
        );
    } catch (err) {
        console.error("Error during Data Source initialization", err);
    }
}

export async function migrationRun() {
    try {
        await AppDataSource.runMigrations();
        return "Migrations have been run!";
    } catch (err) {
        return `Error during migrations run : ${err}`;
    }
}

// migrationRun()
//     .then((r) => console.log(r))
//     .catch((e) => console.error(e));
