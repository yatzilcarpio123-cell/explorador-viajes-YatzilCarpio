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

import {
    procesarPaises
} from "./utils/filters.js";

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
const searchInput = document.querySelector("#search-input");
const continentFilter = document.querySelector("#continent-filter")
const sortFilter = document.querySelector("#sort-filter")

//APLICAR FILTROS 
function aplicarFiltros(){
    //valor de mi input 
    const texto = searchInput.value;

    //valor continente
    const continente = continentFilter.value;

    //valor criterio de orden 
    const criterioOrden = sortFilter.value;

    const resultados = procesarPaises(paises, texto, continente, criterioOrden);

    //renderizar paises 
    renderPaises(resultados, destinationsContainer);

    //actualizar contador
    actualizarContador(resultados.length, resultsCount);
}

//registrar eventos
function registrarEventos(){
    //creo mi primer evento
    searchInput.addEventListener('input', aplicarFiltros);

    //evento continenete
    continentFilter.addEventListener('change', aplicarFiltros)

    //evento ordenamiento 
    sortFilter.addEventListener('change', aplicarFiltros)
}


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

    /*renderPaises(
        paises,
        destinationsContainer
    );*/

    /* =====================================
       ACTUALIZAR CONTADOR
    ====================================== */

    /*actualizarContador(
        paises.length,
        resultsCount
    );*/

    /* MOSTRAR RESULTADOS INICIALES */
    aplicarFiltros();


    /* REGISTRAR EVENTOSS */
    registrarEventos();
    

}


/* =========================================
   INICIAR APLICACIÓN
========================================= */

init();

