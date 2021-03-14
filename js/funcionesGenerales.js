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
    nodo = $(nodoImagen).attr('src', direccion);
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
    return cantidad
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

function textoCantidad (array){
    let arrayTexto = [];
    for(i=0; i<array.length;i++){
        simbolo = array[i].simbolo;
        billeteraTotal = array[i].billeteraTotal;
        cantidad = grandesCantidades(billeteraTotal)
        texto = `${simbolo}${cantidad}`
        arrayTexto.push(texto)
    }
    console.log(arrayTexto)
    return arrayTexto;
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

function actualizacionBilleteras(moneda, cantidad){
    let selector = $(moneda).val();
    selector = selector.toLowerCase()

    if(selector == 'ars'){
        billeteraPesos =  new BilleteraArs(cantidad)
        billeteraArsToStorage()
    }
    if(selector == 'usd'){
        billeteraDolares =  new BilleteraUsd(cantidad)
        billeteraUsdToStorage()
    }
    if(selector == 'eur'){
        billeteraEuros =  new BilleteraEur(cantidad)
        billeteraEurToStorage()
    }
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

function obtenerArrayDeBilleteras(){
    let pesos = obtenerStorage('billeteraArs')
    let dolares = obtenerStorage('billeteraUsd')
    let euros = obtenerStorage('billeteraEur')
    return [pesos, dolares, euros]
}

function arrayComprasToStorage(){
    let array = JSON.stringify(arrayCompras);
    localStorage.setItem('listaCompras', array);
}
function compraToStorage(compra){
    let criptoComprada = JSON.stringify(compra);
    sessionStorage.setItem('compra', criptoComprada);
}

function ventaToStorage(venta){
    let criptoVendida = JSON.stringify(venta);
    sessionStorage.setItem('venta', criptoVendida);
}

function actualizarComprasStorage(arrayNuevo){
    localStorage.removeItem('listaCriptos');
    let nuevo = JSON.stringify(arrayNuevo);
    localStorage.setItem('listaCompras', nuevo)
}



// -------------------------------------------- //
//               INICIAR BILLETERA              //
// -------------------------------------------- //

function billeterasTotalesInicial (){
    billeteraPesos =  billeteraArsInicial()
    billeteraDolares =  billeteraUsdInicial()
    billeteraEuros =  billeteraEurInicial()
    arrayCompras = arrayComprasInicial();

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

function arrayComprasInicial(){
    array = obtenerStorage('listaCompras')
    if(array == null){
        array = []
    }
    return array
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


function elegirBilletera(moneda){
    if(moneda == 'ars'){
        return obtenerStorage('billeteraArs');
    }
    if(moneda == 'usd'){
        return obtenerStorage('billeteraUsd');
    }
    if(moneda == 'eur'){
        return obtenerStorage('billeteraEur');
    }
}
