let panelUsuario, monedaDeposito, compra;
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

function Transaccion(tipo, cantidad, moneda, gasto, precio){
    this.tipo = tipo,
    this.cantidad = cantidad,
    this.moneda = moneda,
    this.gasto = gasto,
    this.precio = precio
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
    
    $('#conversion__ingreso--divisa').focus(()=>{
        mostrarCantidadCriptos();
        $('#conversion__confirmacion--cantidad').show();
    })
    $('#conversion__ingreso--divisa').blur(()=>{
        $('#conversion__confirmacion--cantidad').hide();
    })

    
    $('#conversion__ingreso--divisa').keypress(conversionDinamica);
    accionarBtnCompra();
    activacionBtnVenta();
})