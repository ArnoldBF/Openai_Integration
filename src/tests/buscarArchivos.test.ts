// import fs from "fs/promises";
// import path from "path";

// interface ResultadoMovimientoArchivos {
//     movidos: string[];
//     errores: { archivo: string; error: any }[];
// }

// (async (
//     ruta: string,
//     destino: string,
//     filtro: string[]
// ): Promise<ResultadoMovimientoArchivos> => {
//     const listadoArchivos = await fs.readdir(ruta);

//     const archivosFiltrados = listadoArchivos.filter((nombre) =>
//         filtro.some((id) => nombre.includes(id))
//     );

//     const movidos: string[] = [];
//     const errores: { archivo: string; error: any }[] = [];

//     for (const nombre of archivosFiltrados) {
//         const rutaCompleta = path.join(ruta, nombre);
//         try {
//             const stat = await fs.stat(rutaCompleta);
//             if (stat.isFile()) {
//                 const destinoCompleto = path.join(destino, nombre);
//                 await fs.rename(rutaCompleta, destinoCompleto);
//                 movidos.push(nombre);
//                 console.log(`Movido: ${nombre} -> ${destinoCompleto}`);
//             }
//         } catch (err) {
//             errores.push({ archivo: nombre, error: err });
//             console.error(`Error moviendo ${nombre}:`, err);
//         }
//     }

//     console.log("Archivos movidos:", movidos);
//     if (errores.length > 0) {
//         console.log("Errores:", errores);
//     }
//     return { movidos, errores };
// })("C:\\Users\\a.bazan\\Music\\prueba1", "C:\\Users\\a.bazan\\Music\\prueba2", [
//     "316858120990097713",
//     "316858086659916143",
//     "316858245647237404",
//     "316858142571168020",
//     "316857880601952443",
//     "316859439680258402",
//     "316857979416084582",
//     "316859456932938082",
//     "316858946234286360",
//     "316857971345981626",
//     "316857962864902419",
//     "316858366671061098",
//     "316859006717722990",
//     "316858109186801851",
//     "316859406203879731",
//     "316857318554992827",
//     "316858847840174434",
//     "316858890343153944",
//     "316857516208947305",
//     "316858126156038419",
//     "316858426939801883",
//     "316858447626633491",
//     "316858619879227496",
//     "316858980595794022",
//     "316069062631489904",
//     "316074195609583894",
// ]);
