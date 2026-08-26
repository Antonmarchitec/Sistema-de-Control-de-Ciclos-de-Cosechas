/*
=========================================================
REGLAS.JS
Motor de reglas del sistema de gestión de cosechas
=========================================================
*/


//=========================================================
// CONFIGURACIÓN DE LOS CICLOS
//=========================================================

const REGLAS = {

    "1F": {

        dias: 15

    },

    "2F": {

        dias: 30

    },

    "3F": {

        dias: 30

    },

    "ETAPA 5": {

        dias: 30

    }

};


//=========================================================
// OBTENER REGLA DEL CICLO
//=========================================================

function obtenerRegla(ciclo){

    return REGLAS[ciclo.toUpperCase()] || null;

}


//=========================================================
// OBTENER DURACIÓN DEL CICLO
//=========================================================SIII

function obtenerDuracion(ciclo){

    const regla = obtenerRegla(ciclo);

    if(!regla){

        return 0;

    }

    return regla.dias;

}


//=========================================================
// VALIDAR CICLO
//=========================================================

function existeCiclo(ciclo){

    return REGLAS.hasOwnProperty(

        ciclo.toUpperCase()

    );

}




function obtenerFechaInicioRegla(fechaActual, diaAsignacion){

    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth();

    if(diaAsignacion > fechaActual.getDate()){

        mes--;

    }

    return new Date(

        año,

        mes,

        diaAsignacion

    );

}

window.obtenerFechaInicioRegla = obtenerFechaInicioRegla;
/////////////////////------




//=========================================================SIIII
// FECHAS ESPECIALES
//=========================================================

function obtenerFechaFinEspecial(fila, fechaInicio) {

    const ciclo = Number(fila.CICLO);

    //=====================================================
    // REGLA GENERAL
    // El ciclo 1 siempre termina el último día del mes
    // (1F, 2F, 3F y ETAPA 5)
    //=====================================================

    if (ciclo === 1) {

        return new Date(
            fechaInicio.getFullYear(),
            fechaInicio.getMonth() + 1,
            0
        );

    }


    //=====================================================
    // Sin regla especial
    //=====================================================

    return null;

}




//=========================================================
// REGLA ESPECIAL DE ESTADOS
// 2F - 3F - ETAPA 5
//=========================================================SIII

function obtenerEstadoEspecial(

    fila,

    fechaActual,

    fechaFin

) {

    const discador = String(fila.DISCADOR).toUpperCase();

    // Solo aplica a estos discadores
    if (

        discador !== "2F" &&
        discador !== "3F" &&
        discador !== "ETAPA 5"

    ) {

        return null;

    }


    // Día de transición = un día después de la fecha de fin
    const fechaTransicion = new Date(fechaFin);

    fechaTransicion.setDate(

        fechaTransicion.getDate() + 1

    );


    
    // Comparar solo la fecha (sin hora)
    const hoy = new Date(

        fechaActual.getFullYear(),

        fechaActual.getMonth(),

        fechaActual.getDate()

    );

    const transicion = new Date(

        fechaTransicion.getFullYear(),

        fechaTransicion.getMonth(),

        fechaTransicion.getDate()

    );

    // Si hoy no es el día de transición,
    // continúa con la lógica normal
    if (

        hoy.getTime() !== transicion.getTime()

    ) {

        return null;

    }

    // Hora actual en minutos
    const minutos =

        fechaActual.getHours() * 60 +

        fechaActual.getMinutes();

    // 15:00 = 900 minutos
    if (minutos <= 900) {

        return "FINALIZADA";

    }

    return "PROXIMA";

    }



/*
=========================================================
REGLAS.JS
Motor de reglas del sistema de cosechas
=========================================================
*/



//=========================================================
// REGLAS ESPECIALES DE FECHAS
//=========================================================



//=========================================================
// EXPORTAR
//=========================================================

