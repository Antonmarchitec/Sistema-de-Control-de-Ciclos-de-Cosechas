/*
=========================================================
ACTIVIDAD DEL CICLO
Control NC / OE / PV / PP
=========================================================
*/


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

                            otro.checked=false;

                        }


                    });



                    const discador =
                    this.dataset.discador;


                    const ciclo =
                    this.dataset.ciclo;


                    const actividad =
                    this.dataset.tipo;



                    textoDiscador.textContent =
                    `DISCADOR: ${discador} - CICLO ${ciclo} - ${actividad}`;



                }


            }

        );


    });


}