import { IOpenAILangChain } from "../../interfaces/IOpenAILangChain";
import { IPromptTemplate } from "../../interfaces/IPromptTemplate";

import { OpenAIAdapter } from "../../adapters/openAILangChain.adapter";
import { PromptTemplateAdapter } from "../../adapters/promptTemplate.adapter";

export class AnalisisProcesoService {
    private openAILangChain: IOpenAILangChain;
    private promptTemplate: IPromptTemplate;

    constructor(
        openAILangChain: IOpenAILangChain,
        promptTemplate: IPromptTemplate
    ) {
        this.openAILangChain = openAILangChain;
        this.promptTemplate = promptTemplate;
    }

    public async analizarText(variables: Record<string, any>): Promise<string> {
        const prompt = await this.promptTemplate.format(variables);
        const response = await this.openAILangChain.generate([prompt]);
        return response.generations[0][0].text;
    }
}

/////Ejemplo de uso
const openAI = new OpenAIAdapter(
    "sk-proj-DzNxIGXiV30XFLAHTTB3-u2lw1qAdDok7EEasPBwAv_wDLwGRNgp1xFifw4cRgbZ3T3BlbkFJtE"
);
const promptTemplate = new PromptTemplateAdapter(
    `
Eres un analista experto en el procesamiento y análisis de grabaciones de llamadas y audios de conversación. Analiza la siguiente interacción y proporciona una respuesta precisa y estructurada.

**Detalles de la llamada:**  
- **Contexto:** {contexto}  
- **Fecha:** {fechaLlamada}  
- **Transcripción:**  
{transcripcion}  

**Aspectos a analizar:**  
{parametrosAnalisis}  

**Formato de respuesta:**  
{formatoRespuesta}  

**Instrucciones:**  
1. Sigue estrictamente el formato de respuesta indicado en {formatoRespuesta}.  
2. Usa únicamente "true" o "false" para preguntas de tipo "sí/no".  
3. Si no es posible determinar un aspecto, responde con: "No se puede determinar".  
4. Proporciona detalles adicionales únicamente si están directamente relacionados con los aspectos definidos en {parametrosAnalisis}.  
5. Asegúrate de que las respuestas sean claras, completas y objetivas.

Tu análisis debe ser preciso y objetivo, garantizando que cumpla con los requisitos establecidos.  
`,
    [
        "contexto",
        "transcripcion",
        "fechaLlamada",
        "parametrosAnalisis",
        "formatoRespuesta",
    ]
);

const analisis = new AnalisisProcesoService(openAI, promptTemplate);

const variables = {
    contexto: "venta",
    transcripcion:
        "¿Cuándo realizó su pedido usted? El anterior lunes, tenían que salir al mar. ¿Solamente un día tiene asignado de visita? Sí, solo martes. ¿O sea, visitas el día lunes para que le llegue el pedido el día martes, así? Ajá, sí. ¿Tiene lo que es a mano el código de cliente, alguna factura para que podamos hacer el registro? ¿De qué ciudad se contacta? La Paz, LP. Ya, aguárdeme un momento. Dícteme, LP. 321528. 321528. Don Víctor Molina Suñagua. Sí, sí. Ya, aguárdeme un momento. Vamos a verificar el estado del código para poder poner un... Esto es Kiosco 3, calle Baltazar, Alquisa, dice. Sí. Al frente de la plaza, primero de mayo, cuadra de la terminal. El número de teléfono es el 775-24708, ¿está correcto? Sí. Ya, me va a aguardar un momento, por favor. Esto sería un tema de distribución. ¿El preventista pasa con normalidad por su tienda? He pedido por la aplicación Llama y Preventista. Ah, ya, usted está con la aplicación... Llama y Preventista. Ya, vamos a verificar eso de si está solamente con atención de preventista, ¿sí? Sí. Exactamente, tiene atención únicamente por la aplicación. Usted realizó su pedido antes, dentro del horario, ¿cierto? Sí, el lunes a las 8 de la mañana. ¿Ha intentado hacer pedido en los otros días de la semana? No, porque... Ella me había dicho que solamente ese día podía hacer el pedido. ¿Quién le informó que solo ese día tenía para hacer pedido? ¿Cómo? ¿Quién le informó que solo ese día podía hacer pedido? ¿Sí? ¿Qué pedido? ¿Qué pedido? No le logro escuchar. Ah, dios mío. Ya. Ya listo, ¿todo se colocó o cómo? Ya, ya. Ya. Ya, ya. Don Víctor. ¿Sí? Le consultaba, ¿quién le informó a usted de que solamente el día lunes podía hacer pedido? El señor Jerry Medina. ¿Su anterior preventista? No, el señor Jerry Medina, el jefe de... Jefe de ventas. Ya. Los otros días usted puede realizar el pedido también, pero sería duplicando el monto. No sé si está en las posibilidades usted. ¿Cómo duplicando? O sea, usted tiene un monto mínimo de pedido en los otros días. O sea, usted tiene un monto mínimo de pedido en un día normal de visita. Sí. ¿Ya? Ahora, usted puede hacer pedido en otro día que no le corresponde la visita, pero vamos a tener que duplicar el monto. Ah, ya, ya. ¿Me entiendes? Ya. Aguárdame un momento que estamos haciendo registro acerca de la falta de entrega, ¿sí? Por si acaso tuviera... cuando hacemos el pedido por la aplicación, ¿no es cierto? Al finalizar nos sale pedido realizado con éxito y un número de pedido. ¿Ese número lo tiene? No lo tengo porque no tengo copia de celular. Ah, ya. Le voy a encargar que siempre lo vea. No es la primera vez que hago, pues siempre pido. Ya. O sea, no es que he hecho mal. No, le pedía que lo registre, ese número de orden, para que cuando hagamos un reclamo podamos mandarlo al área correspondiente para que tengan un respaldo de que realmente sí se hizo el pedido de manera correcta para que pueda ir de manera correcta la queja al área de distribución, ¿sí? Ah, ya. Aguárdame un momento, don Víctor. Le voy a brindar lo que es el número de ticket. Va a ser su pedido nuevamente. 32. Su código de cliente me lo dicta nuevamente. Acá lo tengo. 2578, ¿no? Ya. ¿Se va a tomar apunta, por favor, del número de ticket que le voy a brindar por la queja que hemos realizado en este momento? Para poder hacer un seguimiento. 94466 Ahora sí. ¿Ya? 944.66. Ya. Con ese número de ticket haremos un seguimiento. Sí, a la brevedad posible se contactarán con usted para poder hacer acción a este reclamo. Ya, está bien. Con más que lo colabore, don Víctor. Muy bien. Un gusto que tengas.",
    fechaLlamada: "2024-11-28",
    parametrosAnalisis: [
        "cliente",
        "fechaPedido",
        "ciudad",
        "direccion",
        "telefono",
        "preventista",
        "horarioPedido",
        "numeroTicket",
    ],

    formatoRespuesta: "JSON",
};

const prueba = analisis.analizarText(variables);

prueba.then((res) => console.log(res));
