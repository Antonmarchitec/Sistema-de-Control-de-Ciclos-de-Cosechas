/*
=========================================================
ACTIVIDAD DEL CICLO

Control NC / OE / PV / PP

=========================================================
*/


//=========================================================
// NOMBRES COMPLETOS SOLO PARA POPUP
//=========================================================

const nombresActividad = {

    NC: "NO CONTACTADOS",

    OE: "OTROS ESTADOS",

    PV: "PROMESAS VENCIDAS",

    PP: "PAGOS PARCIALES"

};



//=========================================================
// ACTIVAR CONTROL DE ACTIVIDAD
//=========================================================

function activarActividadCiclo(){


    const checks = document.querySelectorAll(
        ".check-actividad"
    );


    const textoDiscador =
    document.querySelector("#discadorActivo");



    checks.forEach(check => {


        check.addEventListener(

            "change",

            function(){


                // Solo una actividad activa

                if(this.checked){


                    checks.forEach(otro => {


                        if(otro !== this){

                            otro.checked = false;

                        }


                    });



                    const discador =
                    this.dataset.discador;



                    const ciclo =
                    this.dataset.ciclo;



                    const actividad =
                    this.dataset.tipo;



                    //=================================================
                    // LEYENDA SUPERIOR
                    // Mantiene siglas
                    //=================================================

                    textoDiscador.textContent =
                    `DISCADOR: ${discador} - CICLO ${ciclo} - ${actividad}`;



                    //=================================================
                    // POPUP
                    // Muestra nombre completo
                    //=================================================

                    mostrarPopupActividad(

                        discador,

                        ciclo,

                        actividad

                    );


                }


            }

        );


    });


}



//=========================================================
// POPUP CICLO EN TRABAJO
//=========================================================

function mostrarPopupActividad(

    discador,

    ciclo,

    actividad

){


    const popup =
    document.createElement("div");



    popup.className =
    "popup-actividad";



    popup.innerHTML = `

        <div class="contenido-popup">


           <h1>
                ACTIVO
            </h1>


            <h2>
                ${discador} CICLO ${String(ciclo).padStart(2,"0")}
            </h2>



            <div class="actividad-popup">

                ${nombresActividad[actividad]}

            </div>



            <button id="cerrarPopup">

                CONTINUAR

            </button>



        </div>

    `;



    document.body.appendChild(popup);



    document
    .querySelector("#cerrarPopup")
    .onclick = () => {


        popup.remove();


    };


}