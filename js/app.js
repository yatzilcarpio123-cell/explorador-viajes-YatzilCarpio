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
    actualizarContador,
    mostrarDetalle,
    cerrarDetalle
} from "./ui/ui.js";

import {
    crearMapa,
    destruirMapa
} from "./ui/mapUI.js"

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

const detailModal = document.querySelector("#detail-modal");
const detailModalContent = document.querySelector("#detail-modal-content");

/* BUSCAR PAÍS POR CODIGO */
function obtenerPaisPorCodigo(codigo){
    return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}

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

/* ABRIR DETALLE DEL DESTINO */
function abrirDetalle(codigo){
    const pais = obtenerPaisPorCodigo(codigo);

    if(!pais){
        console.warn("País no encontrado");
        return;
    }

    const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);

    /* CREAR MAPA DEL DESTINO */
    setTimeout(
        () => {
            crearMapa(
                datosMapa.latitud,
                datosMapa.longitud,
                datosMapa.nombre
            );
        },
        0
    );
}

/* CERRAR MODAL DETALLE  */
    function cerrarModalDetalle(){
        destruirMapa();
        cerrarDetalle(
            detailModal,
            detailModalContent
        );
    }


//registrar eventos
function registrarEventos(){
    //creo mi primer evento
    searchInput.addEventListener('input', aplicarFiltros);

    //evento continenete
    continentFilter.addEventListener('change', aplicarFiltros)

    //evento ordenamiento 
    sortFilter.addEventListener('change', aplicarFiltros);

    /* ACCIONES DE LAS TARJETAS */
    destinationsContainer.addEventListener(
        "click",
        (event) => {
            const boton =
            event.target.closest(
                "[data-action]"
            );
        if(!boton){
            return;
        }
        const accion = boton.dataset.action;
        const codigo = boton.dataset.countryCode;

        if(accion === "detail"){
            abrirDetalle(codigo);
        }
        
        }
    );
    

    /* CERRAR MODAL */
    detailModal.addEventListener(
        "click",
        (event) => {
            if (
                event.target.id === "btn-close-detail"
            ){
                cerrarModalDetalle();
                return;
            }

            if(
                event.target === detailModal
            ){
                cerrarModalDetalle();
            }
        }
    );

    /* CERRAR MODAL CON ESCAPE */
    document.addEventListener(
        "keydown", (event) => {
            if(
                event.key === "Escape" &&
                !detailModal.classList.contains(
                    "hidden"
                )
            ){
                cerrarModalDetalle();
            }
        }
    );
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

