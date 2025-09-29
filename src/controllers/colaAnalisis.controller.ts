import { Request, Response, NextFunction } from "express";
import { analisisQueue } from "../queues/analisis.queue";
import { ParametroAnalisisService } from "../services/analisis/parametroAnalisis.service";
import { ServicioService } from "../services/servicios/servicio.service";

export async function crearColaAnalisis(
    req: Request,
    res: Response
): Promise<any> {
    const { servicio, userName } = (req as any).user;
    const { parametrosAnalisis, filtroArchivos } = req.body;

    const parametroAnalisisService = new ParametroAnalisisService();
    const existeParametro = await parametroAnalisisService.getParametroById(
        parametrosAnalisis
    );

    const servicioService = new ServicioService();
    const existeServicio = await servicioService.getServicioById(servicio);

    if (existeParametro === null) {
        return res.status(404).json({
            error: "ParametroNotFound",
            message: "Parámetro de análisis no encontrado",
        });
    }

    if (existeServicio === null) {
        return res.status(404).json({
            error: "ServicioNotFound",
            message: "Servicio no encontrado",
        });
    }

    await analisisQueue.add("procesoCompleto", {
        userName,
        parametrosAnalisis,
        servicio,
        filtroArchivos,
    });
    res.status(201).json({
        message: "Análisis en cola para procesamiento",
    });
}

export async function crearColaAnalisisParaAnalisisEspecifico(
    req: Request,
    res: Response
): Promise<any> {
    const { servicio, userName } = (req as any).user;
    const { parametrosAnalisis, filtroArchivos } = req.body;

    const parametroAnalisisService = new ParametroAnalisisService();
    const existeParametro = await parametroAnalisisService.getParametroById(
        parametrosAnalisis
    );

    const servicioService = new ServicioService();
    const existeServicio = await servicioService.getServicioById(servicio);

    if (existeParametro === null) {
        return res.status(404).json({
            error: "ParametroNotFound",
            message: "Parámetro de análisis no encontrado",
        });
    }

    if (existeServicio === null) {
        return res.status(404).json({
            error: "ServicioNotFound",
            message: "Servicio no encontrado",
        });
    }

    await analisisQueue.add("procesoEspecifico", {
        userName,
        parametrosAnalisis,
        servicio,
        filtroArchivos,
    });
    res.status(201).json({
        message: "Análisis en cola para procesamiento",
    });
}

export async function estadoColaAnalisis(req: Request, res: Response) {
    const waiting = await analisisQueue.getWaiting();
    const active = await analisisQueue.getActive();
    const completed = await analisisQueue.getCompleted();
    const failed = await analisisQueue.getFailed();
    res.json({ waiting, active, completed, failed });
}
