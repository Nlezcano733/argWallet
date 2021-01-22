//FUNCIONES PARA VALIDACIÓN DE DIVISAS

//Consultamos que tipo de divisa de va a ingresar
function cambioDinero(){
    let divisa = false;
    let moneda;

    while(divisa == false){
        moneda = prompt("Que tipo de moneda quiere ingresar\n Pesos --> ars\n Dolar --> usd\n Euro --> euro");

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
        moneda = prompt("Que Criptomoneda desea comprar?:\n Bitcoin (BTC)= $" + btc + "\n Ethereum (ETH)= $" + eth + "\n Litecoin (LTC)= $" + ltc + "\n Tether (USDT)= $" + usdt);

        if(moneda == 'btc' || moneda == 'BTC' || moneda == 'Btc'){
            moneda = btc;
            cripto = true;
        } else if(moneda == 'eth' || moneda == 'Eth' || moneda == 'ETH'){
            moneda = eth;
            cripto = true;
        } else if(moneda == 'ltc' || moneda == 'Ltc' || moneda == 'LTC'){
            moneda = ltc;
            cripto = true;
        } else if(moneda == 'usdt' || moneda == 'Usdt' || moneda == 'USDT'){
            moneda = usdt;
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

    if(criptoConvertido == btc){
        tickerCripto = "BTC";
        criptomonedasStr = parseFloat(criptomonedas.toFixed(4));
        console.log(criptomonedasStr + " " + tickerCripto);
    } else if(criptoConvertido == eth){
        tickerCripto = "ETH";
        criptomonedasStr = parseFloat(criptomonedas.toFixed(4));
        console.log(criptomonedasStr + " " + tickerCripto);
    } else if(criptoConvertido == ltc){
        tickerCripto = "LTC";
        criptomonedasStr = parseFloat(criptomonedas.toFixed(6));
        console.log(criptomonedasStr + " " + tickerCripto);
    } else{
        tickerCripto = "USDT";
        criptomonedasStr = parseFloat(criptomonedas.toFixed(2));
        console.log(criptomonedasStr + " " + tickerCripto);
    }

    alert("Usted adquirió: " + criptomonedasStr + " " + tickerCripto );
    console.log("hasta aca vamos bien");
}
