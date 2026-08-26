/*
=========================================================
DASHBOARD.JS
=========================================================
*/

function actualizarDashboard(datos) {

    console.table(datos);

    datos.forEach(fila => {

        console.log(
            "Ciclo:",
            fila.CICLO,
            "Estado:",
            fila.ESTADO
        );

    });


    const total = datos.length;


    //=====================================================
    // NORMALIZAR ESTADO
    // Permite EN_CURSO y EN CURSO
    //=====================================================

    function normalizarEstado(estado) {

        return String(estado || "")
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "_");

    }


    //=====================================================
    // CONTADORES
    //=====================================================

    const finalizadas = datos.filter(f =>

        normalizarEstado(f.ESTADO) === "FINALIZADA"

    ).length;


    const enCurso = datos.filter(f =>

        normalizarEstado(f.ESTADO) === "EN_CURSO"

    ).length;


    const proximas = datos.filter(f =>

        normalizarEstado(f.ESTADO) === "PROXIMA"

    ).length;


    //=====================================================
    // MOSTRAR RESULTADOS
    //=====================================================

    document.getElementById(
        "totalRegistros"
    ).textContent = total;


    document.getElementById(
        "totalFinalizadas"
    ).textContent = finalizadas;


    document.getElementById(
        "totalCurso"
    ).textContent = enCurso;


    document.getElementById(
        "totalProximas"
    ).textContent = proximas;

}


window.actualizarDashboard = actualizarDashboard;