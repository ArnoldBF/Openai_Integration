import { Worker } from "bullmq";
import { AppDataSource } from "../config/typeOrm";
import { configurarAnalisis } from "../useCases/configurarAnalisis";

async function startWorker() {
    // Inicializa TypeORM antes de crear el worker
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("TypeORM DataSource inicializado en el worker.");
    }

    const worker = new Worker(
        "analisis",
        async (job) => {
            const { parametroAnalisis, servicio, filtroArchivos } = job.data;
            await configurarAnalisis(
                parametroAnalisis,
                servicio,
                filtroArchivos
            );
        },
        {
            connection: {
                host: "localhost",
                port: 6379,
            },
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
