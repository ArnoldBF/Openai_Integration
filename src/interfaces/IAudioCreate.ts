import { Servicio } from "../entities";

export interface IAudioCreate {
    servicio: Servicio;
    fileName?: string;
    cliente?: string;
    transcrito?: number;
}
