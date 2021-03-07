function crearBilletera(input, moneda){
    let dineroIngresado;

    if(input != null || input != ""){
        dineroIngresado = parseInt(input);
        billetera = new BilleteraParcial (moneda, input);
        billeteraToStorage();

        objetoMoneda = objetoCompleto(billetera, carteraDivisas);
        objetoMonedaToStorage(objetoMoneda);

        habilitarBoton();
        bloquearSeleccionMoneda();
        validarOperacion('Actualice la pagina para ver valores actualizados', 'dr')
    } else{
        validarOperacion('Ingrese un valor real.', 'dr');
        input = "";
    }
}

function sumarBilletera(input, {billeteraTotal}, moneda){
    let dineroIngresado, cantidadSumada;
    dineroIngresado = parseInt(input);
    
    cantidadSumada = dineroIngresado + billeteraTotal;
    billetera = new BilleteraParcial(moneda, cantidadSumada);
    billeteraToStorage();
    validarOperacion('movimiento exitoso', 'dr');
}

function restarBilletera(input){
    let dineroIngresado, cantidadRestante, billeteraActual;
    dineroIngresado = parseInt(input);
    billeteraActual = billetera.billeteraTotal;

    if (dineroIngresado <= billeteraActual){
        cantidadRestante = billeteraActual - dineroIngresado;
        billetera = new BilleteraParcial (billetera.divisa, cantidadRestante);
        billeteraToStorage();
        validarOperacion('Movimiento exitoso', 'dr')
    } 
    if (dineroIngresado > billeteraActual){
        validarOperacion('No dispone de fondos suficientes', 'dr');
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

function tomarJson(carteraCriptos){
    let i;
    let listadoJson = JSON.stringify(LISTA_CRIPTOS);
    let objetos = JSON.parse(listadoJson); 

    for (i=0;i<objetos.length; i++){
        let objetosSeparados = objetos[i];
        objetoCripto = objetosSeparados;
        carteraCriptos.push(objetoCripto)
    }
    return carteraCriptos
}

function actualizarMarketCap (posicion){
    moneda = obtenerStorage('moneda')
    marketCapPesos = posicion.market_cap * usd.value;
    marketCapActualizado = parseFloat((marketCapPesos / moneda.value).toFixed(0));
    return marketCapActualizado;
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

// -------------------------------------------------- //
function obtenerStorage(key){
    let objetoObtenido = localStorage.getItem(key);
    objeto = JSON.parse(objetoObtenido);
    return objeto;
}
function obtenerSessionStorage(key){
    let objetoContenido = sessionStorage.getItem(key);
    objeto = JSON.parse(objetoContenido);
    return objeto;
}

function criptoToStorage(cripto){
    let criptoElegida = JSON.stringify(cripto);
    sessionStorage.setItem('cripto', criptoElegida);
}

function billeteraToStorage(){
    let billeteraActual = JSON.stringify(billetera);
    localStorage.setItem('billetera', billeteraActual);
}

function objetoMonedaToStorage(moneda){
    let monedaElegida = JSON.stringify(moneda);
    localStorage.setItem('moneda', monedaElegida);
}

// -------------------------------------------------------//

function elegirValor (cripto){
    let moneda = obtenerStorage('moneda');
    moneda = moneda.ticker;
    if (moneda == carteraDivisas[0].ticker){
        return cripto.valor_ars
    }
    if(moneda == carteraDivisas[1].ticker){
        return cripto.valor_usd
    }
    if(moneda == carteraDivisas[2].ticker){
        return cripto.valor_euro
    }
}

function conversionMonedacripto (cantidad){
    let cripto = obtenerSessionStorage('cripto');
    let criptoElegida = elegirValor(cripto);
    let conversion = parseFloat((cantidad / criptoElegida).toFixed(cripto.decimales));
    return conversion
}