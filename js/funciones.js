//FUNCIONES PARA VALIDACIÓN DE DIVISAS

//Consultamos que tipo de divisa de va a ingresar
function cambioDinero(){

    let divisa = false;
    let moneda;

    while(divisa == false){
        moneda = prompt("Que tipo de moneda quiere ingresar", "ARS - USD - EURO");

        if(moneda == 'ars' || moneda == 'Ars' || moneda == 'ARS'){
            moneda = ars;
            divisa = true;
        } else if(moneda == 'usd' || moneda == 'Usd' || moneda == 'USD'){
            moneda = usd;
            divisa = true;
        } else if(moneda == 'euro' || moneda == 'Euro' || moneda == 'EURO'){
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
                        tether.nombre + " = $" + tether.value , "BTC - ETH - LTC - USDT")

        if(moneda == 'btc' || moneda == 'BTC' || moneda == 'Btc'){
            moneda = bitcoin.value;
            cripto = true;
        } else if(moneda == 'eth' || moneda == 'Eth' || moneda == 'ETH'){
            moneda = ethereum.value;
            cripto = true;
        } else if(moneda == 'ltc' || moneda == 'Ltc' || moneda == 'LTC'){
            moneda = litecoin.value;
            cripto = true;
        } else if(moneda == 'usdt' || moneda == 'Usdt' || moneda == 'USDT'){
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
function convertirDivisas(money){
    ingresoDinero = parseFloat(prompt("Ingrese la cantidad de dinero que quiera ingresar en su cuenta"));
    if(ingresoDinero <= 0){
        confirmacion = false;

        while(confirmacion == false){
            alert("Por favor, ingrese una suma de dinero Real");
            ingresoDinero = parseFloat(prompt("Ingrese la cantidad de dinero que quiera ingresar en su cuenta"));
            if (ingresoDinero > 0){
                confirmacion = true;
            }
        }
    return ingresoDinero;
    }


    console.log(ingresoDinero);

    if(money != 1){
        ingresoDinero = Math.round((ingresoDinero * 100) * money)/100;
        console.log("La conversion a pesos es: $" + ingresoDinero);
    } else {
        console.log("esta en pesos");
    }
}



//Conversion a cripto
function convertirCripto(dineroIngresado, criptoConvertido){

    let criptomonedas = dineroIngresado / criptoConvertido;
    let tickerCripto, criptomonedasStr;

    if(criptoConvertido == bitcoin.value){
        criptomonedasStr = parseFloat(criptomonedas.toFixed(4));
        tickerCripto = bitcoin.ticker

    } else if(criptoConvertido == ethereum.value){
        criptomonedasStr = parseFloat(criptomonedas.toFixed(4));
        tickerCripto = ethereum.ticker

    } else if(criptoConvertido == litecoin.value){
        criptomonedasStr = parseFloat(criptomonedas.toFixed(6));
        tickerCripto = litecoin.ticker

    } else{
        criptomonedasStr = parseFloat(criptomonedas.toFixed(2));
        tickerCripto = tether.ticker
    }

    console.log(criptomonedasStr + " " + tickerCripto);
    alert("Usted adquirió: " + criptomonedasStr + " " + tickerCripto );
    console.log("hasta aca vamos bien");
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