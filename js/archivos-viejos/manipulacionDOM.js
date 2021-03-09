function aperturaPanelUser(ingresar, salir){
    let apertura, cierre;
    apertura = $(ingresar);
    cierre = $(salir);

    $(apertura).click(abrirPanel);
    $(cierre).click(cerrarPanel);
}

function abrirPanel(){
    let panelUser;
    panelUser = $('#panelUser');
    $(panelUser).attr('class', 'panelUser__animationApertura');

    setTimeout(() => {
        $(panelUser).attr('class', 'panelUser__abierto');
    }, 500);
}

function cerrarPanel (){
    let panelUser;
    panelUser = $('#panelUser');
    $(panelUser).attr('class', 'panelUser__animationCierre');

    setTimeout(() => {
        $(panelUser).attr('class', 'panelUser__cerrado');
    }, 500);
}

//------------------------------------------------------//


//DEPOSITO DE DINERO
function depositar() {
    let divisaIngresada, inputNumber;

    $('#botonDeposito').click(()=>{
        monedaSeleccionada = $('.opcionMoneda:selected');

        divisaIngresada = $(monedaSeleccionada).val();
        inputNumber = $('#deposito-retiro').val();
        billetera = billeteraInicial();
        depositarBilletera(inputNumber, divisaIngresada, billetera);
    })
}

function eventoInput (id){
    let input;
    input = $(id);
    $(input).keypress(depositarConEnter);
}

function depositarConEnter  (event){
    if (event.which == 13) {
        event.preventDefault();
        divisaIngresada = $('#tipoCambio').val();
        inputNumber = $('#deposito-retiro').val()
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
        validarOperacion('Ingrese un valor Real', '#dr');
    }

    $('#deposito-retiro').val('');
    retirar('#botonRetiro');
    let billeteraParaOcultar = mostrarBilletera();
    presionaOjo(billeteraParaOcultar);

}

function habilitarBoton(){
        let boton;
        boton = $('.dr__boton');
        $(boton[1]).attr('id', 'botonRetiro')
}

function deshabilitarBoton(){
    if(billetera.billeteraTotal == 0){
        boton = $('.dr__boton');
        $(boton[1]).attr('id', 'botonDeshabilitado')
    }
}

function bloquearSeleccionMoneda(){
    billetera = billeteraInicial();
    let opciones;
    let monedaUsada = billetera.divisa;

    opciones = $('.opcionMoneda');
    for (let i=0; i < opciones.length; i++){
        $(opciones[i]).attr('disabled', '');
        valorOpcion = $(opciones[i]).val();
        if(valorOpcion == monedaUsada){
            $(opciones[i]).removeAttr('disabled');
        }
    }
}

function habilitarSeleccionMoneda (){
    let opciones;
    let cantidadVerificar = billetera.billeteraTotal;

    opciones = $('.opcionMoneda');
    if(cantidadVerificar === 0){
        for (let i=0; i < opciones.length; i++){
            opciones[i].removeAttr('disabled')
        }
        deshabilitarBoton();
    }
}

// ---------------------------------------------------------- //

// RETIRO DE DINERO
function retirar(boton){
    let botonPresionado, inputNumber;

    botonPresionado = document.getElementById(boton);
    botonPresionado = $(boton);
    $(botonPresionado).click(()=>{
        inputNumber = $('#deposito-retiro').val();
        restarBilletera(inputNumber);
        let billeteraParaOcultar = mostrarBilletera();
        presionaOjo(billeteraParaOcultar);
        $('#deposito-retiro').val('');
    })
}

// ------------------------------------------------------- //

// MOSTRAR EN HEADER
function mostrarBilletera (){
    let objetoDivisa = objetoCompleto(billetera, carteraDivisas);
    let cantidadBilleteraMostrada = modificarHeader(objetoDivisa);
    presionaOjo(cantidadBilleteraMostrada);
    return cantidadBilleteraMostrada;
}


