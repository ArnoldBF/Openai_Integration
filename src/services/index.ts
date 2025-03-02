import { AnalisisProcesoService } from "./analisis/analisis.proceso.service";
import { AudioService, AudioInterface } from "./audios/audio.service";
import {
    DataAudioService,
    DataAudioInterface,
} from "./audios/dataAudio.service";
import {
    TranscripcionProcesoService,
    openAI,
} from "./transcripcion/transcribir.proceso.service";
import { TranscripcionService } from "./transcripcion/transcripcion.service";

import {
    PromptService,
    PromptInterface,
    updatePrompt,
} from "./prompts/prompt.service";

import { ClaveAudioService } from "./audios/claveAudio.service";

export {
    AnalisisProcesoService,
    AudioService,
    AudioInterface,
    DataAudioService,
    DataAudioInterface,
    TranscripcionProcesoService,
    openAI,
    TranscripcionService,
    PromptService,
    PromptInterface,
    updatePrompt,
    ClaveAudioService,
};