window.obtenerFechaFinEspecial = obtenerFechaFinEspecial;
window.obtenerRegla = obtenerRegla;
window.obtenerDuracion = obtenerDuracion;
window.existeCiclo = existeCiclo;





//=========================================================
// MOTOR DE REGLAS 1F
//
// Las fechas visibles corresponden siempre al último
// período EN CURSO del ciclo.
//
// El ESTADO cambia según la secuencia:
// EN_CURSO → FINALIZADA → PROXIMA
//
// Cuando inicia un nuevo EN_CURSO,
// las fechas visuales se actualizan.
//=========================================================

const REGLAS_1F = {

    //=====================================================
    // CICLO 1
    //=====================================================

    1: {

        enCurso: {

            inicio: 16,
            fin: "ULTIMO_DIA",

            // Mes actual
            mesInicio: 0,
            mesFin: 0

        },

        finalizada: {

            inicio: 1,
            fin: 10,

            // Mes siguiente
            mesInicio: 1,
            mesFin: 1

        },

        proxima: {

            inicio: 11,
            fin: 15,

            // Mes siguiente
            mesInicio: 1,
            mesFin: 1

        }

    },


    //=====================================================
    // CICLO 6
    //=====================================================

    6: {

        enCurso: {

            inicio: 22,
            fin: 5,

            // 22 MC → 05 MS
            mesInicio: 0,
            mesFin: 1

        },

        finalizada: {

            inicio: 6,
            fin: 15,

            // Mes siguiente
            mesInicio: 1,
            mesFin: 1

        },

        proxima: {

            inicio: 16,
            fin: 21,

            // Mes siguiente
            mesInicio: 1,
            mesFin: 1

        }

    },


    //=====================================================
    // CICLO 15
    //=====================================================

    15: {

        enCurso: {

            inicio: 2,
            fin: 14,

            // Mes actual
            mesInicio: 0,
            mesFin: 0

        },

        finalizada: {

            inicio: 15,
            fin: 25,

            // Mes actual
            mesInicio: 0,
            mesFin: 0

        },

        proxima: {

            inicio: 26,
            fin: 1,

            // 26 MC → 01 MS
            mesInicio: 0,
            mesFin: 1

        }

    },


    //=====================================================
    // CICLO 21
    //=====================================================

    21: {

        enCurso: {

            inicio: 7,
            fin: 20,

            // Mes actual
            mesInicio: 0,
            mesFin: 0

        },

        finalizada: {

            inicio: 21,
            fin: 1,

            // 21 MC → 01 MS
            mesInicio: 0,
            mesFin: 1

        },

        proxima: {

            inicio: 2,
            fin: 6,

            // Mes siguiente
            mesInicio: 1,
            mesFin: 1

        }

    }

};










//=========================================================
// MOTOR DE REGLAS 2F - 3F - ETAPA 5
//
// Las fechas visuales corresponden siempre al período
// EN_CURSO vigente.
//
// El estado cambia según:
//
// EN_CURSO → FINALIZADA → PROXIMA
//
// La transición entre FINALIZADA y PROXIMA
// depende de la hora.
//=========================================================
const REGLAS_2F_3F_ETAPA5 = {


    //=====================================================
    // CICLO 1
    //=====================================================

    1: {

        enCurso: {

            inicio: 2,

            fin: "ULTIMO_DIA",

            mesInicio: 0,

            mesFin: 0

        },


        finalizada: {

            dia: 1,

            mes: 1,

            horaFin: "15:00"

        },


        proxima: {

            dia: 1,

            mes: 1,

            horaInicio: "15:01"

        }

    },



    //=====================================================
    // CICLO 6
    //=====================================================

    6: {

        enCurso: {

            inicio: 7,

            fin: 5,

            mesInicio: 0,

            mesFin: 1

        },


        finalizada: {

            dia: 6,

            mes: 1,

            horaFin: "15:00"

        },


        proxima: {

            dia: 6,

            mes: 1,

            horaInicio: "15:01"

        }

    },



    //=====================================================
    // CICLO 15
    //=====================================================

    15: {

        enCurso: {

            inicio: 16,

            fin: 14,

            mesInicio: 0,

            mesFin: 1

        },


        finalizada: {

            dia: 15,

            mes: 1,

            horaFin: "15:00"

        },


        proxima: {

            dia: 15,

            mes: 1,

            horaInicio: "15:01"

        }

    },



    //=====================================================
    // CICLO 21
    //=====================================================

    21: {

        enCurso: {

            inicio: 22,

            fin: 20,

            mesInicio: 0,

            mesFin: 1

        },


        finalizada: {

            dia: 21,

            mes: 1,

            horaFin: "15:00"

        },


        proxima: {

            dia: 21,

            mes: 1,

            horaInicio: "15:01"

        }

    }


};





