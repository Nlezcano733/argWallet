let carteraCriptos = [];
let carteraMuestraInicio = [];


$(()=>{
    //MODIFICABLE AL APLICAR AJAX -- activar si se arma lista con json 
    tomarJson()
    tomarJsonHome();
    // getAjaxInicio();

    avanzarNavbar();
    scrollify();
    scrollFinal();
    slider();

// HABILITAR EN CASO DE ARMAR LA LISTA CON OBJETO JSON
// ver setInterval

    armadoDeLista();
    armadoDeCriptos();
    cambiarCriptoMostrada();

    mostrarPanelIngreso();
    //Funcion parcial hasta que se defina algoritmo logIn
    ingresoConversor('.panelIngreso__btn');

    getAjaxMercado();
    cambioMuestraDivisa();
})



