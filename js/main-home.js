function Divisas (nombre, ticker, value, simbolo){
    this. nombre = nombre,
    this.ticker = ticker,
    this.value = value,
    this.simbolo = simbolo
}

// --------------------------------------- //
let ars = new Divisas ('Pesos', 'ARS', 1, '$');

let carteraDivisas = [ars];
let valorUsd, valorEur;
// --------------------------------------- //

let carteraCriptos = [];
let carteraMuestraInicio = [];


$(()=>{
    conversionInicialDolar();
    conversionInicialEuro();

    getAjaxInicio();

    avanzarNavbar();
    scrollify();
    scrollFinal();
    slider();


    mostrarPanelIngreso();
    //Funcion parcial hasta que se defina algoritmo logIn
    ingresoConversor('.panelIngreso__btn');

    getAjaxMercado();
    cambioMuestraDivisa();

    setInterval(()=>{
        let moneda = $('#lista__cabecera--divisas').val()
        getAjaxModMercado(moneda)
    }, 60000)
})