//=========================================================
// OBTENER PERÍODO EN CURSO VIGENTE
// 2F - 3F - ETAPA 5
//
// Las fechas visuales corresponden siempre al último
// período EN CURSO iniciado.
//
// FINALIZADA y PROXIMA mantienen estas fechas.
//=========================================================

function obtenerPeriodoEnCurso2F3F5(ciclo, fechaActual) {


    const regla = REGLAS_2F_3F_ETAPA5[ciclo];


    if (!regla) {

        return null;

    }


    //=====================================================
    // FECHA ACTUAL
    //=====================================================

    const anio = fechaActual.getFullYear();

    const mes = fechaActual.getMonth();

    const dia = fechaActual.getDate();



    //=====================================================
    // DETERMINAR MES DEL ÚLTIMO EN CURSO
    //=====================================================

    let mesInicio = mes;


    /*
    Si todavía no llegó el día de inicio
    del EN CURSO del mes actual,

    el período vigente pertenece
    al mes anterior.
    */

    if (dia < regla.enCurso.inicio) {

        mesInicio--;

    }



    //=====================================================
    // CONSTRUIR FECHA INICIO
    //=====================================================

    const fechaInicio = construirFecha(

        anio,

        mesInicio,

        0,

        regla.enCurso.inicio

    );



    //=====================================================
    // CONSTRUIR FECHA FIN
    //=====================================================

    let fechaFin;



    if (regla.enCurso.fin === "ULTIMO_DIA") {


        fechaFin = new Date(

            fechaInicio.getFullYear(),

            fechaInicio.getMonth() + 1,

            0

        );


    }

    else {


        fechaFin = construirFecha(

            fechaInicio.getFullYear(),

            fechaInicio.getMonth(),

            regla.enCurso.mesFin,

            regla.enCurso.fin

        );


    }



    return {

        fechaInicio,

        fechaFin

    };

}




//=========================================================
// DETERMINAR ESTADO
// 2F - 3F - ETAPA 5
//
// Evalúa:
// EN_CURSO
// FINALIZADA
// PROXIMA
//
// Las fechas visuales vienen del período EN_CURSO.
//=========================================================

