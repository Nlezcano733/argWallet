// nombreUsuario = prompt("Bienvenid@ a ArgWALLET\n Por favor, ingrese su nombre");
// nombreUsuario = validacionIngresoString(nombreUsuario);

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
