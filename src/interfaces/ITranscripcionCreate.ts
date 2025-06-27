import { Audio } from "../entities";

export interface ITranscripcionCreate {
    audio: Audio;
    transcripcion?: string;
    fileName?: string;
}
