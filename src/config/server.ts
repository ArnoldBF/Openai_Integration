import express, { Application } from "express";
import config from "../config/config";
import { connectDatabase } from "./typeOrm";
import { ProcesarArchivos } from "../helpers/managerArchivos";

// import { userRouter, personRouter, authRouter } from "../routes/index";
import {
    logErrors,
    errorHandler,
    boomErrorHandler,
} from "../middlewares/error.handler";

import cors from "cors";
// import "../utils/auth";
// import { setupSwagger } from "../documentation/swaggerConfig";
class Server {
    public app: Application;
    public port: number;
    public paths: { [key: string]: string };
    public procesarArchivos: ProcesarArchivos;

    constructor() {
        this.app = express();
        this.port = config.port;
        this.procesarArchivos = new ProcesarArchivos(
            "C:\\Users\\a.bazan\\Pictures\\imagenes"
        );

        this.paths = {
            users: "/api/users",
            persons: "/api/persons",
            auth: "/api/auth",
        };

        this.middlewares();
        this.dbConection();
        this.routes();
        // this.setupSwagger();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private async dbConection() {
        await connectDatabase();
        await this.procesarArchivos.procesarArchivos(10);
    }

    private routes() {
        // this.app.use(this.paths.users, userRouter);
        // this.app.use(this.paths.persons, personRouter);
        // this.app.use(this.paths.auth, authRouter);
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);
    }

    // private setupSwagger() {
    //     setupSwagger(this.app);
    // }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            console.log(
                `API documentation available at http://localhost:${this.port}/api-docs`
            );
        });
    }
}

export default Server;
