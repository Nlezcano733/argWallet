let ars = 1;
let usd = 151;
let euro = 183;
let ingresoDinero, nombreUsuario;

function Cripto (nombre, ticker, valor){
    this.nombre = nombre,
    this.ticker = ticker,
    this.value = valor
}

function Billetera (nombre, divisa, cantidad){
    this.nombre = nombre,
    this.divisa = divisa,
    this.divisaNombre = declaracionDivisa(this.divisa),
    this.cantidad = cantidad
}

let bitcoin = new Cripto ('Bitcoin', 'BTC', 2652536.61);
let ethereum = new Cripto ('Ethereum', 'ETH', 96502.48);
let litecoin = new Cripto ('Litecoin', 'LTC', 11202.62);
let tether = new Cripto ('Tether', 'USDT', 151);



// Comienzo de algoritmo -- obtenemos datos
nombreUsuario = prompt("Bienvenid@ a ArgWALLET\n Por favor, ingrese su nombre")
let monedaDivisa = cambioDinero();
convertirDivisas();

//Obtenemos los datos del usuario ingresado
let datosUsuario = new Billetera(nombreUsuario, monedaDivisa, ingresoDinero)
console.log (datosUsuario.nombre + " ahorra en " + datosUsuario.divisaNombre);
console.log("Valor de cuenta: " + datosUsuario.cantidad + " " + datosUsuario.divisaNombre);

//Generamos la conversion de criptomonedas
let monedaCripto = cambioCripto();
convertirCripto(datosUsuario.cantidad, monedaCripto);


