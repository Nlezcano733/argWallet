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

function BilleteraParcial (divisa, cantidad){
    this.divisa = divisa;
    this.cantidad = cantidad;
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