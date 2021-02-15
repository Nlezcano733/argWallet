function crearBilletera(input, moneda){
    let dineroIngresado;
    dineroIngresado = parseInt(input);
    billetera = new BilleteraParcial (moneda, input);
    let objetoMonedaElegida = objetoCompleto(billetera, carteraDivisas);

    habilitarBoton();
    bloquearSeleccionMoneda();
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

// --------------------------------------------------- //

function tratamientoCripto (posicion, moneda){
    let valorRedondeado;
    if(moneda == 'ARS'){
        valorRedondeado = parseFloat((posicion.valor_ars).toFixed(2));
    } else if(moneda == 'USD'){
        valorRedondeado = parseFloat((posicion.valor_usd).toFixed(2));
    } else{
        valorRedondeado = parseFloat((posicion.valor_euro).toFixed(2));
    }
    return valorRedondeado;
}

function compraComision (valor){
    let valorCompra;
    valorCompra = parseFloat((valor + (valor * 0.003)).toFixed(2));
    return valorCompra;
}

// -------------------------------------------------- //
function conversionEntreMonedas (valorMoneda){
    let conversionEnDivisas = [];
    for(let i=0; i<carteraDivisas.length; i++){
        let monedaConvertida;
        monedaConvertida = parseFloat((valorMoneda / carteraDivisas[i].value).toFixed(5));
        conversionEnDivisas.push(monedaConvertida);
    }
    return conversionEnDivisas;
}

