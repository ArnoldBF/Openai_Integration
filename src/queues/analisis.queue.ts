import { Queue } from "bullmq";

export const analisisQueue = new Queue("analisis", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
