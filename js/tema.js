/*
=========================================================
TEMA CLARO / OSCURO
=========================================================
*/


const botonTema =
document.querySelector("#btnTema");


botonTema.addEventListener(

"click",

()=>{


    document.body.classList.toggle(
        "dark"
    );


    if(
        document.body.classList.contains("dark")
    ){

        botonTema.textContent="☀️";

    }

    else{

        botonTema.textContent="🌙";

    }


}

);