function obtenerEstado2F3F5(fila, fechaActual) {


    const ciclo = Number(fila.CICLO);


    const regla = REGLAS_2F_3F_ETAPA5[ciclo];


    if (!regla) {

        return null;

    }



    //=====================================================
    // OBTENER PERÍODO EN CURSO VIGENTE
    //=====================================================

    const periodo = obtenerPeriodoEnCurso2F3F5(

        ciclo,

        fechaActual

    );


    if (!periodo) {

        return null;

    }


    const fechaInicio = periodo.fechaInicio;

    const fechaFin = periodo.fechaFin;



    //=====================================================
    // FECHA ACTUAL SIN HORA
    //=====================================================

    const hoy = new Date(

        fechaActual.getFullYear(),

        fechaActual.getMonth(),

        fechaActual.getDate()

    );



    //=====================================================
    // DÍA SIGUIENTE AL FIN DEL CICLO
    //=====================================================

    const fechaTransicion = new Date(fechaFin);

    fechaTransicion.setDate(

        fechaTransicion.getDate() + 1

    );



    let estado;



    //=====================================================
    // EN CURSO
    //=====================================================

    if (

        hoy >= fechaInicio &&

        hoy <= fechaFin

    ) {

        estado = "EN_CURSO";

    }


    //=====================================================
    // DÍA DE TRANSICIÓN
    //=====================================================

    else if (

        hoy.getTime() ===

        new Date(

            fechaTransicion.getFullYear(),

            fechaTransicion.getMonth(),

            fechaTransicion.getDate()

        ).getTime()

    ) {


        const minutos =

            fechaActual.getHours() * 60 +

            fechaActual.getMinutes();



        // 00:00 - 15:00

        if (minutos <= 900) {

            estado = "FINALIZADA";

        }


        // 15:01 - 23:59

        else {

            estado = "PROXIMA";

        }

    }


    //=====================================================
    // PROTECCIÓN
    //=====================================================

    else {

        estado = "PROXIMA";

    }



    //=====================================================
    // CALCULAR PROGRESO
    //=====================================================

    let progreso = 0;



    if (estado === "FINALIZADA") {

        progreso = 100;

    }


    else if (estado === "PROXIMA") {

        progreso = 0;

    }


    else {


        const totalDias = diferenciaDias(

            fechaInicio,

            fechaFin

        );


        const diasTranscurridos = diferenciaDias(

            fechaInicio,

            hoy

        );



        if (totalDias > 0) {

            progreso = Math.round(

                (diasTranscurridos / totalDias) * 100

            );

        }

        else {

            progreso = 100;

        }



        progreso = Math.max(

            0,

            Math.min(

                100,

                progreso

            )

        );

    }



    return {

        estado,

        fechaInicio,

        fechaFin,

        progreso

    };

}








//=========================================================
// OBTENER PERÍODO EN CURSO VIGENTE
//
// Busca el último período EN CURSO iniciado
// para el ciclo seleccionado.
//
// No depende del estado actual.
// FINALIZADA y PROXIMA mantienen estas fechas.
//=========================================================

function obtenerPeriodoCiclo1F(ciclo, fechaActual) {

    const regla = REGLAS_1F[ciclo];

    if (!regla) {

        return null;

    }


    //=====================================================
    // FECHA ACTUAL
    //=====================================================

    const anio = fechaActual.getFullYear();

    const mes = fechaActual.getMonth();

    const dia = fechaActual.getDate();


    //=====================================================
    // DETERMINAR EL MES DEL ÚLTIMO EN CURSO
    //=====================================================

    let mesInicio = mes;


    /*
    Si todavía no llegó el día de inicio
    del EN CURSO de este mes,

    el período EN CURSO vigente pertenece
    al mes anterior.
    */

    if (dia < regla.enCurso.inicio) {

        mesInicio--;

    }


    //=====================================================
    // FECHA DE INICIO DEL EN CURSO
    //=====================================================

    const fechaInicio = construirFecha(

        anio,

        mesInicio,

        0,

        regla.enCurso.inicio

    );


    //=====================================================
    // FECHA DE FIN DEL EN CURSO
    //=====================================================

    let fechaFin;


    if (regla.enCurso.fin === "ULTIMO_DIA") {

        fechaFin = new Date(

            fechaInicio.getFullYear(),

            fechaInicio.getMonth() + 1,

            0

        );

    }

    else {

        fechaFin = construirFecha(

            fechaInicio.getFullYear(),

            fechaInicio.getMonth(),

            regla.enCurso.mesFin,

            regla.enCurso.fin

        );

    }


    //=====================================================
    // DEVOLVER PERÍODO EN CURSO
    //=====================================================

    return {

        fechaInicio,

        fechaFin

    };

}




