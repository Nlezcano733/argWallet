function getAjaxInicio(){
    $.ajax({
            url: "js/criptoJSON.json",
            type: "GET",
            contentType: "application/json",
            dataType: "json"
        }).done((resultado)=>{
            for (i = 0; i < resultado.length; i++) {
                let objetosSeparados = resultado[i];
                objetoCripto = objetosSeparados;
                carteraCriptos.push(objetoCripto)
            }
            for (i = 0; i < 8; i++) {
                let objetosSeparados = resultado[i];
                objetoCripto = objetosSeparados;
                carteraMuestraInicio.push(objetoCripto)
            }

            armadoDeLista();
            armadoDeCriptos();
            cambiarCriptoMostrada();
        })
}

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

function modificarFotoInicio(nodoImagen, direccion, nombre) {
    setTimeout(() => {
        $(nodoImagen).attr('src', direccion);
        $(nodoImagen).attr('alt', nombre);
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
    if (i == undefined ||  i == 8) {
        i = 0
    }

    $('#inicio__imagenCripto').fadeIn(2000, () => {
        let cripto = carteraMuestraInicio[i];

        modificarFotoInicio('#inicio__imagenCripto', cripto.logo, cripto.id);
        if(i != 0){
            let primero = $('.inicio__listado--cripto')
            $(primero[0]).removeClass('resaltar')
            $(primero[0]).addClass('inicial')
        }
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
        autoplay: false,
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

// TO DO - eliminar funcion
// function ingresoConversor(id){
//     $(id).click(()=>{
//         $(location).attr('href', 'panelUsuario.html');
//     })
// }


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

    let valorCambio = $('.lista__cripto--cambio')
    valorCambio = valorCambio[i]
    let texto = valorCambio.innerHTML;
    let valorTexto = texto.indexOf('-')
    if(valorTexto == -1){
        $(valorCambio).css('color', '#14b10b')
    }
}

// ---------------------------------------------- //
// ---------------------------------------------- //
// ---------------------------------------------- //

function ingresarUsuario(){
    let id = $('#idUsuario').val();
    let pass = $('#passUsuario').val();
    let usuario = obtenerStorage('usuario')

    if(id == usuario[1] && pass == usuario[2]){
        localStorage.setItem('estadoSesion', 1)
        window.location.href = 'panelUsuario.html';
    } else{
        $('#idUsuario').css('border', '1px solid red')
        $('#passUsuario').css('border', '1px solid red')

        validarOperacion('Usuario o contraseña incorrectos', '.validacion', 'validacion__txt')
        setTimeout(()=>{
            $('#idUsuario').css('border', '1px solid #5678a4')
            $('#passUsuario').css('border', '1px solid #5678a4')
        }, 2500)
    }
}

function crearUsuario(){
        let nombre = $('#nuevoNombre').val();
        let id = $('#nuevoId').val();
        let pass = $('#nuevoPass').val();


        nombre = validarNombre(nombre)
        if(nombre == '' || nombre == false){
            $('#nuevoNombre').css('border', '1px solid red')
            $('#nuevoNombre').val('')

            validarOperacion('Ingrese un nombre valido.','.validacion', 'validacion__txt');
            setTimeout(()=>{
                $('#nuevoNombre').css('border', '1px solid #5678a4')
            }, 2500)
            return
        }

        id = validarId(id)
        if(id == '' || id == false){
            $('#nuevoId').css('border', '1px solid red')
            $('#nuevoId').val('')

            validarOperacion('Ingrese un Id valido.','.validacion', 'validacion__txt');
            setTimeout(()=>{
                $('#nuevoId').css('border', '1px solid #5678a4')
            }, 2500)
            return
        }

        pass = validarPass(pass);
        if(pass == ''){
            $('#nuevoPass').css('border', '1px solid red')
            $('#nuevoPass').val('')

            validarOperacion('Contraseña con 8 caracteres minimo','.validacion', 'validacion__txt');
            setTimeout(()=>{
                $('#nuevoPass').css('border', '1px solid #5678a4')
            }, 2500)
            return
        }

        localStorage.clear();
        let usuario = [nombre, id, pass];
        usuarioToStorage(usuario)
        window.location.href = 'panelUsuario.html'
}