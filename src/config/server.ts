import express, { Application } from "express";
import { FileManager, AudioProcessor, connectDatabase, config } from "./index";
import {
    AudioService,
    DataAudioService,
    TranscripcionProcesoService,
    TranscripcionService,
    openAI,
} from "../services/index";
import { DataExtractorTxt } from "../helpers/dataExtractorTxt";
import { promptRouter } from "../routes/index";
import {
    logErrors,
    errorHandler,
    boomErrorHandler,
    uniqueConstraintErrorHandler,
} from "../middlewares/error.handler";

import cors from "cors";
// import "../utils/auth";
// import { setupSwagger } from "../documentation/swaggerConfig";

class Server {
    public app: Application;
    public port: number;
    public paths: { [key: string]: string };
    public fileManeger: FileManager;
    constructor() {
        this.app = express();
        this.port = config.port;

        // Inyectar dependencias en AudioProcessor y FileManeger
        const audioService = new AudioService();
        const dataAudioService = new DataAudioService();
        const dataExtractor = new DataExtractorTxt();
        const transcripcionService = new TranscripcionService();
        const transcripcionProcesoService = new TranscripcionProcesoService(
            openAI
        );

        const audioProcessor = new AudioProcessor(
            audioService,
            dataAudioService,
            transcripcionProcesoService,
            dataExtractor,
            transcripcionService
        );

        this.fileManeger = new FileManager(
            "C:\\Users\\a.bazan\\Music\\prueba1",
            audioProcessor
        );

        this.paths = {
            users: "/api/users",
            persons: "/api/persons",
            auth: "/api/auth",
            prompts: "/api/prompts",
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
        // await this.fileManeger.procesarArchivos(10);
    }

    private routes() {
        // this.app.use(this.paths.users, userRouter);
        // this.app.use(this.paths.persons, personRouter);
        // this.app.use(this.paths.auth, authRouter);

        this.app.use(this.paths.prompts, promptRouter);
        this.app.use(logErrors);
        this.app.use(boomErrorHandler);
        this.app.use(uniqueConstraintErrorHandler);
        this.app.use(errorHandler);
    }

    // private setupSwagger() {
    //     setupSwagger(this.app);
    // }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            // console.log(
            //     `API documentation available at http://localhost:${this.port}/api-docs`
            // );
        });
    }
}

export default Server;
