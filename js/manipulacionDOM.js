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
    let botonPresionado, divisaIngresada;

    botonPresionado = document.getElementById(boton);
    botonPresionado.addEventListener('click', () =>{
        divisaIngresada = document.getElementById('tipoCambio').value;
        inputNumber = document.getElementById('deposito-retiro').value;
        depositarBilletera(inputNumber, billetera, divisaIngresada);

    });
}

function depositarBilletera(input, billetera, moneda){
    let cantidad = parseInt(billetera.billeteraTotal);
    if(cantidad == 0){
        crearBilletera(input, moneda);
        habilitarBoton();
    } else{
        sumarBilletera(input, billetera, moneda);
    }
    mostrarBilletera();
    document.getElementById('deposito-retiro').value = "";
    retirar('botonRetiro');
}

function habilitarBoton(){
    let boton = document.getElementsByClassName('dr__boton');
    boton[1].setAttribute('id', 'botonRetiro');
}


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
    prueba = presionaOjo();
    console.log(prueba)
}

function modificarHeader({simbolo}){
    let mostrador;
    let billeteraActual = billetera.billeteraTotal;
    mostrador = document.getElementById('cantidadBilletera');
    mostrador.innerHTML = `${simbolo} ${billeteraActual},00`;
}
 // ------------------------------------------------- //
 
function presionaOjo(){
    let ojo;
    ojo = document.getElementById('cantidadVisible'); 
    ojo.addEventListener('click', mostrarOcultar);

    return document.getElementById('cantidadBilletera').innerHTML;
}


function mostrarOcultar(){
    let mostrador, ojo, mensajeOculto, mostradorRetorno;
    mensajeOculto = '**********'
    // mostradorRetorno = document.getElementById('cantidadBilletera').innerHTML;
    mostrador = document.getElementById('cantidadBilletera').innerHTML;
    ojo = document.getElementById('cantidadVisible')

    if(mostrador != mensajeOculto){
        ojo.setAttribute('class', 'fas fa-eye');
        mostrador = document.getElementById('cantidadBilletera').innerHTML = '**********';
        presionaOjo();
    } else{
        ojo.setAttribute('class', 'fas fa-eye-slash');
        mostrador = document.getElementById('cantidadBilletera').innerHTML = prueba;
        presionaOjo();
    }
}
