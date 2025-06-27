import { ClaveAnalisis, Analisis } from "../entities";

export interface IDataAnalisisCreate {
    clave: ClaveAnalisis;
    analisis: Analisis;
    valor?: string;
}
