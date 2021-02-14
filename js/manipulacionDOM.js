function aperturaPanelUser(ingresar, salir){
    let apertura, cierre;
    apertura = document.getElementById(ingresar);
    cierre = document.getElementById(salir);

    apertura.addEventListener('click', abrirPanel)
    cierre.addEventListener('click', cerrarPanel)
}

function abrirPanel(){
    let panelUser;
    panelUser = document.getElementById('panelUser');
    panelUser.setAttribute('class', 'panelUser__animationApertura');
    setTimeout(() => {
        panelUser.setAttribute('class', 'panelUser__abierto');
    }, 500);
}

function cerrarPanel (){
    let panelUser;
    panelUser = document.getElementById('panelUser');
    panelUser.setAttribute('class', 'panelUser__animationCierre');
    setTimeout(() => {
        panelUser.setAttribute('class', 'panelUser__cerrado')
    }, 500);
}

//------------------------------------------------------//


//DEPOSITO DE DINERO
function depositar(boton) {
    let botonPresionado, divisaIngresada, inputNumber;

    botonPresionado = document.getElementById(boton);
    let numeroReal = validacionNumeroReal();
    console.log(numeroReal)
    botonPresionado.addEventListener('click', () =>{
        divisaIngresada = document.getElementById('tipoCambio').value;
        inputNumber = document.getElementById('deposito-retiro').value;
            depositarBilletera(inputNumber, billetera, divisaIngresada);
    });

}

function eventoInput (){
    let input;
    input = document.getElementById('deposito-retiro')
    input.addEventListener('keypress', capturarEnter)
}

function capturarEnter  (event){
    if (event.which == 13) {
        event.preventDefault();

        divisaIngresada = document.getElementById('tipoCambio').value;
        inputNumber = document.getElementById('deposito-retiro').value;
        depositarBilletera(inputNumber, billetera, divisaIngresada);
    }
}


function depositarBilletera(input, billetera, moneda){
    let cantidad = parseInt(billetera.billeteraTotal);
    if(cantidad == 0){
        crearBilletera(input, moneda);
        habilitarBoton();
        bloquearSeleccionMoneda();
    } else{
        sumarBilletera(input, billetera, moneda);
    }
    document.getElementById('deposito-retiro').value = "";
    retirar('botonRetiro');
    mostrarBilletera();
}

function habilitarBoton(){
    let boton = document.getElementsByClassName('dr__boton');
    boton[1].setAttribute('id', 'botonRetiro');
}

function bloquearSeleccionMoneda(){
    let opciones;
    let monedaUsada = billetera.divisa;
    opciones = document.getElementsByClassName('opcionMoneda');
    for (let i=0; i < opciones.length; i++){
        opciones[i].setAttribute('disabled', '');
        if(opciones[i].value == monedaUsada){
            opciones[i].removeAttribute('disabled')
        }
    }
}

function habilitarSeleccionMoneda (){
    let opciones;
    let cantidadVerificar = billetera.billeteraTotal;

    opciones = document.getElementsByClassName('opcionMoneda');
    if(cantidadVerificar === 0){
        for (let i=0; i < opciones.length; i++){
                opciones[i].removeAttribute('disabled')
        }
    }
}

// ---------------------------------------------------------- //

// RETIRO DE DINERO
function retirar(boton){
    let botonPresionado, inputNumber;

    botonPresionado = document.getElementById(boton);
    botonPresionado.addEventListener('click', () =>{
        inputNumber = document.getElementById('deposito-retiro').value;
        restarBilletera(inputNumber);
        mostrarBilletera();
        document.getElementById('deposito-retiro').value = "";
    })
}

// ------------------------------------------------------- //

// MOSTRAR EN HEADER
function mostrarBilletera (){
    let objetoDivisa = objetoCompleto(billetera, carteraDivisas);
    modificarHeader(objetoDivisa);
    botonOjo = presionaOjo();
}

function modificarHeader({simbolo}){
    let mostrador;
    let billeteraActual = billetera.billeteraTotal;
    mostrador = document.getElementById('cantidadBilletera');
    mostrador.innerHTML = `${simbolo} ${billeteraActual},00`;
}
 
function presionaOjo(){
    let ojo;
    ojo = document.getElementById('cantidadVisible'); 
    ojo.addEventListener('click', mostrarOcultar);

    return document.getElementById('cantidadBilletera').innerHTML;
}


function mostrarOcultar(){
    let mostrador, ojo, mensajeOculto, mostradorRetorno;
    mensajeOculto = '**********'
    mostrador = document.getElementById('cantidadBilletera').innerHTML;
    ojo = document.getElementById('cantidadVisible')

    if(mostrador != mensajeOculto){
        ojo.setAttribute('class', 'fas fa-eye');
        mostrador = document.getElementById('cantidadBilletera').innerHTML = '**********';
        presionaOjo();
    } else{
        ojo.setAttribute('class', 'fas fa-eye-slash');
        mostrador = document.getElementById('cantidadBilletera').innerHTML = botonOjo;
        presionaOjo();
    }
}


// ------------------------------------------------- //

function crearDiv (tipoIdPadre, idPadre, i, attr, nombreAttr){
    let nuevoNodo, nodoPadre;
    if(tipoIdPadre == 'id'){
        nodoPadre = document.getElementById(idPadre);
        nuevoNodo = document.createElement('div');
        nuevoNodo.setAttribute(attr, nombreAttr);
        nodoPadre.appendChild(nuevoNodo);
    } 
    if (tipoIdPadre == 'class'){
        nodoPadre = document.getElementsByClassName(idPadre);
        nuevoNodo = document.createElement('div');
        nuevoNodo.setAttribute(attr, nombreAttr);
        nodoPadre[i].appendChild(nuevoNodo);
    }
}

function crearElemento (padre, tag, attr, nombreAttr, contenido, i){
    let nuevoNodo, nodoPadre;

    nodoPadre = document.getElementsByClassName(padre);
    nuevoNodo = document.createElement(tag);
    contenidoTexto = document.createTextNode(contenido);
    nuevoNodo.appendChild(contenidoTexto);
    nuevoNodo.setAttribute(attr, nombreAttr);
    nodoPadre[i].appendChild(nuevoNodo);
}




function capturarEvento (event){
    console.log(event.which);
}

// ------------------------------------------------------------- //

function opcionCripto (){
    let i, idPadre;
    // idPadre = document.getElementById('listadoCriptos');


    for(i=0; i < carteraCriptos.length; i++){
        let carteraPosicion = carteraCriptos[i];
        let nuevoNodo, nodoPadre;

        let redondearValor = parseFloat((carteraPosicion.valor_ars).toFixed(2))
        crearDiv('id', 'listadoCriptos', i, 'class', 'cripto');
        crearElemento('cripto', 'h3', 'class', 'nombreCripto', carteraPosicion.nombre, i);
        crearElemento('cripto', 'h4', 'class', 'cambioCripto', `${carteraPosicion.ticker}/${billetera.divisa}`, i);
        crearElemento('cripto', 'p', 'class', 'valorCripto', `$ ${redondearValor}`, i)
        crearDiv('class', 'cripto', i, 'class', 'imagenCripto');


        nodoPadre = document.getElementsByClassName('imagenCripto');
        nuevoNodo = document.createElement('img');
        nuevoNodo.setAttribute('src', carteraPosicion.logo);
        nodoPadre[i].appendChild(nuevoNodo);
    }
}


        // crearElemento('imagenCripto', 'img', 'src', carteraPosicion.logo, i)