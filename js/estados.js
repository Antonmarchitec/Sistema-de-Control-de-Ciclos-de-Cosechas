/*
=========================================================
ESTADOS.JS
Calcula el estado de las cosechas
=========================================================
*/


//=========================================================
// ESTADOS
//=========================================================

const ESTADOS = {


    FINALIZADA: {

        nombre: "FINALIZADA",

        color: "#16a34a",

        clase: "finalizada"

    },


    EN_CURSO: {

        nombre: "EN CURSO",

        color: "#2563eb",

        clase: "en-curso"

    },


    PROXIMA: {

        nombre: "PRÓXIMA",

        color: "#facc15",

        clase: "proxima"

    }


};





//=========================================================
// CONVERTIR FECHA ACTUAL
//=========================================================

function convertirFechaActual(fechaActual) {


    if (fechaActual instanceof Date) {


        return fechaActual;


    }


    return new Date(

        fechaActual.anio,

        fechaActual.mes,

        fechaActual.dia

    );


}





//=========================================================
// OBTENER ESTADO
//=========================================================

function obtenerEstado(

    fechaActual,

    fechaInicio,

    fechaFin

) {


    const fecha = convertirFechaActual(

        fechaActual

    );



    if (

        fecha < fechaInicio

    ) {


        return ESTADOS.PROXIMA;


    }




    if (

        fecha > fechaFin

    ) {


        return ESTADOS.FINALIZADA;


    }




    return ESTADOS.EN_CURSO;


}





//=========================================================
// PORCENTAJE DE AVANCE
//=========================================================

function calcularProgreso(

    fechaActual,

    fechaInicio,

    fechaFin

) {


    const fecha = convertirFechaActual(

        fechaActual

    );



    if (

        fecha < fechaInicio

    ) {


        return 0;


    }



    if (

        fecha > fechaFin

    ) {


        return 100;


    }




    const totalDias =

        fechaFin.getTime() -

        fechaInicio.getTime();





    const transcurrido =

        fecha.getTime() -

        fechaInicio.getTime();





    return Math.round(

        (transcurrido / totalDias) * 100

    );


}





//=========================================================
// INFORMACION COMPLETA DEL ESTADO
//=========================================================

function calcularEstado(

    fechaActual,

    fechaInicio,

    fechaFin

) {



    const estado = obtenerEstado(

        fechaActual,

        fechaInicio,

        fechaFin

    );




    return {


        estado: estado.nombre,


        color: estado.color,


        clase: estado.clase,


        progreso: calcularProgreso(

            fechaActual,

            fechaInicio,

            fechaFin

        ),


        inicio: fechaInicio,


        fin: fechaFin


    };


}





//=========================================================
// FORMATEAR FECHA
//=========================================================

function formatear(fecha) {


    return fecha.toLocaleDateString(

        "es-BO"

    );


}





//=========================================================
// PRUEBA
//=========================================================

console.log("================================");

console.log("ESTADOS.JS CARGADO");

console.log("================================");