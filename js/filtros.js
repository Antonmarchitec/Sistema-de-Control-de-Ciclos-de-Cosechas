/*
=========================================================
FILTROS.JS
=========================================================
*/

function normalizarEstadoFiltro(estado) {

    return String(estado || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_");

}


function filtrarEstado(estado) {

    //=====================================================
    // MOSTRAR TODOS
    //=====================================================

    if (estado === "TODOS") {

        mostrarTabla(datosActuales);

        return;

    }


    //=====================================================
    // NORMALIZAR ESTADO SELECCIONADO
    //=====================================================

    const estadoBuscado = normalizarEstadoFiltro(estado);


    //=====================================================
    // FILTRAR
    //=====================================================

    const datos = datosActuales.filter(fila =>

        normalizarEstadoFiltro(fila.ESTADO) === estadoBuscado

    );


    //=====================================================
    // MOSTRAR RESULTADO
    //=====================================================

    mostrarTabla(datos);

}


window.filtrarEstado = filtrarEstado;