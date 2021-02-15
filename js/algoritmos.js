
// ----------------- COMIENZO ALGORITMO CON DOM ---------------------- //
let billetera = new BilleteraParcial('ARS', 0); //divisa, cripto, billeteraTotal, cantidadDivisa, cantidadCripto
let carteraCriptos = [];
panelUsuario = aperturaPanelUser('userIn', 'salir');
mostrarBilletera();

monedaDeposito = depositar('botonDeposito');
depositarAutomatico = eventoInput();
botonOjo = presionaOjo();
criptoJson = tomarJson();
modificarSimbolos('monedaDR')
modificarSimbolos('conversorSimbolo');
opcionCripto();
let criptoElegida = separacionCriptos();