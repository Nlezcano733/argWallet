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
    this.value = value,
    this.simbolo = simbolo
}

// --------------------------------------- //
let ars = new Divisas ('Pesos', 'ARS', 1, '$');
let usd = new Divisas ('Dolar', 'USD', 156, '$');
let euro = new Divisas ('Euro', 'EURO', 184, '€');

let carteraDivisas = [ars, usd, euro];
// --------------------------------------- //

let carteraCriptos = [];

$(()=>{
    avanzarNavbar();
    scrollify();
    scrollCompras();
    scrollFinal();

    valorSelectorInicial();
    cambioMuestraDivisa();

    billeterasTotalesInicial();
    $('#ojoUser').click(mostrarOcultar)

    mostrarBilletera();
    $('#depositoRetiro__registro--divisas').change(mostrarbilleteraSeleccionada)
    
    accionarDeposito();
    eventoInput('#depositoRetiro__interaccion__input--cantidad');

    habilitacionBtn()
    $('#depositoRetiro__registro--divisas').change(habilitacionBtn)

    getAjaxArmadoCompras(); 
})