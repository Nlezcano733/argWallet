// -------------------------------------------- //
//               PETICIONES AJAX                //
// -------------------------------------------- //

function conversionInicialDolar(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ars",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        valorUsd =  resultado.tether.ars;
        usd = new Divisas ('Dolar', 'USD', valorUsd, '$');
        carteraDivisas.push(usd)

        // valorDivisasToStorage(carteraDivisas);
    }).fail(()=>{
        usd = new Divisas ('Dolar', 'USD', 91.5, '$');
        carteraDivisas.push(usd)
    })
}

function conversionInicialEuro(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=eurxb&vs_currencies=ars",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        valorEur = resultado.eurxb.ars
        euro = new Divisas ('Euro', 'EURO', valorEur, '€');
        carteraDivisas.push(euro)

        valorDivisasToStorage(carteraDivisas);
    }).fail(()=>{
        euro = new Divisas ('Euro', 'EURO', 109.5, '€');
        carteraDivisas.push(euro)
    })
}

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

function ingresoNegativo(input, nodoPadre, nodoMensaje){
    if(!input){
        validarOperacion('Ingrese un valor real.', nodoPadre, nodoMensaje)
        return 'negativo'
    }
}

// -------------------------------------------- //
//           APERTURA MENU RESPONSIVE           //
// -------------------------------------------- //

function btnClose (){
    $('#user-logo').fadeOut();
    $('#market-logo').fadeOut();
    $('#burger-logo').removeAttr('class');
    $('#burger-logo').attr('class', 'fas fa-times');
}

function habilitarBotones () {
    $('#burger-logo').removeAttr('class');
    $('#burger-logo').attr('class', 'fas fa-bars');
    $('#user-logo').fadeIn();
    $('#market-logo').fadeIn();
    $('#redes').hide()
}

// -------------------------------------------- //
//                   NAVEGACION                 //
// -------------------------------------------- //


function nombreUser(){
    user = obtenerStorage('usuario');
    modificarElemento('.billeteraUser__info--id', user[1])
}

function avanzarBody(ubicacion) {
    let off;
    window.outerWidth <= 900 && ubicacion == "#inicio" ? off = 60 : off = 0;

    $('html, body').animate({
        scrollTop: $(ubicacion).offset().top - off
    }, 1000);
}

function scrollify() {
    if(window.outerWidth > 900){
        $.scrollify({
            section: '.scrollify',
            setHeights: false
        });
    }
}

function deshabilitarScrollify (){
    $.scrollify.disable();
}
function habilitarScrollify(){
    $.scrollify.enable();
}

function validarCierreSesion () {
    let path = window.location.pathname;
    let subdominio = '/argWallet';
    let estado = localStorage.getItem('estadoSesion');

    if (!estado){
        path.includes(subdominio)
        ? !path.includes('index.html') && window.location.replace(`${subdominio}/public/index.html`)
        : !path.includes('index.html') && window.location.replace('/public/index.html')
    }
}

function cierreSession(){
    localStorage.removeItem('estadoSesion');
    window.location.replace('/public/index.html');
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

function crearSelector(padre, tag, attr, nombreAttr, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(padre);
    nuevoNodo = document.createElement(tag);
    $(nuevoNodo).attr(attr, nombreAttr);
    $(nodoPadre[i]).append(nuevoNodo);
}


function modificarElemento(elemento, contenido){
     $(elemento).text(contenido)
}

function modificarSimbolos(id, modificador){
    let carteraDivisas = obtenerStorage('divisas')
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

function mensajeError(padre){
    let nuevoNodo, nodoPadre;
    let mensaje = 'Ocurrio un error en la conexion, vuelva a intenarlo'
    
    nodoPadre = $(padre);
    nuevoNodo = document.createElement('h3');
    $(nuevoNodo).html(mensaje)

    $(nuevoNodo).attr('class', 'mensajeError');
    $(nodoPadre[0]).append(nuevoNodo);

}

// -------------------------------------------- //
//            FUNCIONES SOBRE ACTIVO            //
// -------------------------------------------- //

function primeraLetraMayuscula (string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function nombreDeCripto ({id}){
        nombre = primeraLetraMayuscula(id);
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
    let millon = 1000000;
    let billon = millon * 1000;

    if(cantidad >= billon){
        cantidad = parseFloat(cantidad / billon).toFixed(2);
        return `${cantidad} B`
    }
    if(cantidad >= millon){
        cantidad = parseFloat(cantidad / millon).toFixed(2);
        return `${cantidad} M`
    }
    return cantidad
}

function medianasCantidades (cantidad){
    let mil = 1000;

    if(cantidad >= 1000){
        cantidad = parseFloat((cantidad / mil).toFixed(2));
        return  `${cantidad} K`;
    }
    cantidad = grandesCantidades(cantidad);
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
    for(let i=0; i<array.length;i++){
        simbolo = array[i].simbolo;
        billeteraTotal = array[i].billeteraTotal;
        cantidad = grandesCantidades(billeteraTotal)
        texto = `${simbolo}${cantidad}`
        arrayTexto.push(texto)
    }
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

function valorDivisasToStorage(cartera){
    let array = [];
    for(divisa of cartera){
        !array.includes(divisa) && array.push(divisa)
    }
    
    let divisas = JSON.stringify(array);
    localStorage.setItem('divisas', divisas)
}

function actualizacionValoresDivisas(){
    let arrayCarteraDivisas = obtenerStorage('divisas');
    localStorage.removeItem('divisas');

    arrayCarteraDivisas && (arrayCarteraDivisas.splice(4));
    valorDivisasToStorage(arrayCarteraDivisas)

    let ars, usd, eur;

    arrayCarteraDivisas.forEach((divisa)=>{
        let nombre = divisa.nombre
        let ticker = divisa.ticker
        let value = divisa.value
        let simbolo = divisa.simbolo

        if(ticker == 'ARS'){
            ars = new Divisas (nombre, ticker, value, simbolo)
            carteraDivisas.push(ars)
        } else if( ticker == 'USD'){
            usd = new Divisas(nombre, ticker, value, simbolo)
            carteraDivisas.push(usd)
        } else{
            eur = new Divisas (nombre, ticker, value, simbolo)
            carteraDivisas.push(eur)
        }
    })
}

function usuarioToStorage(usuario){
    let user = JSON.stringify(usuario)
    localStorage.setItem('usuario', user)
    localStorage.setItem('estadoSesion', 1)
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

    if(pesos || dolares || euros){
        return [pesos, dolares, euros]
    } else{
        return [billeteraPesos, billeteraDolares, billeteraEuros];
    }
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
    if(!billeteraArs){
        billeteraArs = new BilleteraArs(0);
    }
    return billeteraArs
}
function billeteraUsdInicial(){ 
    billeteraUsd = obtenerStorage('billeteraUsd')
    if(!billeteraUsd){
        billeteraUsd = new BilleteraUsd(0);
    }
    return billeteraUsd
}
function billeteraEurInicial(){
    billeteraEur = obtenerStorage('billeteraEur')
    if(!billeteraEur){
        billeteraEur = new BilleteraEur(0);
    }
    return billeteraEur
}

function arrayComprasInicial(){
    array = obtenerStorage('listaCompras')
    if(!array){
        array = []
    }
    return array
}

function objetoCompleto (divisa, array){
    let arrayDivisas;
    for(let i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(divisa == arrayDivisas.ticker){ 
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun objeto Billetera
}

function objetoCompletoSelecto(selector, array){
    arrayDivisas;
    for(let i=0; i< array.length; i++){
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
