
// ----------------- COMIENZO ALGORITMO CON DOM ---------------------- //
let billetera = new Billetera('', '', 0, 0, 0); //divisa, cripto, billeteraTotal, cantidadDivisa, cantidadCripto
let validacion = false;

panelUsuario = aperturaPanelUser('userIn', 'salir');
monedaDeposito = depositar('botonDeposito', billetera);
monedaRetiro = retirar('botonRetiro', billetera);
