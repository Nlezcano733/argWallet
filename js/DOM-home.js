// TO DO - eliminar funciones tomarJson y tomarJsonHome luego de obtener peticion ajax
// TO DO - eliminar archivo objetoJson.js

function tomarJson() {
    let i;
    let listadoJson = JSON.stringify(LISTA_CRIPTOS);
    let objetos = JSON.parse(listadoJson);

    for (i = 0; i < objetos.length; i++) {
        let objetosSeparados = objetos[i];
        objetoCripto = objetosSeparados;
        carteraCriptos.push(objetoCripto)
    }
}

function tomarJsonHome() {
    let i;
    let listadoJson = JSON.stringify(LISTA_CRIPTOS);
    let objetos = JSON.parse(listadoJson);

    for (i = 0; i < 8; i++) {
        let objetosSeparados = objetos[i];
        objetoCripto = objetosSeparados;
        carteraMuestraInicio.push(objetoCripto)
    }
}

// $.ajax({
//         url: "criptoJSON.json",
//         type: "GET",
//         contentType: "application/json; charset=utf-8",
//         dataType: "json"
//     }).done((resultado)=>{
//         console.log(resultado[0])
//     }).fail(()=>{
//         console.log('fallo')
//     })

// ------------------------------------------------------------------ //
// ------------------------------------------------------------------ //
// ------------------------------------------------------------------ //


function crearDivCriptosInicio() {
    let nuevoNodo, nodoPadre;
    nodoPadre = $('#inicio__listado');
    nuevoNodo = document.createElement('div');
    $(nuevoNodo).attr('class', 'inicio__listado--cripto');
    $(nodoPadre).append(nuevoNodo);
}

function crearCriptosInicio(contenido, i) {
    let nuevoNodo, nodoPadre, contenidoTexto;
    nodoPadre = $('.inicio__listado--cripto');

    nuevoNodo = document.createElement('p');
    contenidoTexto = document.createTextNode(contenido);

    $(nuevoNodo).append(contenidoTexto);
    $(nuevoNodo).attr('class', 'inicio__listado--nombre');
    $(nodoPadre[i]).append(nuevoNodo);
}

function crearFotosInicio(ref, nombreCripto, i) {
    let nuevoNodo, nodoPadre;
    nodoPadre = $('.inicio__listado--cripto');
    nuevoNodo = document.createElement('img');
    $(nuevoNodo).attr('src', ref);
    $(nuevoNodo).attr('class', 'inicio__listado--imagen');
    $(nuevoNodo).attr('alt', nombreCripto);

    $(nodoPadre[i]).append(nuevoNodo);
}

function modificarFotoInicio(nodoImagen, direccion) {
    setTimeout(() => {
        $(nodoImagen).attr('src', direccion);
    }, 2000)
}

function armadoDeLista() {
    carteraMuestraInicio.forEach(() => {
        crearDivCriptosInicio();
    })

}

function armadoDeCriptos() {
    for (let i = 0; i < carteraMuestraInicio.length; i++) {
        let posicion = carteraMuestraInicio[i];
        let nombre = posicion.nombre;
        let foto = posicion.logo;
        crearCriptosInicio(nombre, i)
        crearFotosInicio(foto, nombre, i);
    }
}


// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //


function cambiarCriptoMostrada(i) {
    if (i == undefined || i == 8) {
        i = 0;
    }
    $('#inicio__imagenCripto').fadeIn(2000, () => {
        let cripto = carteraMuestraInicio[i];

        modificarFotoInicio('#inicio__imagenCripto', cripto.logo);
        marcarCripto(i)
        i++;
        cambiarCriptoMostrada(i);
        $('#inicio__imagenCripto').fadeOut(2000)
    })
}

function marcarCripto(i) {
    let nodoPadre;
    nodoPadre = $('.inicio__listado--cripto');
    removerEstilosListado(nodoPadre, i)
}

function removerEstilosListado(padre, i) {
    $(padre[i]).addClass('resaltar');
    setTimeout(() => {
        $(padre[i]).removeClass('resaltar');
    }, 4000);
}

// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //


