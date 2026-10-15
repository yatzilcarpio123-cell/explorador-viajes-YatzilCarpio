/*======================
comunicación con la API de países
===================================*/

/* CONFIGURACIÓN DE LA API */
const API_URL = "https://juancognitus.github.io/explorador-viajes-api/paises.json";

/* OBTENER PAÍSES */
export async function obtenerPaises(){
    try {
        /* REALIZAR PETICIÓN HTTP */
    const response = await fetch(API_URL);

    /* VALIDAR RESPUESTA HTTP */
    if(!response.ok){
        throw new Error(
            `Error HTTP: ${response.status}`
        );
    }

    /* CONVERTIR RESPUESTA A JSON */
    const result = await response.json();
    console.log('Respuesta completa de la API:', result);

    /* OBTENER ARREGLO DE PAÍSES */
    const paises = result;

    /* RETORNAR RESULTADO */
    return paises;
        
    } catch (error) {
        /* MANEJO DE ERRORES  */
        console.error('Error al obtener los países:', error);
        return[];
        
    }
    
} 