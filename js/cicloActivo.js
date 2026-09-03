/*
=========================================================
CONTROL CICLO ACTIVO
Permite seleccionar solamente un ciclo de trabajo
=========================================================
*/


function activarControlCicloActivo(){


    const checks = document.querySelectorAll(
        ".check-activo"
    );


    checks.forEach(check => {


        check.addEventListener(
            "change",
            function(){


               if(this.checked){

                checks.forEach(otro => {


                    if(otro !== this){

                        otro.checked=false;

                    }


                });


                mostrarCicloActivo(this);


}


            }
        );


    });


}



//=========================================================
// MOSTRAR CICLO ACTIVO
//=========================================================

function mostrarCicloActivo(check){


    const elemento =
    document.querySelector("#cicloActivo");


    if(!elemento){

        return;

    }


    const discador =
    document.querySelector("#ciclo")
    .value;



    if(check.checked){
        elemento.textContent =
        `CICLO ${check.dataset.ciclo}`;
    }

    else{
        elemento.textContent =
        "Ciclo activo: --";
    }


}