function slider() {
    $('.single-item').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        appendArrows: $('#info'),
        dots: true,
        appendDots: $('#info')
    });
}



// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //

function avanzarNavbar() {
    $('#btnInicio').click(() => {
        avanzarBody('#inicio');
    });

    $('#btnInfo').click(() => {
        avanzarBody('#info')
    });

    $('#btnMercado').click(() => {
        avanzarBody('#mercado')
    });

}

function scrollFinal (){
    let tabla = $('#mercado__lista');

    $(document).scroll(()=>{
        let seccionActual = window.location.hash;

        if(seccionActual == '#3'){
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
    $.scrollify.instantMove('#mercado__lista')
}
function deshabilitarScroll(){
    let top = $('#mercado');
    top = top[0].offsetTop;
    
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

function mostrarPanelIngreso(){
    $('#btnIngreso').click(()=>{
        $('#logIn').fadeIn(300)
    })
    ocultarPanelIngreso();
    mostrarPanelRegistro();
}

function ocultarPanelIngreso(){
    $('.panelIngreso__salir').click(()=>{
        $('.panelIngreso').fadeOut(300);
    })
}

function mostrarPanelRegistro(){
    $('.panelIngreso__extra--enlace').click(()=>{
        $('#logIn').hide();
        $('#registro').show()
    })
    ocultarPanelIngreso()
    volverALogIn();
}

function volverALogIn(){
    $('.panelIngreso__atras').click(()=>{
        $('#registro').hide()
        $('#logIn').show();
    })
}

function ingresoConversor(id){
    $(id).click(()=>{
        $(location).attr('href', 'panelUsuario.html');
    })
}


// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //

function getAjaxMercado(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        armadoDeTabla(resultado, 'ars');
    })
}

function getAjaxModMercado(moneda){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        modificarTabla(resultado, moneda);
    })
}

function cambioMuestraDivisa(){
    let selector = $('#lista__cabecera--divisas');
    
    $(selector).change(()=>{
        let monedaElegida = $('#lista__cabecera--divisas option:selected').text();
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
        let criptoVol = grandesCantidades(cripto.total_volume);

        crearTr('tbody', 'lista__cripto');
        armarTr(criptoImagen, criptoNombre, criptoPar, criptoPrecio, criptoCambio, criptoMax, criptoMin, criptoVol, i);
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
        let criptoVol = grandesCantidades(cripto.total_volume);
        
        modificarElementosDeTabla(criptoPar, criptoPrecio, criptoCambio, criptoMax, criptoMin, criptoVol, i);
        i++;
    })
}

function modificarElementosDeTabla(par, precio, cambio, max, min, vol, i){
    let classPar = $('.lista__cripto--par')
    let classPrecio = $('.lista__cripto--precio')
    let classCambio = $('.lista__cripto--cambio')
    let classMax = $('.lista__cripto--max')
    let classMin = $('.lista__cripto--min')
    let classVol = $('.lista__cripto--vol')


    modificarElemento(classPar[i], par)
    modificarElemento(classPrecio[i], precio)
    modificarElemento(classCambio[i], cambio)
    modificarElemento(classMax[i], max)
    modificarElemento(classMin[i], min)
    modificarElemento(classVol[i], vol)
}

function crearTr(nodoPadre, nombreClase){
    let nuevoNodo;
    padre = $(nodoPadre);

    nuevoNodo = document.createElement('tr');
    $(nuevoNodo).attr('class', nombreClase);
    $(nodoPadre).append(nuevoNodo);
}

function armarTr (logo, nombre, par, precio, cambio, max, min, vol, i){

    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--td', '', i);
    crearDivClassPadre('.lista__cripto--td', 'class', 'lista__cripto--nombre', i);

    crearImagen('.lista__cripto--nombre', logo, 'class', 'imagenCripto', i);
    crearElemento('.lista__cripto--nombre', 'td', 'class', 'nombreCriptoLista', nombre, i);

    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--par', par, i);
    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--precio', precio, i);
    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--cambio', cambio, i);
    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--max', max, i);
    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--min', min, i);
    crearElemento('.lista__cripto', 'td', 'class', 'lista__cripto--vol', vol, i);

}