function modificarHeader({simbolo}){
    let billeteraActual = obtenerStorage('billetera');
    billeteraActual = billetera.billeteraTotal;
    textoParaMostrar = `${simbolo} ${billeteraActual},00`;
    mostrador = $('#cantidadBilletera').text(textoParaMostrar);
    return textoParaMostrar;
}
 
function presionaOjo(mostrador){
    $('#cantidadVisible').click(()=>{
        mostrarOcultar(mostrador);
    });
}


function mostrarOcultar(dineroMostrado){
    console.log(dineroMostrado);
    let mostrador, ojo, mensajeOculto, billetera;
    billetera = obtenerStorage('billetera');
    mensajeOculto = '**********'
    mostrador = $('#cantidadBilletera').text();
    ojo = $('#cantidadVisible');

    if(mostrador != mensajeOculto){
        $(ojo).attr('class', 'fas fa-eye');
        $('#cantidadBilletera').text(mensajeOculto);
    } else{
        $(ojo).attr('class', 'fas fa-eye-slash');
        mostrador = $('#cantidadBilletera').text(dineroMostrado);
    }
}


// ------------------------------------------------- //

// FUNCIONES GENERICAS
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


function modificarFoto(nodoImagen, direccion){
    let nodo;
    nodo = $(nodoImagen).attr('src', direccion);
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
        
        let valorCripto = elegirValor(carteraPosicion);
        valorCripto = parseFloat(valorCripto.toFixed(2));
        let valorCompra = compraComision(valorCripto);

        crearDivIdPadre('#listadoCriptos','class', 'cripto');

        crearElemento('.cripto', 'h3', 'class', 'nombreCripto', carteraPosicion.nombre, i);
        crearElemento('.cripto', 'h4', 'class', 'cambioCripto', `${carteraPosicion.ticker}/${billetera.divisa}`, i);
        crearElemento('.cripto', 'p', 'class', 'valorCripto', `${moneda.simbolo} ${valorCompra}`, i)
        crearDivClassPadre('.cripto','class', 'imagenCripto', i);


        nodoPadre = document.getElementsByClassName('imagenCripto');
        nuevoNodo = document.createElement('img');
        nuevoNodo.setAttribute('src', carteraPosicion.logo);
        nodoPadre[i].appendChild(nuevoNodo);
    }
}

