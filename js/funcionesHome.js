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

function avanzarBody(ubicacion) {
    $('html, body').animate({
        scrollTop: $(ubicacion).offset().top
    }, 1000);
}

function scrollify() {
    $(() => {
        $.scrollify({
            section: '.sectionScroll',
            sectionName: '#footer'
        });
    });
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
        $(location).attr('href', 'conversor.html');
    })
}