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
}

//PASAMOS AL USUARIO LA MONEDA ENTERA
function objetoCompleto (divisa, array){ 
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(divisa == arrayDivisas.value){ 
            break;
        }
    }
    return array[i]
}



//Verificacion de cambio de cripto
let conversion = ( moneda, criptoValue) => parseFloat((criptoValue.value / moneda.value ).toFixed(criptoValue.decimales));

function convertiCriptos (divisa, criptoArray){ 
    let arrayConvertido = [];
    for (let i = 0; i < criptoArray.length; i++){
        let valoresArray = criptoArray[i];
        let criptosConvertidos = conversion (divisa, valoresArray);
        arrayConvertido.push(criptosConvertidos);
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
function feedBack(cantidadCompra, criptoConvertido, carteraCriptos){ // se encarga de redondear la cantidad de criptos compradas

    for (i = 0; i < carteraCriptos.length; i++){
        let cripto = carteraCriptos[i];
        if (criptoConvertido == cripto.value){
            cantidadCompra = parseFloat (cantidadCompra.toFixed(cripto.decimales));
            break;
        }
    }
    return cantidadCompra   
}


// FUNCIONES PARA ADMINISTRAR BILLETERA LOCAL
function distribucionBilletera(cantidadPesos, tipoCripto, tipoCambio) { // Ingresamos --> cantidad de plata / valor de cripto / valor de moneda
    let billetera = [];
    let cantidad, cantidadCriptos, cantidadRedondeada, dineroCuenta, dineroAlcanza;

    cantidad = parseInt(prompt('Ingrese cantidad de dinero para compra'));

    cantidad = validacionIngresoDinero(cantidad, 'la suma de dinero con la que desea comprar');
    dineroCuenta = validacionIngresoDinero(cantidad);
    dineroAlcanza = validacionDisponibilidad(cantidadPesos, dineroCuenta);

    dineroRestante = cantidadPesos - dineroAlcanza;
    billetera.push(dineroRestante);

    cantidadCriptos = parseFloat((dineroAlcanza * tipoCambio) / tipoCripto);
    cantidadRedondeada = feedBack(cantidadCriptos, tipoCripto, carteraCriptos);

    billetera.push(cantidadRedondeada);

    return billetera; 
}


function estadoBilletera (cantidadDivisa, cantidadCripto, divisaUsada, criptoComprado){
    let billetera = [divisaUsada, cantidadDivisa, cantidadCripto, criptoComprado];
    let estadoFinal = [];
    let slice;

    for(i = 0; i < billetera.length; i = i + 2){
        slice = billetera.slice(i,i+2);
        slice = slice.toString();
        slice = slice.replace(',',' ')
        estadoFinal.push(slice);
    }
    return estadoFinal;
}


function VerificacionReferencia ({divisa}, divisaConvertida, id, clase){
    let elementoPadre = document.getElementById(id);
    let elementoHijo = document.getElementsByClassName(clase);
    let elementoParaRemover = elementoHijo[0];

    if(divisa == usd){
        elementoPadre.removeChild(elementoParaRemover);
    } 
}


function conversionRefencia ( {cantidadDivisa}, {cantidadCripto}, divisaConversion, criptoConversion){
    let billeteraEnDolares = [];
    let divisaEnDolares, criptoEnDolares;

    divisaEnDolares = parseFloat((cantidadDivisa * divisaConversion).toFixed(2));
    billeteraEnDolares.push(divisaEnDolares);

    criptoEnDolares = parseFloat((cantidadCripto * criptoConversion).toFixed(2));
    billeteraEnDolares.push(criptoEnDolares);

    return billeteraEnDolares;
}

function modificarValores (classTexto, divisa, cripto){ // Modificador debe ser array con listado de cripto de usuario
    let elemento = document.getElementsByClassName(classTexto);

    elemento[0].innerHTML = divisa;
    elemento[1].innerHTML = cripto;
}
function modificarId (idtexto, texto){
    let elemento = document.getElementById(idtexto);
    elemento.innerHTML = texto;
}

function agregarNodos (idPadre, atributo, nombreAtributo, { billeteraTotal }){
    let etiqueta, contenido, nodoPrincipal;

    etiqueta = document.createElement('p');
    etiqueta.setAttribute(atributo, nombreAtributo); 

    contenido = document.createTextNode(billeteraTotal); 
    etiqueta.appendChild(contenido);

    nodoPrincipal = document.getElementById(idPadre);
    nodoPrincipal.appendChild(etiqueta);
}