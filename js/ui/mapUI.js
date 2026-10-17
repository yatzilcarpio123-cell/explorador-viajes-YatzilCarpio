/* MAPA - Integración de leaflet */

/* Instancia actual del mapa */
let mapaActual = null;

/* DESTRUIR MAPA ACTUAL */
export function destruirMapa(){
    if(mapaActual){
        mapaActual.remove();
        mapaActual = null;
    }
}

/* CREAR MAPA */
export function crearMapa(latitud, longitud, nombre){
    /* VALIDAR COORDENADAS */
    if(
        typeof latitud !== "number" || typeof longitud !== "number"
    ){
        console.warn("Coordenadas no disponibles");
        return;
    }

    /* ELIMINAR MAPA */
    destruirMapa();

    /* INICIALIZAR LEAFLET */
    mapaActual = L.map("destination-map").setView(
        [latitud, longitud], 4
    );

    /* AGREGAR CAPA DE OPENSTREETMAP */
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(mapaActual);

    /* AGREGAR MARCADOR */
    L.marker(
        [
            latitud,
            longitud
        ]
    )
        .addTo(mapaActual)
        .bindPopup(
            `<strong>${nombre}</strong>`
        )
        .openPopup();
}