//FUNCIONES PARA VALIDACIÓN DE DIVISAS

//Consultamos que tipo de divisa de va a ingresar
function cambioDinero(){

    let divisa = false;
    let moneda;

    while(divisa == false){
        moneda = prompt("Que tipo de moneda quiere ingresar", "ARS - USD - EURO");
        moneda = moneda.toLowerCase();

        if(moneda == 'ars'){
            moneda = ars;
            divisa = true;
        } else if(moneda == 'usd'){
            moneda = usd;
            divisa = true;
        } else if(moneda == 'euro'){
            moneda = euro;
            divisa = true;
        } else{
            alert("La divisa ingresada no es valida");
        }
    }

    return moneda;
}

//Verificacion de cambio de cripto
function cambioCripto(){
    let validacion = false;
    let moneda;

    while(validacion == false){
        moneda = prompt("¿Qué Criptomoneda desea comprar?\n" + 
                        bitcoin.nombre + "  = $" + bitcoin.value + "\n" +
                        ethereum.nombre + " = $" + ethereum.value + "\n" +
                        litecoin.nombre + " = $" + litecoin.value + "\n" +
                        tether.nombre + " = $" + tether.value , "BTC - ETH - LTC - USDT");
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
    if(divisa == ars){
        return "pesos"
    } else if(divisa == usd){
        return "dolares"
    } else {
        return "euros"
    }
}

// tipo de criptomoneda
function declaracionCripto (cripto, cartera){ // primer parametro debe ser el valor de la cripto y el segundo objeto para desarmarlo

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
