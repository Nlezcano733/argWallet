let ars = 1;
let usd = 151;
let euro = 183;
let ingresoDinero, nombreUsuario, monedaDivisa, dineroCuenta, nombreValido;

function Cripto (nombre, ticker, valor, decimales){
    this.nombre = nombre,
    this.ticker = ticker,
    this.value = valor
    this.decimales = decimales
}

function Billetera (nombre, divisa, cantidad){
    this.nombre = nombre,
    this.divisa = divisa,
    this.divisaNombre = declaracionDivisa(this.divisa),
    this.wallet = cantidad
}

let bitcoin = new Cripto ('Bitcoin', 'BTC', 2652536.61, 4);
let ethereum = new Cripto ('Ethereum', 'ETH', 96502.48, 4);
let litecoin = new Cripto ('Litecoin', 'LTC', 11202.62, 6);
let tether = new Cripto ('Tether', 'USDT', 151, 2);

let carteraCriptos = [bitcoin, ethereum, litecoin, tether];


// Comienzo de algoritmo -- obtenemos datos
nombreUsuario = prompt("Bienvenid@ a ArgWALLET\n Por favor, ingrese su nombre");
nombreValido = validacionIngresoString(nombreUsuario);

monedaDivisa = cambioDinero();
dineroCuenta = cantidadDinero();

//Obtenemos los datos del usuario ingresado
let datosUsuario = new Billetera(nombreValido, monedaDivisa, dineroCuenta);

console.log (`${datosUsuario.nombre} ahorra en ${datosUsuario.divisaNombre}`);
console.log(`Valor de cuenta: ${datosUsuario.wallet} ${datosUsuario.divisaNombre}`);

//Generamos la conversion de criptomonedas
let monedaCripto = cambioCripto();

//  Ingresar funcion que pregunte cantidad de monedas que se desean adquirir
let cantidadDistribuida = distribucionBilletera(datosUsuario, monedaCripto, monedaDivisa);


