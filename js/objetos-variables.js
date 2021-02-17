// let ingresoDinero, nombreUsuario, monedaDivisa, monedaUsuario, dineroCuenta;
let panelUsuario, monedaDeposito, botonOjo;

// --------- CREACION DE CONSTRUCTORES ---------- //

function Billetera (nombre, divisa, cripto, billeteraTotal, cantidadDivisa, cantidadCripto){
    this.nombre = nombre,
    this.divisa = divisa,
    this.cripto = cripto,
    this.billeteraTotal = billeteraTotal,
    this.cantidadDivisa = cantidadDivisa,
    this.cantidadCripto = cantidadCripto
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
let usd = new Divisas ('Dolares', 'USD', 156, '$');
let euro = new Divisas ('Euros', 'EURO', 184, '€');

let carteraDivisas = [ars, usd, euro];
// --------------------------------------- //