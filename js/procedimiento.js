function crearBilletera(input, moneda){
    let dineroIngresado;
    dineroIngresado = parseInt(input);
    billetera = new BilleteraParcial (moneda, input);
    validarOperacionDR('Movimiento exitoso')
}

function sumarBilletera(input, {billeteraTotal}, moneda){
    let dineroIngresado, cantidadSumada;
    dineroIngresado = parseInt(input);

    cantidadSumada = dineroIngresado + billeteraTotal;
    billetera = new BilleteraParcial(moneda, cantidadSumada);
    validarOperacionDR('movimiento exitoso')
}

function restarBilletera(input){
    let dineroIngresado, cantidadRestante, billeteraActual;
    dineroIngresado = parseInt(input);
    billeteraActual = billetera.billeteraTotal;

    if (dineroIngresado <= billeteraActual){
        cantidadRestante = billeteraActual - dineroIngresado;
        billetera = new BilleteraParcial (billetera.divisa, cantidadRestante);
        validarOperacionDR('Movimiento exitoso')
    } 
    if (dineroIngresado > billeteraActual){
        validarOperacionDR ('No dispone de fondos suficientes');
    }
    habilitarSeleccionMoneda();
}


function objetoCompleto ({divisa}, array){ 
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(divisa == arrayDivisas.ticker){ 
            break;
        }
    }
    return arrayDivisas;
}

// --------------------------------------------------- //

function tomarJson(){
    let i;
    let listadoJson = JSON.stringify(LISTA_CRIPTOS)   // Primero se debe pasara string todos los valores json
    let objetos = JSON.parse(listadoJson);       //luego de debe parsear para poder utilizar los valores

    for (i=0;i<objetos.length; i++){
        let objetosSeparados = objetos[i];
        objetoCripto = objetosSeparados;
        carteraCriptos.push(objetoCripto)
    }
}