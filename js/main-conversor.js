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

function Transaccion(tipo, cantidad, moneda, gasto, precio, cantCompras){
    this.tipo = tipo,
    this.cantidad = parseFloat((cantidad).toFixed(3)),
    this.moneda = moneda,
    this.gasto = gasto,
    this.precio = [precio],
    this.cantCompras = cantCompras
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

let carteraDivisas = [ars];
let valorUsd, valorEur;
// --------------------------------------- //

let carteraCriptos = [];
let arrayCompras = [];

$(()=>{
    conversionInicialDolar();
    conversionInicialEuro();

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