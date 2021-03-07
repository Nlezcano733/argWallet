function cambioPagina(boton, enlace){
    $(boton).click(()=>{
        window.location.href = enlace;
    })
    //Preparar para DOM-conversor.js
}

function avanzarNavbar() {
    $('#user__btnBilletera').click(() => {
        $('html, body').animate({scrollTop: 0}, 1000);
    });

    $('#user__btnMercado').click(() => {
        avanzarBody('#activos')
    });
}


// FUNCION REPETIDA (index )
function avanzarBody(ubicacion) { 
    $('html, body').animate({
        scrollTop: $(ubicacion).offset().top
    }, 1000);
}

// -------------------------------------- //


// FUNCION REPETIDA - modificada - (index )
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

function scrollFinal (){
    let tabla = $('#activos__lista');

    $(document).scroll(()=>{
        let seccionActual = window.location.hash;

        if(seccionActual == '#2'){
            $(tabla).hover(()=>{
                deshabilitarScrollify();
                scrollTabla()
                deshabilitarScroll();
            }, ()=>{
                habilitarScroll()
                habilitarScrollify();
            })
        }
    })
}
function scrollTabla (){
    $.scrollify.instantMove('#activos__lista')
}
function deshabilitarScroll(){
    let top = $('#activos');
    top = top[0].offsetHeight;
    
    window.onscroll = () =>{
        window.scrollTo(0, top)
    }
}
function habilitarScroll (){
    window.onscroll = null;
}



// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //


function cambioMuestraDivisa(){
    let selector = $('#activos__cabecera--divisas');
    
    $(selector).change(()=>{
        let monedaElegida = $('#activos__cabecera--divisas option:selected').text();
        monedaElegida = monedaElegida.toLowerCase();
        getAjaxModMercado(monedaElegida)
    })
}

function armadoDeTabla(resultado, moneda){
    i=0
    resultado.forEach((cripto)=>{
        let criptoNombre = nombreDeCripto(cripto, cripto);
        let criptoImagen = cripto.image;
        let criptoPar = parDeConversion(cripto, moneda);

        let criptoPrecio = cripto.current_price;
        let cambio = cripto.price_change_percentage_24h;
        let criptoCambio = porcentajeDeCambio(cambio)

        let criptoMax = cripto.high_24h;
        let criptoMin = cripto.low_24h;
        let criptoVol = volumenOperado(cripto);

        crearTr('tbody', 'activo__cuerpo');
        armarTr(criptoImagen, criptoPar, criptoPrecio, criptoCambio, criptoMax, criptoMin, criptoVol, i);
        i++;
    })
}

function modificarTabla(resultado, moneda){
    let i=0;
    resultado.forEach((cripto)=>{
        let criptoPar = parDeConversion(cripto, moneda);

        let criptoPrecio = cripto.current_price;
        let cambio = cripto.price_change_percentage_24h;
        let criptoCambio = porcentajeDeCambio(cambio)

        let criptoMax = cripto.high_24h;
        let criptoMin = cripto.low_24h;
        let criptoVol = volumenOperado(cripto);
        
        modificarElementosDeTabla(criptoPar, criptoPrecio, criptoCambio, criptoMax, criptoMin, criptoVol, i);
        i++;
    })
}

function modificarElementosDeTabla(par, precio, cambio, max, min, vol, i){
    let classPar = $('.parCriptoLista')
    let classPrecio = $('.activo__cuerpo--precio')
    let classCambio = $('.activo__cuerpo--cambio')
    let classMax = $('.activo__cuerpo--max')
    let classMin = $('.activo__cuerpo--min')
    let classVol = $('.activo__cuerpo--vol')


    modificarElemento(classPar[i], par)
    modificarElemento(classPrecio[i], precio)
    modificarElemento(classCambio[i], cambio)
    modificarElemento(classMax[i], max)
    modificarElemento(classMin[i], min)
    modificarElemento(classVol[i], vol)
}


// --------------------------------------------- //
// FUNCIONES REPETIDAS (index)

function nombreDeCripto ({id}, {symbol}){
        nombre = primeraLetraMayuscula(id);
        let ticker = symbol.toUpperCase();
        return `${nombre} (${ticker})`
}

