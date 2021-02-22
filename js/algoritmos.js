let panelUsuario, monedaDeposito, botonOjo, compra;
let billetera, objetoMoneda, billeteraCompleta;

// --------- CREACION DE CONSTRUCTORES ---------- //

function Billetera (divisa, divisaObjeto, billeteraTotal, cantidadDivisa, arrayCompras){
    this.divisa = divisa,
    this.divisaObjeto = divisaObjeto;
    this.billeteraTotal = parseFloat(billeteraTotal), // cantidad de dinero total
    this.cantidadDivisa = parseFloat(cantidadDivisa), // cantidad de plata que queda
    this.arrayCompras = arrayCompras
    // this.arrayCantidadCripto = arrayCantidadCripto
}

function BilleteraParcial (divisa, billeteraTotal){
    this.divisa = divisa;
    this.billeteraTotal = parseInt(billeteraTotal);
}

// ------------------------------------ //

function Divisas (nombre, ticker, value, simbolo){
    this. nombre = nombre,
    this.ticker = ticker,
    this.value = value,
    this.simbolo = simbolo
}

Divisas.prototype.conversion = function ({value}){
    return parseFloat((this.value / value).toFixed(4));
}

// --------------------------------------- //
let ars = new Divisas ('Pesos', 'ARS', 1, '$');
let usd = new Divisas ('Dolar', 'USD', 156, '$');
let euro = new Divisas ('Euro', 'EURO', 184, '€');

let carteraDivisas = [ars, usd, euro];
// --------------------------------------- //

function Compra(tipo, cantidad, monedaValor, monedaSimbolo, valor){
    this.tipo = tipo,
    this.cantidad = cantidad,
    this.monedaValor = monedaValor
    this.monedaSimbolo = monedaSimbolo,
    this.valor = valor
}


let carteraCriptos = [];


// ----------------- COMIENZO ALGORITMO CON DOM ---------------------- //


billeteraCompleta = billeteraCompletaInicial ();

billetera = billeteraInicial();
if(billetera.billeteraTotal > 0){
    habilitarBoton();
    bloquearSeleccionMoneda();
    
    retirar('botonRetiro');
}

objetoMoneda = objetoCompleto(billetera, carteraDivisas);
objetoMonedaToStorage(objetoMoneda);

// ARMADO DE ESTRUCTURA DINAMICA -- HEADER
panelUsuario = aperturaPanelUser('userIn', 'salir');
mostrarBilletera();
presionaOjo();


// DEPOSITOS Y RETIROS -- VALIDACION DE ACCIONES
monedaDeposito = depositar('botonDeposito');
depositarAutomatico = eventoInput('deposito-retiro', );

// MOSTRAMOS COMPRAS
let arrayComprasRealizadas = billeteraCompleta.arrayCompras;
if(arrayComprasRealizadas.length > 0){
    mostrarCompra();
}
// ARMADO DE LISTADO DINAMICO DE CRIPTOS
tomarJson();
opcionCripto();
separacionCriptos();
realizarConversion();
