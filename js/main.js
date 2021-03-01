let carteraCriptos = [];
let carteraMuestraInicio = [];

$(()=>{
    tomarJson()
    tomarJsonHome();

    avanzarNavbar();
    scrollify();
    slider();

    armadoDeLista();
    armadoDeCriptos();
    cambiarCriptoMostrada();

    mostrarPanelIngreso();
    
    //Funcion parcial hasta que se defina algoritmo logIn
    ingresoConversor('.panelIngreso__btn');
})
