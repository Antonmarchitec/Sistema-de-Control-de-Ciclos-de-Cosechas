/*
=========================================================
TEMA CLARO / OSCURO
CON PREFERENCIA DE USUARIO
=========================================================
*/


const botonTema =
document.querySelector("#btnTema");


//=========================================================
// CARGAR TEMA GUARDADO
//=========================================================

const temaGuardado =
localStorage.getItem("tema");



if(temaGuardado === "dark"){

    document.body.classList.add("dark");

    botonTema.textContent="☀️";

}

else{

    botonTema.textContent="🌙";

}



//=========================================================
// CAMBIAR TEMA
//=========================================================

botonTema.addEventListener(

"click",

()=>{


    document.body.classList.toggle("dark");



    if(
        document.body.classList.contains("dark")
    ){

        localStorage.setItem(
            "tema",
            "dark"
        );


        botonTema.textContent="☀️";

    }

    else{


        localStorage.setItem(
            "tema",
            "light"
        );


        botonTema.textContent="🌙";

    }


}

);