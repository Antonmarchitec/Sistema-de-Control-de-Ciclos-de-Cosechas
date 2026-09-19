/*
=========================================================
TABLA.JS
Renderizado de la tabla de cosechas
=========================================================
*/


//=========================================================
// CONTENEDOR DE LA TABLA
//=========================================================

const tablaContainer = document.querySelector("#tablaContainer");


//=========================================================
// MOSTRAR TABLA
//=========================================================

function mostrarTabla(datos) {

    if (!tablaContainer) {

        return;

    }

    if (!datos || datos.length === 0) {

        limpiarTabla();

        return;

    }


    let html = `

    <table class="tabla">

        <thead>

            <tr>

    `;


    // Encabezados dinámicos

    const columnas = Object.keys(datos[0]).filter(columna =>
        !columna.startsWith("__EMPTY")
    );
    

    columnas.forEach(columna => {
        html += `<th>${columna}</th>`;
    });



    html += `

            </tr>

        </thead>

        <tbody>

    `;


    // Filas
//************************************************************* */
    datos.forEach(fila => {      /*************************************************** */
         html += "<tr>";


            columnas.forEach(columna => {

                let valor = fila[columna];


                if(
                    columna === "NC" ||
                    columna === "OE" ||
                    columna === "PV" ||
                    columna === "PP" 
                ){

                    valor = `

                    <input
                        type="checkbox"
                        class="check-actividad"
                        data-tipo="${columna}"
                        data-discador="${fila.DISCADOR}"
                        data-ciclo="${fila.CICLO}"
                    >
                    `;
                }


                // BARRA PROGRESO

                if(columna === "PROGRESO"){

                    const porcentaje = parseInt(valor);

                    const estado = String(fila.ESTADO || "")
                        .trim()
                        .toUpperCase()
                        .replace(/\s+/g,"_");


                    let color="#22c55e";


                    if(estado==="EN_CURSO"){

                        color="#22c55e";

                    }

                    else if(estado==="PROXIMA"){

                        color="#facc15";

                    }

                    else if(estado==="FINALIZADA"){

                        color="#ef4444";

                    }


                    valor=`

                    <div class="contenedor-progreso">

                        <div 
                            class="barra-progreso"
                            data-width="${porcentaje}"
                            style="
                            width:0%;
                            background:${color};
                            ">
                        </div>

                        <span>
                            ${porcentaje}%
                        </span>

                    </div>

                    `;

                }



                // ESTADOS

                if(columna==="ESTADO"){

                    const clase = String(valor)
                        .toLowerCase()
                        .replace("_","-");


                    valor=`

                    <span class="estado ${clase}">
                        ${valor}
                    </span>

                    `;

                }


                html += `<td>${valor ?? ""}</td>`;


            });



            //=====================================================
            // CHECKBOX ACTIVIDADES
            //=====================================================


            html += `

            `;
                    

        /************************************************ ********************************************/
        html += "</tr>";

    });


    html += `

        </tbody>

    </table>

    `;


    tablaContainer.innerHTML = html;
    activarActividadCiclo();
    animarBarras();

    // Reiniciar animación
    const tabla = tablaContainer.querySelector("table");

    if(tabla){

        tabla.classList.remove("tabla-cosecha");

        void tabla.offsetWidth;

        tabla.classList.add("tabla-cosecha");

    }

}


//=========================================================
// ANIMAR BARRAS DE PROGRESO
//=========================================================

function animarBarras() {

    const barras = document.querySelectorAll(".barra-progreso");

    barras.forEach((barra, indice) => {

        const ancho = barra.dataset.width;

        setTimeout(() => {

            barra.style.width = ancho + "%";

        }, indice * 80);

    });

}


//=========================================================
// LIMPIAR TABLA
//=========================================================

function limpiarTabla() {

    if (!tablaContainer) {

        return;

    }

    tablaContainer.innerHTML = `
        <p class="sin-datos">
            Seleccione un ciclo para visualizar la información.
        </p>
    `;

}