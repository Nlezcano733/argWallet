let ingresoDinero, nombreUsuario, monedaDivisa, monedaUsuario, dineroCuenta;

// --------- CREACION DE CONSTRUCTORES ---------- //

function Cripto (nombre, ticker, valor, decimales){
    this.nombre = nombre,
    this.ticker = ticker,
    this.value = valor
    this.decimales = decimales
}

Cripto.prototype.conversionCripto = function (cripto) {
    let resultado = parseFloat((this.value / cripto.value).toFixed(cripto.decimales));
    return resultado;
    //Devuelve el valor corvertido en la cripto elegida
}

Cripto.prototype.conversionMoneda = function (moneda) {
    let resultado = parseFloat((this.value / moneda.value).toFixed(2));
    return resultado;
    //Devuelve el valor corvertido en la moneda elegida
}

// ------------------------------------ //

function Billetera (nombre, divisa, cripto, billeteraTotal, cantidadDivisa, cantidadCripto){
    this.nombre = nombre,
    this.divisa = divisa,
    this.cripto = cripto,
    this.billeteraTotal = billeteraTotal,
    this.cantidadDivisa = cantidadDivisa,
    this.cantidadCripto = cantidadCripto
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


// --------- CREAMOS OBJETOS ---------- //

let bitcoin = new Cripto ('Bitcoin', 'BTC', 5900000.00, 6);
let ethereum = new Cripto ('Ethereum', 'ETH', 259999.13, 5);
let litecoin = new Cripto ('Litecoin', 'LTC', 22499.40, 2);
let tether = new Cripto ('Tether', 'USDT', 156, 2);

let carteraCriptos = [bitcoin, ethereum, litecoin, tether];

// ---------------------------------------- //

let ars = new Divisas ('Pesos', 'ARS', 1, '$');
let usd = new Divisas ('Dolares', 'USD', 156, '$');
let euro = new Divisas ('Euros', 'EURO', 184, '€');

let carteraDivisas = [ars, usd, euro];
// --------------------------------------- //


nombreUsuario = prompt("Bienvenid@ a ArgWALLET\n Por favor, ingrese su nombre");
nombreUsuario = validacionIngresoString(nombreUsuario);

monedaDivisa = cambioDinero();
monedaUsuario = objetoCompleto (monedaDivisa, carteraDivisas);
dineroCuenta = cantidadDinero();

monedaCripto = cambioCripto(monedaUsuario, carteraCriptos);
criptoUsuario = objetoCompleto (monedaCripto, carteraCriptos);
//  Agregar funcion que pregunte cantidad de monedas que se desean adquirir -- Eventos

let cantidadDistribuida = distribucionBilletera(dineroCuenta, monedaCripto, monedaDivisa);  // Array se agregaria con esta funcion --> ver como complejizar 
let datosUsuario = new Billetera(nombreUsuario, monedaUsuario, criptoUsuario, dineroCuenta, cantidadDistribuida[0], cantidadDistribuida[1]);    // ver como agregar array de activos

let nombreCripto = datosUsuario.cripto.nombre;
let tickerCripto = datosUsuario.cripto.ticker;
let nombreDivisa = datosUsuario.divisa.nombre;
let simboloDivisa = datosUsuario.divisa.simbolo;
let estadoBilleteraActual = estadoBilletera(datosUsuario.cantidadDivisa, datosUsuario.cantidadCripto, simboloDivisa, tickerCripto);

// Modificacion de DOM para Tarjetas
modificarValores('activo__informacion--nombre', nombreDivisa, nombreCripto);
modificarValores('activo__informacion--cantidad', estadoBilleteraActual[0], estadoBilleteraActual[1]);

let conversorDivisa = datosUsuario.divisa.conversion(usd);
let conversorCripto = datosUsuario.cripto.conversionMoneda(usd);

let arrayADolar = conversionRefencia(datosUsuario, datosUsuario, conversorDivisa, conversorCripto);
modificarValores('activo__informacion--conversion', `U$D ${arrayADolar[0]}`, `U$D ${arrayADolar[1]}`);
let conversionUsd = VerificacionReferencia(datosUsuario, arrayADolar[0], 'divisa', 'activo__informacion--conversion');

modificarId('divisaTicker', datosUsuario.divisa.simbolo)
let valorCuenta = agregarNodos('moneda', 'class', 'valorBilletera', datosUsuario);
