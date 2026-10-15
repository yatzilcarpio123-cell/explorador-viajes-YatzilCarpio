/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */


/* =========================================
   IMPORTACIONES
========================================= */

import {
    obtenerPaises
} from "./api/countriesApi.js";


import {
    mostrarCargando,
    mostrarError,
    renderPaises,
    actualizarContador
} from "./ui/ui.js";


/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */

let paises = [];


/* =========================================
   REFERENCIAS DEL DOM
========================================= */

const destinationsContainer =
    document.querySelector(
        "#destinations-container"
    );

const resultsCount =
    document.querySelector(
        "#results-count"
    );


/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */

async function init() {

    console.log(
        "Explorador de Viajes iniciado"
    );


    /* =====================================
       MOSTRAR ESTADO DE CARGA
    ====================================== */

    mostrarCargando(
        destinationsContainer
    );


    /* =====================================
       OBTENER PAÍSES DESDE LA API
    ====================================== */

    paises =
        await obtenerPaises();


    /* =====================================
       COMPROBAR RESULTADOS
    ====================================== */

    console.log(
        "Países obtenidos:",
        paises
    );


    /* =====================================
       VALIDAR SI LA API RETORNÓ DATOS
    ====================================== */

    if (paises.length === 0) {

        mostrarError(
            destinationsContainer
        );

        actualizarContador(
            0,
            resultsCount
        );

        return;

    }


    /* =====================================
       RENDERIZAR DESTINOS
    ====================================== */

    renderPaises(
        paises,
        destinationsContainer
    );


    /* =====================================
       ACTUALIZAR CONTADOR
    ====================================== */

    actualizarContador(
        paises.length,
        resultsCount
    );

}


/* =========================================
   INICIAR APLICACIÓN
========================================= */

init();
