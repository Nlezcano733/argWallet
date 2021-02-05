//FUNCIONES PARA VALIDACIÓN DE DIVISAS

//Consultamos que tipo de divisa de va a ingresar
function cambioDinero(){

    let divisa = false;
    let moneda;

    while(divisa == false){
        moneda = prompt("Que tipo de moneda quiere ingresar", "ARS - USD - EURO");
        moneda = moneda.toUpperCase();
        if(moneda == ars.ticker){
            moneda = ars.value;
            divisa = true;
        } else if(moneda == usd.ticker){
            moneda = usd.value;
            divisa = true;
        } else if(moneda == euro.ticker){
            moneda = euro.value;
            divisa = true;
        } else{
            alert("La divisa ingresada no es valida");
        }
    }

    return moneda;
    //retorna el valor de la moneda que queda --> ej: usd  = 151
}

//PASAMOS AL USUARIO LA MONEDA ENTERA
function objetoMoneda (moneda, arrayMonedas){
    let i, array;
    for(i=0; i< arrayMonedas.length; i++){
        array = arrayMonedas[i];
        if(moneda == array.value){
            break;
        }
    }
    return array;
}


//Verificacion de cambio de cripto
let conversion = ( moneda, criptoValue) => parseFloat((criptoValue.value / moneda.value ).toFixed(criptoValue.decimales));

function convertiCriptos (divisa, criptoArray){ 
    let arrayConvertido = [];
    for (let i = 0; i < criptoArray.length; i++){
        let contadorPosiciones;
        let valoresArray = criptoArray[i];

        let criptosConvertidos = conversion (divisa, valoresArray);
        contadorPosiciones = arrayConvertido.push(criptosConvertidos);
    }
    return arrayConvertido
}


function cambioCripto(objetoMoneda, criptoArray ){ 
    let validacion = false;
    let moneda;
    let conversion = convertiCriptos (objetoMoneda, criptoArray);

    while(validacion == false){
        moneda = prompt("¿Qué Criptomoneda desea comprar?\n" + 
                        bitcoin.nombre + "  = $" + conversion[0].toFixed(2) + "\n" +
                        ethereum.nombre + " = $" + conversion [1].toFixed(2) + "\n" +
                        litecoin.nombre + " = $" + conversion [2].toFixed(2)+ "\n" +
                        tether.nombre + " = $" + conversion[3].toFixed(2) , "BTC - ETH - LTC - USDT");
        moneda = moneda.toLocaleUpperCase();
        
        for (i = 0; i < carteraCriptos.length; i++){
            let criptos = carteraCriptos [i];
            if(moneda == criptos.ticker){
                moneda = criptos.value;
                validacion = true;
                break;
            }
        }
        if (validacion == false){
            alert("La divisa ingresada no es valida");
        }
    }
    return moneda;
}


//FUNCIONES PARA CONVERTIR DIVISAS

//Ingresamos la cantidad de dinero Fiat
function cantidadDinero(){
    ingresoDinero = parseFloat(prompt("Ingrese la cantidad de dinero que quiera ingresar en su cuenta"));

    //VALIDACION DE INGRESO
    if (isNaN(ingresoDinero)){
        let validacion = false;
        while (validacion == false){
            ingresoDinero = parseFloat(prompt('Por favor ingrese una cantidad de dinero para poder comenzar a operar'));
            if (ingresoDinero != '' && ingresoDinero != null){
                validacion = true
            }
        }
    }
    return ingresoDinero;
}


//Conversion a cripto
function feedBack(cantidadCompra, criptoConvertido, carteraCriptos){

    let tickerCripto;

    for (i = 0; i < carteraCriptos.length; i++){
        let cripto = carteraCriptos[i];
        if (criptoConvertido == cripto. value){
            cantidadCompra = parseFloat (cantidadCompra.toFixed(cripto.decimales));
            tickerCripto = cripto.ticker;
            break;
        }
    }
    console.log(`Compra total: ${cantidadCompra} ${tickerCripto}`);
    alert(`Usted adquirio: ${cantidadCompra} ${tickerCripto}` );

    return cantidadCompra   
}


//Tipo de moneda
function declaracionDivisa (divisa){
    if(divisa == ars.value){
        return ars.ticker
    } else if(divisa == usd.value){
        return usd.ticker
    } else {
        return usd.ticker
    }
}


// tipo de criptomoneda
function declaracionCripto (cripto, cartera){
    for(i = 0; i < cartera.length; i++){
        posicionesCartera = cartera[i];
        if(cripto == posicionesCartera.value){
            return posicionesCartera.ticker
        }
    }
}


// FUNCIONES PARA ADMINISTRAR BILLETERA LOCAL
function distribucionBilletera({billete}, tipoCripto, tipoCambio) { 
    let billetera = [];
    let contadorPosiciones, cantidad, cantidadCriptos, cantidadRedondeada, dineroCuenta, dineroAlcanza;

    cantidad = parseInt(prompt('Ingrese cantidad de dinero para compra'));
    cantidad = validacionIngresoDinero(cantidad, 'la suma de dinero con la que desea comprar');
    dineroCuenta = validacionIngresoDinero(cantidad);

    dineroAlcanza = validacionDisponibilidad(billete, dineroCuenta);
    dineroRestante = billete - dineroAlcanza;

    contadorPosiciones = billetera.push(dineroRestante);

    cantidadCriptos = parseFloat((dineroAlcanza * tipoCambio) / tipoCripto);
    cantidadRedondeada = feedBack(cantidadCriptos, tipoCripto, carteraCriptos);

    contadorPosiciones = billetera.push(cantidadRedondeada);
    console.log(billetera)
    
    console.log("hasta aca vamos bien");

    return billetera; 
}


function estadoBilletera (cantidadDivisa, cantidadCripto, divisaUsada, criptoComprado){
    let billetera = [cantidadDivisa, divisaUsada, cantidadCripto, criptoComprado];
    let estadoFinal = [];
    let slice, contadorPosiciones;

    for(i = 0; i < billetera.length; i = i + 2){
        slice = billetera.slice(i,i+2);
        slice = slice.toString();
        slice = slice.replace(',',' ')
        contadorPosiciones = estadoFinal.push(slice);
    }
    console.log(estadoFinal)
    alert(`El estado de su cuenta actual es:\n${estadoFinal[0]}\n${estadoFinal[1]}`);

    return estadoFinal;
}
