/*
=========================================================
EXCEL.JS
Carga y lectura de archivos Excel
=========================================================
*/


//=========================================================
// CARGAR ARCHIVO EXCEL
//=========================================================

async function cargarExcel(nombreArchivo) {


    try {


        const ruta = `excel/${nombreArchivo}.xlsx`;

        const response = await fetch(ruta);



        if (!response.ok) {


            throw new Error(
                `No se pudo cargar ${nombreArchivo}`
            );


        }




        const data = await response.arrayBuffer();



        const workbook = XLSX.read(data, {

            type:"array"

        });



        return workbook;



    }

    catch(error) {


        console.error(error);


        return null;


    }


}





//=========================================================
// OBTENER HOJAS
//=========================================================

function obtenerHojas(workbook) {


    if(!workbook) return [];


    return workbook.SheetNames;


}






//=========================================================
// NORMALIZAR COLUMNAS
//=========================================================

function normalizarDatos(datos) {


    return datos.map(fila => {



        const nuevo = {};



        Object.keys(fila).forEach(columna => {



            const nombre = columna

                .trim()

                .toUpperCase()

                .normalize("NFD")

                .replace(/[\u0300-\u036f]/g,"")

                .replace(/\s+/g,"_");





            nuevo[nombre] = fila[columna];



        });



        return nuevo;



    });



}







//=========================================================
// LEER HOJA
//=========================================================

function leerHoja(workbook,nombreHoja){


    if(!workbook) return [];



    const hoja = workbook.Sheets[nombreHoja];



    const datos = XLSX.utils.sheet_to_json(

        hoja,

        {

            defval:""

        }

    );



    return normalizarDatos(datos);


}






//=========================================================
// LEER PRIMERA HOJA
//=========================================================

function leerPrimeraHoja(workbook){


    if(!workbook) return [];



    const hoja = workbook.SheetNames[0];



    return leerHoja(

        workbook,

        hoja

    );


}






//=========================================================
// OBTENER COLUMNAS
//=========================================================

function obtenerColumnas(datos){


    if(datos.length===0)

        return [];



    return Object.keys(datos[0]);


}







//=========================================================
// INFORMACION EXCEL
//=========================================================

function informacionExcel(workbook){


    if(!workbook) return;



    console.log("====================================");

    console.log("HOJAS");

    console.log(workbook.SheetNames);

    console.log("====================================");


}







//=========================================================
// ABRIR EXCEL COMPLETO
//=========================================================

async function abrirExcel(nombreArchivo){



    const workbook = await cargarExcel(

        nombreArchivo

    );



    if(!workbook)

        return null;





    informacionExcel(workbook);




    const datos = leerPrimeraHoja(

        workbook

    );





    console.log("DATOS NORMALIZADOS");

    console.table(datos);





    return {


        workbook,


        hojas: obtenerHojas(workbook),


        datos,


        columnas: obtenerColumnas(datos),


        total: totalRegistros(datos)



    };



}







//=========================================================
// TOTAL REGISTROS
//=========================================================

function totalRegistros(datos){


    return datos.length;


}