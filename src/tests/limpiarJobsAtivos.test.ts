const { Queue } = require("bullmq");

async function limpiarActivos() {
    const queue = new Queue("analisis", {
        connection: { host: "localhost", port: 6379 },
    });

    const activos = await queue.getActive();
    for (const job of activos) {
        await job.remove();
        console.log(`Job ${job.id} eliminado`);
    }
    await queue.close();
}

limpiarActivos();
