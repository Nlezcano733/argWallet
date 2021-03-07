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

function objetoMonedaToStorage(moneda){
    let monedaElegida = JSON.stringify(moneda);
    localStorage.setItem('moneda', monedaElegida);
}

function compraToStorage(compra){
    let criptoComprada = JSON.stringify(compra);
    sessionStorage.setItem('compra', criptoComprada);
}
// -------------------------------------------------------//