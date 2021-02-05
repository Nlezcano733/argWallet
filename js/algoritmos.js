let ingresoDinero, nombreUsuario, monedaDivisa, dineroCuenta;

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

function Billetera (nombre, divisa, billete){
    this.nombre = nombre,
    this.divisa = divisa,
    this.divisaNombre = declaracionDivisa(this.divisa),
    this.billete = billete
}

// ------------------------------------ //

class Pesos {
    constructor (nombre, ticker, value){
    this. nombre = nombre,
    this.ticker = ticker,
    this.value = value
    }
}

class Divisas extends Pesos{
    conversion ( { value }) {
        return parseFloat((this.value / value).toFixed(4));
        //Devuelve el valor corvertido en la moneda elegida
    }
}




// --------- CREAMOS OBJETOS ---------- //

let bitcoin = new Cripto ('Bitcoin', 'BTC', 5900000.00, 6);
let ethereum = new Cripto ('Ethereum', 'ETH', 259999.13, 5);
let litecoin = new Cripto ('Litecoin', 'LTC', 22499.40, 2);
let tether = new Cripto ('Tether', 'USDT', 156, 2);

let carteraCriptos = [bitcoin, ethereum, litecoin, tether];

// ---------------------------------------- //

let ars = new Pesos ('pesos', 'ARS', 1);
let usd = new Divisas ('dolares', 'USD', 156);
let euro = new Divisas ('euros', 'EURO', 184);

let carteraDivisas = [ars, usd, euro];

// --------------------------------------- //





// Comienzo de algoritmo -- obtenemos datos
nombreUsuario = prompt("Bienvenid@ a ArgWALLET\n Por favor, ingrese su nombre");
nombreUsuario = validacionIngresoString(nombreUsuario);

monedaDivisa = cambioDinero(); // devuelve el valor de la moneda --> moneda.value
monedaUsuario = objetoMoneda (monedaDivisa, carteraDivisas);    // Necesitamos que pasarle al usuario la moneda entera
dineroCuenta = cantidadDinero();


let datosUsuario = new Billetera(nombreUsuario, monedaUsuario, dineroCuenta);



console.log (`${datosUsuario.nombre} ahorra en ${datosUsuario.divisaNombre}`);
console.log(`Valor de cuenta: ${datosUsuario.billete} ${datosUsuario.divisaNombre}`);

//Generamos la conversion de criptomonedas
let monedaCripto = cambioCripto(datosUsuario.divisa, carteraCriptos);
//  Agregar funcion que pregunte cantidad de monedas que se desean adquirir -- Eventos
let cantidadDistribuida = distribucionBilletera(datosUsuario, monedaCripto, monedaDivisa);

let ticker = declaracionCripto(monedaCripto, carteraCriptos);
let estadoBilleteraActual = estadoBilletera(cantidadDistribuida[0], cantidadDistribuida[1], datosUsuario.divisaNombre, ticker);