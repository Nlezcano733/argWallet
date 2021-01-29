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
    let cripto = false;
    let moneda;

    while(cripto == false){
        moneda = prompt("¿Qué Criptomoneda desea comprar?\n" + 
                        bitcoin.nombre + "  = $" + bitcoin.value + "\n" +
                        ethereum.nombre + " = $" + ethereum.value + "\n" +
                        litecoin.nombre + " = $" + litecoin.value + "\n" +
                        tether.nombre + " = $" + tether.value , "BTC - ETH - LTC - USDT");
        moneda = moneda.toLocaleUpperCase();

        if(moneda == bitcoin.ticker){
            moneda = bitcoin.value;
            cripto = true;
        } else if(moneda == ethereum.ticker){
            moneda = ethereum.value;
            cripto = true;
        } else if(moneda == litecoin.ticker){
            moneda = litecoin.value;
            cripto = true;
        } else if(moneda == tether.ticker){
            moneda = tether.value;
            cripto = true;
        } else{
            alert("La divisa ingresada no es valida");
        }
    }
    
    return moneda;
}


//FUNCIONES PARA CONVERTIR DIVISAS

//Ingresamos la cantidad de dinero Fiat
function cantidadDinero(){
    let dineroCuenta;
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

    dineroCuenta = validacionIngresoDinero(ingresoDinero);
    return dineroCuenta;
}

//Conversion a cripto
function feedBack(cantidadCompra, criptoConvertido){

    let tickerCripto;

    if(criptoConvertido == bitcoin.value){
        cantidadCompra = parseFloat(cantidadCompra.toFixed(bitcoin.decimales));
        tickerCripto = bitcoin.ticker

    } else if(criptoConvertido == ethereum.value){
        cantidadCompra = parseFloat(cantidadCompra.toFixed(ethereum.decimales));
        tickerCripto = ethereum.ticker

    } else if(criptoConvertido == litecoin.value){
        cantidadCompra = parseFloat(cantidadCompra.toFixed(litecoin.decimales));
        tickerCripto = litecoin.ticker

    } else{
        cantidadCompra = parseFloat(cantidadCompra.toFixed(tether.decimales));
        tickerCripto = tether.ticker
    }

    console.log(`Compra total: ${cantidadCompra} ${tickerCripto}`);
    alert(`Usted adquirio: ${cantidadCompra} ${tickerCripto}` );

    return cantidadCompra

    // guardar todos los objetos de criptoactivos en un array
    // Crear funcion que realice el if 
    //realizar repeticion por cada valor
    //ver como colocar una sentencia break para optimizar codigo
    
}


//Tipo de moneda
function declaracionDivisa (divisa){
    if(divisa == 1){
        return "pesos"
    } else if(divisa == 151){
        return "dolares"
    } else {
        return "euros"
    }
}

// FUNCIONES PARA ADMINISTRAR BILLETERA LOCAL

function distribucionBilletera({wallet}, tipoCripto) {
    let billetera = [];
    let contadorPosiciones, cantidad, cantidadCriptos, cantidadRedondeada, dineroCuenta, dineroAlcanza;

    cantidad = parseInt(prompt('Ingrese cantidad de dinero para compra'));
    cantidad = validacionIngresoDinero(cantidad, 'la suma de dinero con la que desea comprar');
    dineroCuenta = validacionIngresoDinero(cantidad);
    dineroAlcanza = validacionDisponibilidad(wallet, dineroCuenta);

    dineroRestante = wallet - dineroAlcanza;
    console.log(dineroRestante);

    contadorPosiciones = billetera.push(dineroRestante);
    cantidadCriptos = parseFloat(dineroAlcanza / tipoCripto);

    cantidadRedondeada = feedBack(cantidadCriptos, tipoCripto);

    contadorPosiciones = billetera.push(cantidadRedondeada);
    console.log(billetera)
    
    console.log("hasta aca vamos bien");

    return billetera;
}

/*
    PUNTOS RESTANTES:
    - posibilidad de ver estado de billetera --> Crear objeto billetera global

*/