let panelUsuario, monedaDeposito, compra, arrayCompras;
let billetera, objetoMoneda, billeteraCompleta;
let billeteraPesos, billeteraDolares, billeteraEuros;

// --------- CREACION DE CONSTRUCTORES ---------- //

function BilleteraArs (billeteraTotal){
    this.divisa = 'ars'
    this.simbolo = '$',
    this.billeteraTotal = parseInt(billeteraTotal);
}
function BilleteraUsd (billeteraTotal){
    this.divisa = 'usd'
    this.simbolo = '$',
    this.billeteraTotal = parseInt(billeteraTotal);
}
function BilleteraEur (billeteraTotal){
    this.divisa = 'eur'
    this.simbolo = '€',
    this.billeteraTotal = parseInt(billeteraTotal);
}

// ------------------------------------ //

function Divisas (nombre, ticker, value, simbolo){
    this. nombre = nombre,
    this.ticker = ticker,
    this.value = parseFloat((value).toFixed(3)),
    this.simbolo = simbolo
}

// --------------------------------------- //
let ars = new Divisas ('Pesos', 'ARS', 1, '$');

let carteraDivisas = [ars];

let valorArs, valorUsd, valorEur;
// --------------------------------------- //

let carteraCriptos = [];

$(()=>{
    validarCierreSesion();
    conversionInicialDolar();
    conversionInicialEuro();
    
    getAjaxArmadoCompras(); 
    billeterasTotalesInicial();

    valorSelectorInicial();
    cambioMuestraDivisa();
    nombreUser();

    habilitacionBtn()
    $('#depositoRetiro__registro--divisas').change(habilitacionBtn)

    mostrarBilletera();
    $('#depositoRetiro__registro--divisas').change(mostrarbilleteraSeleccionada)


    setInterval(()=>{
        let arrayCompras = obtenerStorage('listaCompras');
        let monedaActivos = $('#cartera__lista__cabecera--divisas').val()
        let monedaTabla = $('#activos__cabecera--divisas').val()

        getAjaxModificarCompras(monedaActivos, arrayCompras)
        getAjaxModMercado(monedaTabla)
    }, 60000)

    setInterval(()=>{
        divisas = obtenerStorage('divisas')
        if(divisas != null){
        sessionStorage.removeItem('divisas')
        }
        
        conversionInicialDolar();
        conversionInicialEuro();
    },360000)


    window.outerWidth <= 900 && accionarMenu();
    $('.navBar__salir').click(cierreSession)
    accionarDeposito();
    accionarDepositoEnter();

    scrollify();
    scrollCompras();
    scrollFinal();

    avanzarNavbar();
})