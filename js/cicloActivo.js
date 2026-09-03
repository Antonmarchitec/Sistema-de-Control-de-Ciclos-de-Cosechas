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


                    // Desmarcar todos los demás

                    checks.forEach(otro => {


                        if(otro !== this){

                            otro.checked = false;

                        }


                    });


                    console.log(
                        "Ciclo activo:",
                        this.dataset.ciclo
                    );


                }


            }
        );


    });


}
