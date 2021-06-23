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
let carteraDivisas = [];
let valorArs, valorUsd, valorEur;
// --------------------------------------- //

let carteraCriptos = [];
let arrayCompras = [];

$(()=>{
    validarCierreSesion();
    activarListaCripto();
    actualizacionValoresDivisas();
    window.outerWidth <= 900 && accionarMenu();

    nombreUser();
    valorSelectorInicial();
    billeterasTotalesInicial();
    $('.billeteraUser__balance--divisas').change(mostrarBilletera)

    getAjaxArmadoLista();
    armadoDePanelInicial();
    armadoDePanelPorSelector();
    
    $('#conversion__ingreso--divisa').focus(()=>{
        mostrarCantidadCriptos();
        $('.maximos').fadeIn(200);
        $('#conversion__confirmacion--cantidad').show();
    })
    $('#conversion__ingreso--divisa').blur(()=>{
        $('.maximos').fadeOut(200);
        $('#conversion__confirmacion--cantidad').hide();
    })
    
    accionarOjo();

    $('#maxMoneda').click(compraMax);
    $('#maxCripto').click(ventaMax);
    $('#conversion__ingreso--divisa').keydown(activacionEnter);
    $('#conversion__ingreso--divisa').keydown(conversionDinamica);
    $('#confirmacionCompra').click(comprar);

    setInterval(()=>{
        armadoDePanelInicial();
    }, 60000)
    
    setInterval(()=>{
        conversionInicialDolar();
        conversionInicialEuro();
    },360000)

    $('.navBar__salir').click(cierreSession);
})