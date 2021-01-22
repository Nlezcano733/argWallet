let ars = 1;
let usd = 151;
let euro = 183;
let usdt = 151;
let btc = 2652536.61;
let eth = 96502.48;
let ltc = 11202.62;

let ingresoDinero;

let monedaDivisa = cambioDinero();
convertirDivisas(monedaDivisa);

let monedaCripto = cambioCripto();
convertirCripto(ingresoDinero, monedaCripto);
