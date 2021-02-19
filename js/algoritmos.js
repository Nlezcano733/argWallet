
// ----------------- COMIENZO ALGORITMO CON DOM ---------------------- //
let billetera, objetoMoneda, billeteraCompleta;

billeteraCompleta = billeteraCompletaInicial ();

billetera = billeteraInicial();
if(billetera.billeteraTotal > 0){
    habilitarBoton();
    bloquearSeleccionMoneda();
    
    retirar('botonRetiro');
}

objetoMoneda = objetoCompleto(billetera, carteraDivisas);
objetoMonedaToStorage(objetoMoneda);

let carteraCriptos = [];

// ARMADO DE ESTRUCTURA DINAMICA -- HEADER
panelUsuario = aperturaPanelUser('userIn', 'salir');
mostrarBilletera();
presionaOjo();


// DEPOSITOS Y RETIROS -- VALIDACION DE ACCIONES
monedaDeposito = depositar('botonDeposito');
depositarAutomatico = eventoInput();

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
