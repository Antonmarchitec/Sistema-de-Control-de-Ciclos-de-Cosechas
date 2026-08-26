/*
=========================================================
CALENDARIO.JS
Motor de fechas del sistema de gestión de cosechas
=========================================================
*/


///=========================================================
// OBTENER FECHA ACTUAL
//=========================================================
    

function obtenerFechaActual() {
    //return new Date(2026, 7, 23, 18, 0);
    return new Date();

}


//=========================================================
// OBTENER CONFIGURACIÓN
//=========================================================

function obtenerConfiguracion(nombreArchivo) {

    return {

        ciclo: nombreArchivo
            .replace(".xlsx", "")
            .toUpperCase()

    };

}


//=========================================================
// CALCULAR FECHA DE INICIO
//=========================================================

function calcularFechaInicio(fila, configuracion) {

    const hoy = obtenerFechaActual();

    const dia = Number(fila.DIA_ASIGNACION);


    if (isNaN(dia)) {

        return null;

    }


    return obtenerFechaInicioRegla(

        hoy,

        dia

    );

}


//=========================================================
// CALCULAR FECHA DE FIN
//=========================================================

function calcularFechaFin(

    fechaInicio,

    configuracion,

    fila

) {

    if (!fechaInicio) {

        return null;

    }


    const dias = obtenerDuracion(
        fila.DISCADOR
    );


    //////////////---
    const fechaEspecial = obtenerFechaFinEspecial(
        fila,
        fechaInicio
    );

    if (fechaEspecial) {

        return fechaEspecial;

    }
    //////////////---


    
    return sumarDias(

        fechaInicio,

        Math.max(0, dias - 1)

    );

}


//=========================================================
// SUMAR DÍAS
//=========================================================

function sumarDias(fecha, dias) {

    const nuevaFecha = new Date(fecha);

    nuevaFecha.setDate(

        nuevaFecha.getDate() + dias

    );

    return nuevaFecha;

}


//=========================================================
// FORMATEAR FECHA
//=========================================================

function formatearFecha(fecha) {

    if (!fecha) {

        return "";

    }

    const dia = String(
        fecha.getDate()
    ).padStart(2, "0");

    const mes = String(
        fecha.getMonth() + 1
    ).padStart(2, "0");

    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;

}


//=========================================================
// CALCULAR ESTADO
//=========================================================

//=========================================================
// CALCULAR ESTADO
//=========================================================

function calcularEstado(

    fechaActual,

    fechaInicio,

    fechaFin,

    fila

) {

    // Fecha sin hora (para las comparaciones normales)
    const fecha = new Date(

        fechaActual.getFullYear(),

        fechaActual.getMonth(),

        fechaActual.getDate()

    );


    if (!fechaInicio || !fechaFin) {

        return {

            estado: "PENDIENTE",

            progreso: 0

        };

    }

   
    //=====================================================
    // REGLA ESPECIAL (2F, 3F Y ETAPA 5)
    //=====================================================

   const estadoEspecial = obtenerEstadoEspecial(
    
        fila,

        fechaActual,

        fechaFin

      

    );

    
    if (estadoEspecial !== null) {

        return {

            estado: estadoEspecial,

            progreso: estadoEspecial === "FINALIZADA"

                ? 100

                : 0

        };

    }


    //=====================================================
    // LÓGICA NORMAL
    //=====================================================

    if (fecha < fechaInicio) {

        return {

            estado: "PROXIMA",

            progreso: 0

        };

    }


    if (fecha > fechaFin) {

        return {

            estado: "FINALIZADA",

            progreso: 100

        };

    }


    const totalDias = diferenciaDias(

        fechaInicio,

        fechaFin

    ) + 1;


    const diasTranscurridos = diferenciaDias(

        fechaInicio,

        fecha

    ) + 1;


    const progreso = Math.round(

        (diasTranscurridos / totalDias) * 100

    );


    return {

        estado: "EN_CURSO",

        progreso

    };

}


//=========================================================
// DIFERENCIA DE DÍAS
//=========================================================

function diferenciaDias(

    inicio,

    fin

) {

    const ms = fin - inicio;

    return Math.floor(

        ms / (1000 * 60 * 60 * 24)

    );

}


//=========================================================
// MOSTRAR FECHA ACTUAL
//=========================================================

function mostrarFechaActual() {

    const elemento = document.querySelector("#fechaActual");

    if (!elemento) {

        return;

    }

    elemento.textContent = formatearFecha(

        obtenerFechaActual()

    );

}