function primeraLetraMayuscula (string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function parDeConversion ({symbol}, moneda){
    let par = `${symbol}/${moneda}`
    return par.toUpperCase();
}

function porcentajeDeCambio (cambio){
    criptoCambio = parseFloat(cambio).toFixed(2)
    return `${criptoCambio} %`
}

function volumenOperado ({total_volume}){
    let criptoVol = total_volume;
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

function crearTr(nodoPadre, nombreClase){
    let nuevoNodo;
    padre = $(nodoPadre);

    nuevoNodo = document.createElement('tr');
    $(nuevoNodo).attr('class', nombreClase);
    $(nodoPadre).append(nuevoNodo);
}

// --------------------------------------------- //


function armarTr (logo, par, precio, cambio, max, min, vol, i){

    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo__par', '', i);
    crearDivClassPadre('.activo__cuerpo__par', 'class', 'activo__cuerpo--nombre', i)

    crearImagen('.activo__cuerpo--nombre', logo, 'class', 'imagenCripto', i)
    crearElemento('.activo__cuerpo--nombre', 'td', 'class', 'parCriptoLista', par, i);

    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--precio', precio, i);
    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--cambio', cambio, i);
    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--max', max, i);
    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--min', min, i);
    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--vol', vol, i);

    crearElemento('.activo__cuerpo', 'td', 'class', 'activo__cuerpo--input', '', i)
    crearBtn('.activo__cuerpo--input', 'class', 'activo__cuerpo--btn', i)
}


// --------------------------------------------- //
// FUNCIONES REPETIDAS (index)

function crearBtn (padre, attr, nombreAttr, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = $(padre);
    nuevoNodo = document.createElement('a');
    contenidoTexto = document.createTextNode('Operar');
    $(nuevoNodo).append(contenidoTexto);

    $(nuevoNodo).attr('href', 'compraVenta.html');
    $(nuevoNodo).attr('role', 'button');
    $(nuevoNodo).attr(attr, nombreAttr);

    $(nodoPadre[i]).append(nuevoNodo)
}



// ---------------------------------------------- //
// -------------DEPOSITO DE DINERO--------------- //
// ---------------------------------------------- //

function accionarDeposito() {
    $('#depositoRetiro__interaccion--depositar').click(()=>{
        depositar();
        mostrarBilletera();
    })
}

function AccionarRetiro(){
    $('#depositoRetiro__interaccion--retirar').click(()=>{
        retirar();
        mostrarBilletera();
    })
}

function eventoInput (id){
    let input;
    input = $(id);
    $(input).keypress(depositarConEnter);
}


function habilitarBoton(boton, habilitacion){
    $(boton[1]).attr('id', habilitacion)
}

function deshabilitarBoton(boton){
    if(billetera.billeteraTotal == 0){
        boton = $('.dr__boton');
        $(boton[1]).attr('id', 'botonDeshabilitado')
    }
}

// ----------------------------------------------- //

// MOSTRAR EN HEADER
function mostrarBilletera (){
    let selector = $('.billeteraUser__balance--divisas').val();
    let balanceTotal

    balanceTotal = sumatoriaBilleteraTotal();

    let objetoDivisaElegida = objetoCompletoSelecto(selector, carteraDivisas);
    cantidadBilleteraMostrada = modificarCantidad(objetoDivisaElegida, balanceTotal, '.billeteraUser__balance--cantidad');

}

function mostrarbilleteraSeleccionada (){
    let selector = $('#depositoRetiro__registro--divisas').val();
    selectorValor = selector.toLowerCase();
    let balanceTotal

    if(selectorValor == 'ars'){
        balanceTotal = billeteraPesos.billeteraTotal;
    } else if (selectorValor == 'usd'){
        balanceTotal = billeteraDolares.billeteraTotal;
    } else{
        balanceTotal = billeteraEuros.billeteraTotal;
    }

    objetoDivisaElegida = objetoCompletoSelecto(selector, carteraDivisas);
    cantidadBilleteraMostrada = modificarCantidad(objetoDivisaElegida, balanceTotal, '.depositoRetiro__registro--dinero');
    getAjaxConvReferencia(selector, balanceTotal)

}

function modificarCantidad({simbolo}, cantidadTotal, ubicacion){
    textoParaMostrar = `${simbolo} ${cantidadTotal}`;
    mostrador = $(ubicacion).text(textoParaMostrar);
    return textoParaMostrar;
}

function modificarMonedaSelecta({simbolo}){
    let billeteraActual = obtenerStorage('billetera');
    billeteraActual = billetera.billeteraTotal;
    
    textoParaMostrar = `${simbolo} ${billeteraActual},00`;
}

function convertirMonedaCriptoRef(cantidad, cripto){
    let criptoValor = cripto[0].current_price;
    criptoValor = parseFloat((cantidad / criptoValor)).toFixed(4);
    return criptoValor
}

function mostrarOcultar (){
    let mensajeOculto = '**************';
    let ojo = $('#ojoUser');
    console.log('se llamo')

    let selectorBalance = $('.billeteraUser__balance--divisas');
    let selectorRegistro = $('#depositoRetiro__registro--divisas');

    let mostrador = $('.billeteraUser__balance--cantidad').text()
    let cantidadBalance = sumatoriaBilleteraTotal();

    if(mostrador != mensajeOculto){
        console.log('if')
        $(ojo).attr('class', 'fas fa-eye');
        $(selectorBalance).attr('disabled', '')
        $(selectorRegistro).attr('disabled', '')
        $('.billeteraUser__balance--cantidad').text(mensajeOculto);
        $('.depositoRetiro__registro--dinero').text(mensajeOculto);
        $('.depositoRetiro__registro--btc').text(mensajeOculto);
    } else{
        console.log('else')
        $(ojo).attr('class', 'fas fa-eye-slash');
        $(selectorBalance).removeAttr('disabled', '')
        $(selectorRegistro).removeAttr('disabled', '')
        $('.billeteraUser__balance--cantidad').text(cantidadBalance);
        mostrarbilleteraSeleccionada();
    }  
}

// ------------------------------------------------- //