//=========================================================
// DETERMINAR ESTADO 1F
//
// Evalúa si la fecha actual pertenece a:
// - EN_CURSO
// - FINALIZADA
// - PROXIMA
//
// Las fechas visuales se mantienen separadas
// y vienen del período EN CURSO.
//=========================================================

function obtenerEstado1F(fila, fechaActual) {

    //=====================================================
    // OBTENER CICLO
    //=====================================================

    const ciclo = Number(fila.CICLO);

    const regla = REGLAS_1F[ciclo];

    if (!regla) {

        return null;

    }


    //=====================================================
    // OBTENER PERÍODO EN CURSO VIGENTE
    //=====================================================

    const periodo = obtenerPeriodoCiclo1F(

        ciclo,

        fechaActual

    );


    if (!periodo) {

        return null;

    }


    const fechaInicio = periodo.fechaInicio;

    const fechaFin = periodo.fechaFin;


    //=====================================================
    // FECHA ACTUAL SIN HORA
    //=====================================================

    const hoy = new Date(

        fechaActual.getFullYear(),

        fechaActual.getMonth(),

        fechaActual.getDate()

    );


    //=====================================================
    // CONSTRUIR PERÍODO FINALIZADO
    //=====================================================

    const fechaFinalizadaInicio = construirFecha(

        fechaInicio.getFullYear(),

        fechaInicio.getMonth(),

        regla.finalizada.mesInicio,

        regla.finalizada.inicio

    );


    const fechaFinalizadaFin = construirFecha(

        fechaInicio.getFullYear(),

        fechaInicio.getMonth(),

        regla.finalizada.mesFin,

        regla.finalizada.fin

    );


    //=====================================================
    // CONSTRUIR PERÍODO PRÓXIMO
    //=====================================================

    const fechaProximaInicio = construirFecha(

        fechaInicio.getFullYear(),

        fechaInicio.getMonth(),

        regla.proxima.mesInicio,

        regla.proxima.inicio

    );


    const fechaProximaFin = construirFecha(

        fechaInicio.getFullYear(),

        fechaInicio.getMonth(),

        regla.proxima.mesFin,

        regla.proxima.fin

    );


    //=====================================================
    // DETERMINAR ESTADO
    //=====================================================

    let fase;


    // EN CURSO

    if (

        hoy >= fechaInicio &&

        hoy <= fechaFin

    ) {

        fase = "EN_CURSO";

    }



    else if (

        hoy >= fechaFinalizadaInicio &&

        hoy <= fechaFinalizadaFin

    ) {

        fase = "FINALIZADA";

    }


    // PRÓXIMA

    else if (

        hoy >= fechaProximaInicio &&

        hoy <= fechaProximaFin

    ) {

        fase = "PROXIMA";

    }


    // Protección

    else {

        fase = "PROXIMA";

    }


    //=====================================================
    // CALCULAR PROGRESO
    //=====================================================

    let progreso = 0;


    if (fase === "FINALIZADA") {

        progreso = 100;

    }

    else if (fase === "PROXIMA") {

        progreso = 0;

    }

    else {

        const totalDias = diferenciaDias(

            fechaInicio,

            fechaFin

        );


        const diasTranscurridos = diferenciaDias(

            fechaInicio,

            hoy

        );


        if (totalDias > 0) {

            progreso = Math.round(

                (diasTranscurridos / totalDias) * 100

            );

        }

        else {

            progreso = 100;

        }


        // Limitar entre 0 y 100

        progreso = Math.max(

            0,

            Math.min(

                100,

                progreso

            )

        );

    }


    //=====================================================
    // DEVOLVER RESULTADO
    //=====================================================

    return {

        estado: fase,

        fechaInicio: fechaInicio,

        fechaFin: fechaFin,

        progreso: progreso

    };

}




//=========================================================
// CONSTRUIR FECHA
//=========================================================

function construirFecha(anio, mes, ajusteMes, dia) {

    return new Date(

        anio,

        mes + ajusteMes,

        dia

    );

}