function opcionCriptoReducido (){   //arma la lista de mainAside
    let i;

    for(i=0; i < carteraCriptos.length; i++){
        let carteraPosicion = carteraCriptos[i];
        let nodoCambio, nodoValor;
        billetera = billeteraInicial();
        moneda = obtenerStorage('moneda');
        
        let valorCripto = elegirValor(carteraPosicion);
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


//-------------------------------------------------- //
//-------------COMIENZO DE CONVERSION--------------- //
//-------------------------------------------------- //
function seleccionCripto(div, posicion){
    let monedaElegida;
    let input;

    div.addEventListener('click', ()=>{
        for(let i=0; i< carteraCriptos.length; i++){
            monedaElegida = carteraCriptos[i];
            if(posicion == i){
                mostrarPanel(monedaElegida)
                modificarFoto('#logo', monedaElegida.logo);
                criptoToStorage(monedaElegida);

                // realizarConversion();
                $('#ingresoDivisa').keypress(conversionDinamica);
                $('#ingresoDivisa').val('');
                conversionCambioCripto();
            }
        }
    });
}

function mostrarPanel(posicion){
    let valorCripto = elegirValor(posicion);
    let valorCompra = compraComision(valorCripto);
    let marketCap = actualizarMarketCap (posicion)

    valorCompra = parseFloat(valorCompra.toFixed(posicion.decimales));
    valorCripto = parseFloat(valorCripto.toFixed(posicion.decimales));

    modificarElemento('#nombre',posicion.nombre);
    modificarElemento('#ticker',posicion.ticker);
    modificarElemento('#conversorSimbolo', moneda.simbolo);
    modificarElemento('#tickerConvertido',posicion.ticker);
    modificarElemento('#valorCompra',valorCompra);
    modificarElemento('#valorVenta',valorCripto);
    modificarElemento('#conversion',`${posicion.ticker}/${billetera.divisa}`);
    modificarElemento('#valorCompra',`${moneda.simbolo}${valorCompra}`);
    modificarElemento('#valorVenta',`${moneda.simbolo}${valorCripto}`);
    modificarElemento('#market_cap',`${moneda.simbolo} ${marketCap}`);
    modificarElemento('#circSupply',`${posicion.circ_supply} ${posicion.ticker}`);
    modificarElemento('#maxSupply',`${posicion.max_supply} ${posicion.ticker}`);

}

// --------------------------------------------------- //

// function realizarConversion (){
//     $('#ingresoDivisa').keypress(conversionDinamica);
// }

function conversionDinamica(event){

    input = $('#ingresoDivisa').val();
    let teclaPresionada = event.key;
    valorATomar = input + teclaPresionada;

    conversion = conversionMonedacripto(valorATomar);
    modificarElemento('#valorConvertido', conversion);
}

function conversionCambioCripto(){
    input = $('#ingresoDivisa').val();
    conversionMonedacripto(input);
}

function validacionCompra(){
    let valorInput, conversion, billeteraParaOcultar;
    billetera = billeteraInicial();

    valorInput = $('#ingresoDivisa').val();
    conversion = $('#valorConvertido').text();

    cripto = obtenerSessionStorage('cripto');
    moneda = obtenerStorage('moneda');

    let compra = parseFloat(conversion);
    let gasto = parseFloat(valorInput);
    cantidad = billetera.billeteraTotal;

    if(valorInput == "" || valorInput == undefined){
        validarOperacion('Ingrese un valor real', '.resto');

    } else if(cantidad >= valorInput){
        billeteraActual = cantidad - valorInput;
        billetera = new BilleteraParcial(billetera.divisa, billeteraActual);
        billeteraToStorage()
        validarOperacion('movimiento exitoso.', '.resto');
        billeteraParaOcultar = mostrarBilletera();
        presionaOjo(billeteraParaOcultar);

        compra = new Compra(cripto.ticker, compra, moneda.nombre, moneda.simbolo, gasto);
        compraToStorage(compra);
        crearBilleteraCompleta();
        sumarCompra();

        $('#ingresoDivisa').val('0,00')
        $('#valorConvertido').text('0,00')

    } else{
        validarOperacion('No dispone de fondos suficientes. Deposite dinero, por favor.', '.resto');
    }
}


function mostrarCompra (){
    billeteraCompleta = obtenerStorage('billeteraCompleta');
    moneda = obtenerStorage('moneda');

    billeteraArray = billeteraCompleta.arrayCompras;

    for(let i=0; i<billeteraArray.length; i++){
        let objetoPosicion = billeteraArray[i];
        armadoDeCompras(i, objetoPosicion);
    }
}


function sumarCompra (){
    let billeteraCompleta = obtenerStorage('billeteraCompleta');
    let posicionActual = billeteraCompleta.arrayCompras.length;
    let billeteraArray = billeteraCompleta.arrayCompras;
        
    for(let i=posicionActual-1; i<posicionActual; i++){
        let objetoPosicion = billeteraArray[i];
        armadoDeCompras(i, objetoPosicion)
    }

}

function armadoDeCompras (i, objetoPosicion){
    crearDivIdPadre ('#compras', 'class', 'adquisicion');
    crearElemento('.adquisicion', 'h3','class','', 'Cripto adquirida: ', i);
    crearElemento('.adquisicion', 'p', 'class', 'nombreAdquisicion', objetoPosicion.tipo, i);
    crearElemento('.adquisicion', 'h4', 'class', '', 'cantidad: ', i);
    crearElemento('.adquisicion', 'p', 'class', 'cantidadAdquisicion', objetoPosicion.cantidad, i);
    crearElemento('.adquisicion', 'h5', 'class', '', 'Dinero utilizado: ', i);
    crearElemento('.adquisicion', 'p', 'class', 'dineroRestante', `${objetoPosicion.monedaValor}: ${objetoPosicion.monedaSimbolo} ${objetoPosicion.valor}`, i);
}