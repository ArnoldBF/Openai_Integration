import express, { Application } from "express";
import { connectDatabase, config } from "./index";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { analisisQueue } from "../queues/analisis.queue";

import {
    promptRouter,
    tipoAnalisisRouter,
    parametrosAnalisisRouter,
    claveAnalisisRouter,
    servicioRouter,
    clienteRouter,
    colaAnalisisRouter,
    claveAudioRouter,
} from "../routes";
import {
    logErrors,
    errorHandler,
    boomErrorHandler,
    uniqueConstraintErrorHandler,
} from "../middlewares/error.handler";

import cors from "cors";

class Server {
    public app: Application;
    public port: number;
    public paths: { [key: string]: string };
    // private fileManeger: FileManager;
    constructor() {
        this.app = express();
        this.port = config.port;

        this.paths = {
            users: "/api/users",
            persons: "/api/persons",
            auth: "/api/auth",
            prompts: "/api/prompts",
            tipoAnalisis: "/api/tipo-analisis",
            parametrosAnalisis: "/api/parametros-analisis",
            claveAnalisis: "/api/clave-analisis",
            servicio: "/api/servicios",
            cliente: "/api/clientes",
            colaAnalisis: "/api/cola-analisis",
            claveAudio: "/api/clave-audio",
        };

        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath("/admin/queues");
        createBullBoard({
            queues: [new BullMQAdapter(analisisQueue)],
            serverAdapter,
        });
        this.app.use("/admin/queues", serverAdapter.getRouter());

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
    }

    private routes() {
        // this.app.use(this.paths.users, userRouter);
        // this.app.use(this.paths.persons, personRouter);
        // this.app.use(this.paths.auth, authRouter);

        this.app.use(this.paths.prompts, promptRouter);
        this.app.use(this.paths.tipoAnalisis, tipoAnalisisRouter);
        this.app.use(this.paths.parametrosAnalisis, parametrosAnalisisRouter);
        this.app.use(this.paths.claveAnalisis, claveAnalisisRouter);
        this.app.use(this.paths.servicio, servicioRouter);
        this.app.use(this.paths.cliente, clienteRouter);
        this.app.use(this.paths.colaAnalisis, colaAnalisisRouter);
        this.app.use(this.paths.claveAudio, claveAudioRouter);
        this.app.use(logErrors);
        this.app.use(boomErrorHandler);
        this.app.use(uniqueConstraintErrorHandler);
        this.app.use(errorHandler);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
