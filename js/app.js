/*
=========================================================
APP.JS
Controlador principal de la aplicación
=========================================================
*/


//=========================================================
// ELEMENTOS DEL DOM
//=========================================================

const ciclo = document.querySelector("#ciclo");



//=========================================================
// VARIABLE GLOBAL
//=========================================================

let archivoActual = "";
let datosActuales = [];


//=========================================================
// MOSTRAR CICLO SELECCIONADO
//=========================================================

function mostrarNombreCiclo(nombreArchivo) {


    const elemento = document.querySelector("#nombreCiclo");


    if (!elemento) {

        return;

    }


    const nombre = nombreArchivo

        .replace(".xlsx", "")

        .toUpperCase();



    elemento.textContent = nombre;


}




//=========================================================
// INICIALIZAR
//=========================================================

function iniciarAplicacion() {


    console.clear();


    console.log("====================================");
    console.log("SISTEMA DE GESTIÓN DE COSECHAS");
    console.log("====================================");


    mostrarFechaActual();


    ciclo.addEventListener(
        "change",
        seleccionarCiclo
    );


}





//=========================================================
// SELECCIONAR CICLO
//=========================================================

async function seleccionarCiclo(e) {


    archivoActual = e.target.value;



    if (archivoActual === "") {


        limpiarTabla();


        document.querySelector("#nombreCiclo").textContent = "--";


        return;


    }




    mostrarNombreCiclo(

        archivoActual

    );



    await cargarProyecto(

        archivoActual

    );


}





//=========================================================
// CARGAR PROYECTO
//=========================================================

async function cargarProyecto(nombreArchivo) {


    try {



        console.clear();



        console.log(
            "Archivo seleccionado:",
            nombreArchivo
        );




        // Leer Excel

        const excel = await abrirExcel(

            nombreArchivo

        );




        if (!excel) {


            console.error(
                "No se pudo cargar Excel"
            );


            return;


        }





        // Configuración

        const configuracion = obtenerConfiguracion(

            nombreArchivo

        );





        // Fecha actual

        const fechaActual = obtenerFechaActual();





        console.log(
            "Fecha actual:",
            fechaActual
        );






        // Procesar datos

        const datosProcesados = procesarDatos(

            excel.datos,

            configuracion,

            fechaActual

        );
        datosActuales = datosProcesados;





        console.table(

            datosProcesados

        );





        // Mostrar tabla

        mostrarTabla(datosProcesados);
        actualizarDashboard(datosProcesados);
    }


    catch(error) {


        console.error(

            "Error:",
            error

        );


    }


}







//=========================================================
// PROCESAR DATOS
//=========================================================

function procesarDatos(

    datos,

    configuracion,

    fechaActual

) {



    return datos.map(fila => {
        console.log("================================");
        console.log("Fila:", fila);
        console.log("Discador:", fila.DISCADOR);
        console.log("Ciclo:", fila.CICLO);




        // Calcular fechas


        //=====================================================
        // MOTOR DE FECHAS
        //=====================================================

        let fechaInicio;

        let fechaFin;

        let resultadoEstado;

        //-----------------------------------------------------
        // NUEVO MOTOR 1F
        //-----------------------------------------------------

        if (String(fila.DISCADOR).toUpperCase() === "1F") {

            const resultado = obtenerEstado1F(

                fila,

                fechaActual

            );

            fechaInicio = resultado.fechaInicio;

            fechaFin = resultado.fechaFin;

            resultadoEstado = {

                estado: resultado.estado,

                progreso: resultado.progreso

            };

        }

        //-----------------------------------------------------
        // MOTOR 2F - 3F - ETAPA 5
        //-----------------------------------------------------

        else if (

            String(fila.DISCADOR).toUpperCase() === "2F" ||

            String(fila.DISCADOR).toUpperCase() === "3F" ||

            String(fila.DISCADOR).toUpperCase() === "ETAPA 5"

        ) {


            const resultado = obtenerEstado2F3F5(

                fila,

                fechaActual

            );


            if (resultado) {

                fechaInicio = resultado.fechaInicio;

                fechaFin = resultado.fechaFin;

                resultadoEstado = {

                    estado: resultado.estado,

                    progreso: resultado.progreso

                };

            }
            else {

                console.error(
                    "No se pudo obtener estado 2F/3F/ETAPA5",
                    fila
                );

                fechaInicio = null;

                fechaFin = null;

                resultadoEstado = {

                    estado: "PENDIENTE",

                    progreso: 0

                };

            }

        }
        //-----------------------------------------------------
        // MOTOR GENERAL
        //-----------------------------------------------------

        else {


            fechaInicio = calcularFechaInicio(

                fila,

                configuracion

            );


            fechaFin = calcularFechaFin(

                fechaInicio,

                configuracion,

                fila

            );


            resultadoEstado = calcularEstado(

                fechaActual,

                fechaInicio,

                fechaFin,

                fila

            );


        }


        return {


            ...fila,


            FECHA_INICIO:

                fechaInicio

                ? formatearFecha(fechaInicio)

                : "",




            FECHA_FIN:

                fechaFin

                ? formatearFecha(fechaFin)

                : "",





            ESTADO:

                resultadoEstado.estado,





            PROGRESO:

                resultadoEstado.progreso + "%"

        };



    });



}







//=========================================================
// ACTUALIZAR AUTOMATICAMENTE
//=========================================================

function actualizarSistema() {


    if (

        archivoActual !== ""
        

    ) {



        cargarProyecto(

            archivoActual

        );



    }


}






// Actualiza cada minuto
// setInterval(
//     actualizarSistema,
//     60000
// );







//=========================================================
// REINICIAR SISTEMA
//=========================================================

function reiniciarSistema() {


    limpiarTabla();


    archivoActual = "";


    ciclo.selectedIndex = 0;


}






//=========================================================
// INICIO
//=========================================================

document.addEventListener(

    "DOMContentLoaded",

    iniciarAplicacion

);