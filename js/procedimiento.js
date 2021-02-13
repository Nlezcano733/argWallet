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

    if (dineroIngresado < billeteraActual){
        cantidadRestante = billeteraActual - dineroIngresado;
        billetera = new BilleteraParcial (billetera.divisa, cantidadRestante);
        validarOperacionDR('Movimiento exitoso')
    } else{
        validarOperacionDR ('No dispone de fondos suficientes');
    }
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