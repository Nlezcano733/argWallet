// ---------------------------------------------- //
// ---------------PETICIONES AJAX---------------- //
// ---------------------------------------------- //

function getAjaxMercado(moneda){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        armadoDeTabla(resultado, moneda);
    })

    //pedido para armado de tabla al inicio de la carga de la pagina
}

function getAjaxModMercado(moneda){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        modificarTabla(resultado, moneda);
    })
    //pedido para modificar tabla ya creada segun cambios de selector de moneda
}

function getAjaxConvReferencia(moneda, cantidad){
    moneda = moneda.toLowerCase()
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=1&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        let conversionBtc = convertirMonedaCriptoRef(cantidad, resultado);
        $('.depositoRetiro__registro--btc').text(`${conversionBtc} BTC`)
    })
    //pedido para actualizar valores de btc segun moneda y poder convertirlo segun la moneda y cantidad de la billetera seleccionada
}


// ---------------------------------------------- //
// -------------DEPOSITO DE DINERO--------------- //
// ---------------------------------------------- //

function depositar(){
    let divisaIngresada, inputNumber;

    monedaSeleccionada = $('#depositoRetiro__registro--divisas option:selected');
    divisaIngresada = $(monedaSeleccionada).val();
    inputNumber = $('#depositoRetiro__interaccion__input--cantidad').val();
    depositarBilletera(inputNumber, divisaIngresada);
}

function depositarConEnter  (event){
    if (event.which == 13) {
        event.preventDefault();
        depositar()
    }
}


function depositarBilletera(input, moneda){
    moneda = moneda.toLowerCase()
    let billeteraUsada = eleccionDeBilletera(moneda);
    cantidad = billeteraUsada.billeteraTotal;
    // let claseBoton = $('.depositoRetiro');
    
    if(cantidad == 0 && input != ""){
        crearBilletera(input, moneda);
        habilitacionBtn()
    } else if(cantidad > 0 && input != ""){
        sumarBilletera(input, moneda);
    } else{
        validarOperacion('Ingrese un valor Real', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
    }

    $('#depositoRetiro__interaccion__input--cantidad').val('');
    AccionarRetiro();
    mostrarbilleteraSeleccionada();
}

function habilitacionBtn(){
    let btn = $('.depositoRetiro');
    btn = btn[1];
    let selector = $('#depositoRetiro__registro--divisas').val();
    selector = selector.toLowerCase();

    billeteraElegida = elegirBilletera(selector);

    if(billeteraElegida != null){
        billeteraElegida = billeteraElegida.billeteraTotal;
    } else{
        billeteraElegida = 0;
    }

    if(billeteraElegida != 0){
        $(btn).attr('id', 'depositoRetiro__interaccion--retirar');
        AccionarRetiro()
    } else{
        $(btn).attr('id', 'botonDeshabilitado');
    }
}

// ---------------------------------------------------------- //

// SUMA DE DINERO
function sumarBilletera(input, billeteraElegida){
    let dineroIngresado, cantidadSumada;
    dineroIngresado = parseInt(input);

    billeteraParaSumar = elegirBilletera(billeteraElegida);
    billeteraActual = billeteraParaSumar.billeteraTotal;
    cantidadSumada = dineroIngresado + billeteraActual;

    actualizacionBilleteras('#depositoRetiro__registro--divisas', cantidadSumada);
    actualizarBilleterasStorage();
    mostrarbilleteraSeleccionada();
    validarOperacion('movimiento exitoso', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
}

// RETIRO DE DINERO
function retirar(){
    let inputNumber, divisa;

    inputNumber = $('#depositoRetiro__interaccion__input--cantidad').val();
    divisa = $('#depositoRetiro__registro--divisas option:selected').val();
    divisa = divisa.toLowerCase();
    restarBilletera(inputNumber, divisa);
    mostrarbilleteraSeleccionada();
    $('#depositoRetiro__interaccion__input--cantidad').val('');
}


function restarBilletera(input, billeteraElegida){
    let dineroIngresado, cantidadRestante, billeteraActual, billeteraParaRestar;

    dineroIngresado = parseInt(input);
    billeteraParaRestar = elegirBilletera(billeteraElegida);
    billeteraActual = billeteraParaRestar.billeteraTotal;

    if (dineroIngresado <= billeteraActual){
        cantidadRestante = billeteraActual - dineroIngresado;
        habilitacionBtn();
        actualizacionBilleteras('#depositoRetiro__registro--divisas', cantidadRestante);
        actualizarBilleterasStorage();
        mostrarbilleteraSeleccionada();
        validarOperacion('Movimiento exitoso', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion')
    } 
    if (dineroIngresado > billeteraActual){
        validarOperacion('No dispone de fondos suficientes', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
    }
}


// ---------------------------------------------- //
// -------------ARMADO DE BILLETERAS------------- //
// ---------------------------------------------- //

function crearBilletera(input, moneda){
    let dineroIngresado;

    if(input != null || input != ""){
        dineroIngresado = parseInt(input);
        actualizacionBilleteras('#depositoRetiro__registro--divisas', dineroIngresado);
        actualizarBilleterasStorage();

        objetoMoneda = objetoCompleto(billetera, carteraDivisas);
    } else{
        validarOperacion('Ingrese un valor real.', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
        $(input).val('');
    }
    //Crea una billetera parcial y la almacena en storage
}

