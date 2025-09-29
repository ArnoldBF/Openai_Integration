import { Worker } from "bullmq";
import { AppDataSource } from "../config/typeOrm";
import {
    configurarAnalisis,
    analizarTranscripcionesBatch,
} from "../useCases/configurarAnalisis";

async function startWorker() {
    // Inicializa TypeORM antes de crear el worker
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("TypeORM DataSource inicializado en el worker.");
    }

    const worker = new Worker(
        "analisis",
        async (job) => {
            // const { parametrosAnalisis, servicio, filtroArchivos } = job.data;
            // const resultado = await configurarAnalisis(
            //     parametrosAnalisis,
            //     servicio,
            //     filtroArchivos
            // );

            // return resultado;
            switch (job.name) {
                case "procesoCompleto":
                    return await configurarAnalisis(
                        job.data.parametrosAnalisis,
                        job.data.servicio,
                        job.data.filtroArchivos
                    );
                case "procesoEspecifico":
                    return await analizarTranscripcionesBatch(
                        job.data.servicio,
                        job.data.filtroArchivos,
                        job.data.parametroAnalisis
                    );
                default:
                    throw new Error(`Tipo de job no soportado: ${job.name}`);
            }
        },
        {
            connection: {
                host: "localhost",
                port: 6379,
            },
            concurrency: 2,
            lockDuration: 12600000, // 3.5 horas en milisegundos
        }
    );

    worker.on("completed", (job) => {
        console.log(`Job ${job.id} completado`);
    });

    worker.on("failed", (job, err) => {
        console.error(`Job ${job?.id} falló:`, err);
    });
}

startWorker();
