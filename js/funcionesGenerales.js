// -------------------------------------------- //
//                VALIDACIONES                  //
// -------------------------------------------- //

function validarOperacion (mensaje, padreClass, id){
    let nodoPadre, elemento, contenido;
    elemento = document.createElement('p');
    contenido = document.createTextNode(mensaje);

    $(elemento).append(contenido);
    $(elemento).attr('id', id);

    nodoPadre = $(padreClass);
    $(nodoPadre).append(elemento);

    setTimeout(() =>{
        $(elemento).remove();
    }, 2500);
}


// -------------------------------------------- //
//                   NAVEGACION                 //
// -------------------------------------------- //

function avanzarBody(ubicacion) {
    $('html, body').animate({
        scrollTop: $(ubicacion).offset().top
    }, 1000);
}

function scrollify() {
    $.scrollify({
        section: '.scrollify',
        setHeights: false
    });
}

function deshabilitarScrollify (){
    $.scrollify.disable();
}
function habilitarScrollify(){
    $.scrollify.enable();
}

// -------------------------------------------- //
//                 CREAR NODOS                  //
// -------------------------------------------- //

function crearDivIdPadre (idPadre, attr, nombreAttr){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(idPadre);
    nuevoNodo = document.createElement('div');
    $(nuevoNodo).attr(attr, nombreAttr);
    $(nodoPadre).append(nuevoNodo);
}

function crearDivClassPadre (classPadre, attr, nombreAttr, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(classPadre);
    nuevoNodo = document.createElement('div');
    $(nuevoNodo).attr(attr, nombreAttr);
    $(nodoPadre[i]).append(nuevoNodo);
}


function crearElemento (padre, tag, attr, nombreAttr, contenido, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(padre);
    nuevoNodo = document.createElement(tag);
    contenidoTexto = document.createTextNode(contenido);

    $(nuevoNodo).append(contenidoTexto);
    $(nuevoNodo).attr(attr, nombreAttr);
    $(nodoPadre[i]).append(nuevoNodo);
}


function modificarElemento(elemento, contenido){
     $(elemento).text(contenido)
}

function modificarSimbolos(id, modificador){
    billetera = billeteraInicial();
    let objetoDivisa = objetoCompleto(billetera, carteraDivisas);
    if(modificador == 'simbolo'){
        modificarElemento(id, objetoDivisa.simbolo)
    } 
    if(modificador == 'divisa'){
        modificarElemento(id, billetera.divisa)
    }
}

function crearImagen (padre, direccion, attr, nombreAttr, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(padre);
    nuevoNodo = document.createElement('img');

    $(nuevoNodo).attr('src', direccion);
    $(nuevoNodo).attr(attr, nombreAttr);

    $(nodoPadre[i]).append(nuevoNodo)
}

function modificarFoto(nodoImagen, direccion){
    let nodo;
    nodo = $(nodoImagen).attr('src', direccion);
}

function capturarEvento (event){
    console.log(event.which);
}



// -------------------------------------------- //
//            FUNCIONES SOBRE ACTIVO            //
// -------------------------------------------- //

