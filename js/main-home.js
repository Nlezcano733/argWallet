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
    validarSesion();

    getAjaxInicio();

    avanzarNavbar();
    scrollify();
    scrollFinal();
    slider();

    mostrarPanelIngreso();
    $('#btnRegistro').click(ingresarUsuario)
    $('#btnComenzar').click(crearUsuario)

    getAjaxMercado();
    cambioMuestraDivisa();

    let intervalo = setInterval(()=>{
        let moneda = $('#lista__cabecera--divisas').val()
        getAjaxModMercado(moneda)
    }, 60000)
})



