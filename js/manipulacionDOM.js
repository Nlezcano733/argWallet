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
    validacionNumeroReal();

    botonPresionado.addEventListener('click', () =>{
        divisaIngresada = document.getElementById('tipoCambio').value;
        inputNumber = document.getElementById('deposito-retiro').value;
        billetera = billeteraInicial();

        depositarBilletera(inputNumber, divisaIngresada, billetera);
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
        depositarBilletera(inputNumber, divisaIngresada, billetera);
    }
}

function depositarBilletera(input, moneda, billetera){
    let cantidad = parseInt(billetera.billeteraTotal);
    
    if(cantidad == 0 && input != ""){
        crearBilletera(input, moneda);
        habilitarBoton();
        bloquearSeleccionMoneda();
        opcionCriptoReducido();
    } else if(cantidad > 0 && input != ""){
        sumarBilletera(input, billetera, moneda);
    } else{
        validarOperacionDR('Ingrese un valor Real')
    }

    document.getElementById('deposito-retiro').value = "";
    retirar('botonRetiro');
    mostrarBilletera();
}

function habilitarBoton(){
        let boton = document.getElementsByClassName('dr__boton');
        boton[1].setAttribute('id', 'botonRetiro');
}

function deshabilitarBoton(){
    if(billetera.billeteraTotal == 0){
        let boton = document.getElementsByClassName('dr__boton');
        boton[1].setAttribute('id', 'botonDeshabilitado');
    }
}

function bloquearSeleccionMoneda(){
    billetera = billeteraInicial();
    let opciones;
    let monedaUsada = billetera.divisa;

    opciones = document.getElementsByClassName('opcionMoneda');
    for (let i=0; i < opciones.length; i++){
        opciones[i].setAttribute('disabled', '');
        if(opciones[i].value == monedaUsada){
            opciones[i].removeAttribute('disabled');
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
        deshabilitarBoton();
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

// FUNCIONES GENERICAS
function crearDivIdPadre (idPadre, attr, nombreAttr){
    let nuevoNodo, nodoPadre;
    nodoPadre = document.getElementById(idPadre);
    nuevoNodo = document.createElement('div');
    nuevoNodo.setAttribute(attr, nombreAttr);
    nodoPadre.appendChild(nuevoNodo);
}

function crearDivClassPadre (idPadre, attr, nombreAttr, i){
    let nuevoNodo, nodoPadre;
    nodoPadre = document.getElementsByClassName(idPadre);
    nuevoNodo = document.createElement('div');
    nuevoNodo.setAttribute(attr, nombreAttr);
    nodoPadre[i].appendChild(nuevoNodo);
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

function modificarElemento(elemento, contenido){
    let nodo;
    nodo = document.getElementById(elemento),
    nodo.innerHTML = contenido
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


function modificarFoto(nodoImagen, direccion){
    let nodo;
    nodo = document.getElementById(nodoImagen);
    nodo.setAttribute('src', direccion);
}

function capturarEvento (event){
    console.log(event.which);
}

// ------------------------------------------------------------- //

//SELECCION DE CRIPTOMONEDA
function opcionCripto (){
    let i;

    for(i=0; i < carteraCriptos.length; i++){
        let carteraPosicion = carteraCriptos[i];
        let nuevoNodo, nodoPadre;
        billetera = billeteraInicial();
        moneda = obtenerStorage('moneda');
        
        let valorCripto = elegirValor(moneda.ticker, carteraPosicion);
        valorCripto = parseFloat(valorCripto.toFixed(2));
        let valorCompra = compraComision(valorCripto);

        crearDivIdPadre('listadoCriptos','class', 'cripto');
        crearElemento('cripto', 'h3', 'class', 'nombreCripto', carteraPosicion.nombre, i);
        crearElemento('cripto', 'h4', 'class', 'cambioCripto', `${carteraPosicion.ticker}/${billetera.divisa}`, i);
        crearElemento('cripto', 'p', 'class', 'valorCripto', `${moneda.simbolo} ${valorCompra}`, i)
        crearDivClassPadre('cripto','class', 'imagenCripto', i);


        nodoPadre = document.getElementsByClassName('imagenCripto');
        nuevoNodo = document.createElement('img');
        nuevoNodo.setAttribute('src', carteraPosicion.logo);
        nodoPadre[i].appendChild(nuevoNodo);
    }
}

function opcionCriptoReducido (){
    let i;

    for(i=0; i < carteraCriptos.length; i++){
        let carteraPosicion = carteraCriptos[i];
        let nodoCambio, nodoValor;
        billetera = billeteraInicial();
        moneda = obtenerStorage('moneda');
        
        let valorCripto = elegirValor(moneda.ticker, carteraPosicion);
        valorCripto = parseFloat(valorCripto.toFixed(2));
        let valorCompra = compraComision(valorCripto);
        
        nodoCambio = document.getElementsByClassName('cambioCripto'),
        nodoCambio.innerHTML = `${carteraPosicion.ticker}/${billetera.divisa}`;
        nodoValor = document.getElementsByClassName('valorCripto');
        nodoValor.innerHTML = `${moneda.simbolo}${valorCompra}`
    }

}

function separacionCriptos (){
    let criptoSeleccionada, i, posicion;
    criptoSeleccionada = document.getElementsByClassName('cripto');
    for(i=0; carteraCriptos.length; i++){
        posicion = criptoSeleccionada [i];
        seleccionCripto(posicion, i);
    };
}

function seleccionCripto(div, posicion){
    let monedaElegida;
    div.addEventListener('click', ()=>{
        for(let i=0; i< carteraCriptos.length; i++){
            monedaElegida = carteraCriptos[i];
            if(posicion == i){
                mostrarPanel(monedaElegida)
                modificarFoto('logo', monedaElegida.logo);
                criptoToStorage(monedaElegida)
            }
        }
    });
}

function mostrarPanel(posicion){
    // let valorRedondeado = tratamientoCripto(posicion, 'ARS')
    let valorCripto = elegirValor(objetoMoneda.ticker, posicion);
    let valorCompra = compraComision(valorCripto);
    let marketCap = actualizarMarketCap (posicion)

    valorCompra = parseFloat(valorCompra.toFixed(posicion.decimales));
    valorCripto = parseFloat(valorCripto.toFixed(posicion.decimales));

    modificarElemento('nombre',posicion.nombre);
    modificarElemento('ticker',posicion.ticker);
    modificarElemento('tickerConvertido',posicion.ticker);
    modificarElemento('valorCompra',valorCompra);
    modificarElemento('valorVenta',valorCripto);
    modificarElemento('conversion',`${posicion.ticker}/${billetera.divisa}`);
    modificarElemento('valorCompra',`${moneda.simbolo}${valorCompra}`);
    modificarElemento('valorVenta',`${moneda.simbolo}${valorCripto}`);
    modificarElemento('market_cap',`${moneda.simbolo} ${marketCap}`);
    modificarElemento('circSupply',`${posicion.circ_supply} ${posicion.ticker}`);
    modificarElemento('maxSupply',`${posicion.max_supply} ${posicion.ticker}`);
}