function primeraLetraMayuscula (string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function nombreDeCripto ({id}, {symbol}){
        nombre = primeraLetraMayuscula(id);
        let ticker = symbol.toUpperCase();
        return `${nombre}`
}

function parDeConversion ({symbol}, moneda){
    let par = `${symbol}/${moneda}`
    return par.toUpperCase();
}

function porcentajeDeCambio (cambio){
    criptoCambio = parseFloat(cambio).toFixed(2)
    return `${criptoCambio} %`
}

function grandesCantidades (cantidad){
    let criptoVol = cantidad;
    let millon = 1000000;
    let billon = millon * 1000;

    if(criptoVol >= billon){
        criptoVol = parseFloat(criptoVol / billon).toFixed(2);
        return `${criptoVol} B`
    }
    if(criptoVol >= millon){
        criptoVol = parseFloat(criptoVol / millon).toFixed(2);
        return `${criptoVol} M`
    }
}

function formateoFecha(fecha){
    let fechaRecortada = fecha.split('T');
    fechaFormateo = fechaRecortada[0].split('-');
    return `${fechaFormateo[2]}/${fechaFormateo[1]}/${fechaFormateo[0]}`
}

function crearTr(nodoPadre, nombreClase){
    let nuevoNodo;
    padre = $(nodoPadre);

    nuevoNodo = document.createElement('tr');
    $(nuevoNodo).attr('class', nombreClase);
    $(nodoPadre).append(nuevoNodo);
}


// -------------------------------------------- //
//                    STORAGE                   //
// -------------------------------------------- //

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

function criptoCompletoToStorage(cripto){
    let criptoElegida = JSON.stringify(cripto);
    sessionStorage.setItem('criptomoneda', criptoElegida);
}

function actualizarBilleterasStorage(){
    billeteraToStorage();
    if(billeteraPesos){
        billeteraArsToStorage();
    }
    if(billeteraDolares){
        billeteraUsdToStorage(); 
    }
    if(billeteraEuros){
        billeteraEurToStorage();
    }
}

function billeteraToStorage(){
    let billeteraActual = JSON.stringify(billetera);
    localStorage.setItem('billetera', billeteraActual);
}

function billeteraArsToStorage(){
    let billeteraArs = JSON.stringify(billeteraPesos);
    localStorage.setItem('billeteraArs', billeteraArs);
}
function billeteraUsdToStorage(){
    let billeteraUsd = JSON.stringify(billeteraDolares);
    localStorage.setItem('billeteraUsd', billeteraUsd);
}
function billeteraEurToStorage(){
    let billeteraEur = JSON.stringify(billeteraEuros);
    localStorage.setItem('billeteraEur', billeteraEur);
}

function billeteraCompletaToStorage(){
    let billeteraFinal = JSON.stringify(billeteraCompleta);
    localStorage.setItem('billeteraCompleta', billeteraFinal);
}

// function objetoMonedaToStorage(moneda){
//     let monedaElegida = JSON.stringify(moneda);
//     localStorage.setItem('moneda', monedaElegida);
// }

function compraToStorage(compra){
    let criptoComprada = JSON.stringify(compra);
    sessionStorage.setItem('compra', criptoComprada);
}


// -------------------------------------------- //
//               INICIAR BILLETERA              //
// -------------------------------------------- //

function billeterasTotalesInicial (){
    billeteraPesos =  billeteraArsInicial()
    billeteraDolares =  billeteraUsdInicial()
    billeteraEuros =  billeteraEurInicial()

    sumatoriaBilleteraTotal();
    
    billeteraCompleta = billeteraCompletaInicial()
    billetera = billeteraInicial()
}

function billeteraCompletaInicial(){
    billeteraCompleta = obtenerStorage('billeteraCompleta');
    if(billeteraCompleta == null || billeteraCompleta == ""){
        billeteraCompleta = new Billetera('ars', 'undefined', ars, 0, 0, 0);
    }
    return billeteraCompleta;
    //Seteo de billetera nula para comenzar
}

// function monedaInicial(){
//     moneda = obtenerStorage('moneda');
//     if(moneda == null || moneda == ''){
//         moneda = carteraDivisas[0]
//     }
//     return moneda;
//     //verifica si hay una moneda guardada
// }

function billeteraInicial(){
    billetera = obtenerStorage('billetera')
    if(billetera == null || billetera == ""){
        billetera = new BilleteraParcial(0, 0, 0);
    }
    return billetera
    //verifica si hay billetera inicial parcial (moneda, cantidad)
}

function billeteraArsInicial(){
    billeteraArs = obtenerStorage('billeteraArs')
    if(billeteraArs == null || billeteraArs == ""){
        billeteraArs = new BilleteraArs(0);
    }
    return billeteraArs
}
function billeteraUsdInicial(){ 
    billeteraUsd = obtenerStorage('billeteraUsd')
    if(billeteraUsd == null || billeteraUsd == ""){
        billeteraUsd = new BilleteraUsd(0);
    }
    return billeteraUsd
}
function billeteraEurInicial(){
    billeteraEur = obtenerStorage('billeteraEur')
    if(billeteraEur == null || billeteraEur == ""){
        billeteraEur = new BilleteraEur(0);
    }
    return billeteraEur
}

function objetoCompleto (divisa, array){
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(divisa == arrayDivisas.ticker){ 
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun objeto Billetera
}

function objetoCompletoSelecto(selector, array){
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(selector == arrayDivisas.ticker){
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun selector
}


function eleccionDeBilletera (moneda){
    if(moneda == 'ars'){
        return billeteraPesos
    }
    if(moneda == 'usd'){
        return billeteraDolares
    }
    if(moneda == 'eur'){
        return billeteraEuros
    }
}


// -------------------------------------------- //
//            UNIFICACION DE BILLETERA          //
// -------------------------------------------- //

function sumatoriaBilleteraTotal (){
    let billeteraArs = obtenerStorage('billeteraArs');
    let billeteraUsd = obtenerStorage('billeteraUsd');
    let billeteraEur = obtenerStorage('billeteraEur');
    let armadoDeBilletera;

    if(billeteraArs == null && billeteraUsd == null && billeteraEur == null){
        pesos = 0;
        dolares = 0;
        euros = 0;
    } else{
        pesos = billeteraArs.billeteraTotal;
        dolares = billeteraUsd.billeteraTotal;
        euros = billeteraEur.billeteraTotal;
    }
    armadoDeBilletera = conversionCadaValor(pesos, dolares, euros);
    return armadoDeBilletera;
}


function conversionCadaValor (pesos, dolares, euros){
    let sumatoria;
    let valorPeso = carteraDivisas[0].value;
    let valorDolar = carteraDivisas[1].value;
    let valorEuro = carteraDivisas[2].value;
    let monedaSumatoria = $('.billeteraUser__balance--divisas').val()
    monedaSumatoria = monedaSumatoria.toLowerCase()

    if(monedaSumatoria == 'ars'){
        pesos = pesos;
        dolares = dolares * valorDolar;
        euros =  euros * valorEuro;
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    if(monedaSumatoria == 'usd'){
        pesos = pesos * (valorPeso/valorDolar);
        dolares = dolares;
        euros = euros * (valorEuro/valorDolar);
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    if(monedaSumatoria == 'eur'){
        pesos = pesos * (valorPeso/ valorEuro);
        dolares = dolares * (valorDolar / valorEuro);
        euros = euros;
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    pesos = parseFloat(pesos).toFixed(3)
    dolares = parseFloat(dolares).toFixed(3)
    euros = parseFloat(euros).toFixed(3)

    billetera = new BilleteraParcial(pesos, dolares, euros);
    return sumatoria;
}

function objetoCompletoSelecto(selector, array){
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(selector == arrayDivisas.ticker){
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun selector
}