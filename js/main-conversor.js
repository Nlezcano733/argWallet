let panelUsuario, monedaDeposito, compra;
let billetera, objetoMoneda, billeteraCompleta;
let billeteraPesos, billeteraDolares, billeteraEuros;

// // --------- CREACION DE CONSTRUCTORES ---------- //

// function Billetera (divisa, cantidadPesos, cantidadDolares, cantidadEuros, monedaInversion, montoInversion, arrayCompras){
//     this.divisa = divisa, //contiene divisa en la que se esta convirtiendo
//     this.billeteraArs = parseFloat(cantidadPesos),
//     this.billeteraUsd = parseFloat(cantidadDolares),
//     this.billeteraEur = parseFloat(cantidadEuros),
//     this.monedaInversion = monedaInversion, //el tipo de cambio en el que se convierte el monto de inversion
//     this.montoInversion = montoInversion,   //cantidad de inversion en base a la moneda en la que se muestra
//     this.arrayCompras = arrayCompras 
//     // array compras cuenta con tk de cripto/cantidad de criptos compradas/billeteraUsada/precio pagado (ver)
// }

// function BilleteraParcial (divisa,cantidadPesos, cantidadDolares, cantidadEuros){
//     this.divisa = divisa,
//     this.billeteraArs = parseFloat(cantidadPesos),
//     this.billeteraUsd = parseFloat(cantidadDolares),
//     this.billeteraEur = parseFloat(cantidadEuros)
// }

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

function Compra(tipo, cantidad, moneda, gasto){
    this.tipo = tipo,
    this.cantidad = cantidad,
    this.moneda = moneda,
    this.gasto = gasto
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
let arrayCompras = [];

$(()=>{
    valorSelectorInicial();
    billeterasTotalesInicial();
    mostrarBilletera();
    
    $('#ojoUser').click(mostrarOcultar)
    $('.billeteraUser__balance--divisas').change(mostrarBilletera)

    getAjaxArmadoLista();
    armadoDePanelInicial();
    armadoDePanelPorSelector();
    
    $('#conversion__ingreso--divisa').keypress(conversionDinamica);
    // $('#conversion__ingreso--divisa').blur(accionarBtnCompraVenta)
    accionarBtnCompraVenta();
    // $('#conversion__ingreso--divisa').val('');
})