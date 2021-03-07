// ---------------------------------------------- //
// ---------------PETICIONES AJAX---------------- //
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
}

// ---------------------------------------------- //
// ---------INICIALIZACION DE BILLETERAS--------- //
// ---------------------------------------------- //

function billeterasTotalesInicial (){
    billeteraPesos =  billeteraArsInicial()
    billeteraDolares =  billeteraUsdInicial()
    billeteraEuros =  billeteraEurInicial()

    sumatoriaBilleteraTotal();
    
    billeteraCompleta = billeteraCompletaInicial()
    billetera = billeteraInicial()
}

function billeteraCompletaInicial(){
    billeteraCompleta = obtenerStorage('billeteraCompleta');
    if(billeteraCompleta == null || billeteraCompleta == ""){
        billeteraCompleta = new Billetera('ars', 'undefined', ars, 0, 0, 0);
    }
    return billeteraCompleta;
    //Seteo de billetera nula para comenzar
}

function monedaInicial(){
    moneda = obtenerStorage('moneda');
    if(moneda == null || moneda == ''){
        moneda = carteraDivisas[0]
    }
    return moneda;
    //verifica si hay una moneda guardada
}

function billeteraInicial(){
    billetera = obtenerStorage('billetera')
    if(billetera == null || billetera == ""){
        billetera = new BilleteraParcial(0, 0, 0);
    }
    return billetera
    //verifica si hay billetera inicial parcial (moneda, cantidad)
}

function billeteraArsInicial(){
    billeteraArs = obtenerStorage('billeteraArs')
    if(billeteraArs == null || billeteraArs == ""){
        billeteraArs = new BilleteraArs(0);
    }
    return billeteraArs
}
function billeteraUsdInicial(){ 
    billeteraUsd = obtenerStorage('billeteraUsd')
    if(billeteraUsd == null || billeteraUsd == ""){
        billeteraUsd = new BilleteraUsd(0);
    }
    return billeteraUsd
}
function billeteraEurInicial(){
    billeteraEur = obtenerStorage('billeteraEur')
    if(billeteraEur == null || billeteraEur == ""){
        billeteraEur = new BilleteraEur(0);
    }
    return billeteraEur
}

function objetoCompleto ({divisa}, array){
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(divisa == arrayDivisas.ticker){ 
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun objeto Billetera
}

function objetoCompletoSelecto(selector, array){
    let i, arrayDivisas;
    for(i=0; i< array.length; i++){
        arrayDivisas = array[i];
        if(selector == arrayDivisas.ticker){
            break;
        }
    }
    return arrayDivisas;
    // Devuelve el array de la divisa con la que se trabaja segun selector
}


function eleccionDeBilletera (moneda){
    if(moneda == 'ars'){
        return billeteraPesos
    }
    if(moneda == 'usd'){
        return billeteraDolares
    }
    if(moneda == 'eur'){
        return billeteraEuros
    }
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
    let claseBoton = $('.depositoRetiro');
    
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
    console.log('Sumar billetera')
    let dineroIngresado, cantidadSumada;
    dineroIngresado = parseInt(input);

    billeteraParaSumar = elegirBilletera(billeteraElegida);
    billeteraActual = billeteraParaSumar.billeteraTotal;
    cantidadSumada = dineroIngresado + billeteraActual;

    actualizacionBilleteras(cantidadSumada);
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
        actualizacionBilleteras(cantidadRestante);
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
    console.log('Crear billetera')
    let dineroIngresado;

    if(input != null || input != ""){
        dineroIngresado = parseInt(input);
        actualizacionBilleteras(dineroIngresado);
        actualizarBilleterasStorage();

        objetoMoneda = objetoCompleto(billetera, carteraDivisas);
        objetoMonedaToStorage(objetoMoneda);

    } else{
        validarOperacion('Ingrese un valor real.', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
        $(input).val('');
    }
    //Crea una billetera parcial y la almacena en storage
}

function actualizacionBilleteras(cantidad){
    let selector = $('#depositoRetiro__registro--divisas').val();
    selector = selector.toLowerCase()

    if(selector == 'ars'){
        billeteraPesos =  new BilleteraArs(cantidad)
    }
    if(selector == 'usd'){
        billeteraDolares =  new BilleteraUsd(cantidad)
    }
    if(selector == 'eur'){
        billeteraEuros =  new BilleteraEur(cantidad)
    }
}

function elegirBilletera(moneda){
    if(moneda == 'ars'){
        return obtenerStorage('billeteraArs');
    }
    if(moneda == 'usd'){
        return obtenerStorage('billeteraUsd');
    }
    if(moneda == 'eur'){
        return obtenerStorage('billeteraEur');
    }
}


// ---------------------------------------------- //
// ----------UNIFICACION DE BILLETERAS----------- //
// ---------------------------------------------- //

function sumatoriaBilleteraTotal (){
    let billeteraArs = obtenerStorage('billeteraArs');
    let billeteraUsd = obtenerStorage('billeteraUsd');
    let billeteraEur = obtenerStorage('billeteraEur');
    let armadoDeBilletera;

    if(billeteraArs == null && billeteraUsd == null && billeteraEur == null){
        pesos = 0;
        dolares = 0;
        euros = 0;
    } else{
        pesos = billeteraArs.billeteraTotal;
        dolares = billeteraUsd.billeteraTotal;
        euros = billeteraEur.billeteraTotal;
    }
    armadoDeBilletera = conversionCadaValor(pesos, dolares, euros);
    return armadoDeBilletera;
}


function conversionCadaValor (pesos, dolares, euros){
    let sumatoria;
    let valorPeso = carteraDivisas[0].value;
    let valorDolar = carteraDivisas[1].value;
    let valorEuro = carteraDivisas[2].value;
    let monedaSumatoria = $('.billeteraUser__balance--divisas').val()
    monedaSumatoria = monedaSumatoria.toLowerCase()

    if(monedaSumatoria == 'ars'){
        pesos = pesos;
        dolares = dolares * valorDolar;
        euros =  euros * valorEuro;
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    if(monedaSumatoria == 'usd'){
        pesos = pesos * (valorPeso/valorDolar);
        dolares = dolares;
        euros = euros * (valorEuro/valorDolar);
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    if(monedaSumatoria == 'eur'){
        pesos = pesos * (valorPeso/ valorEuro);
        dolares = dolares * (valorDolar / valorEuro);
        euros = euros;
        sumatoria = parseFloat(pesos + dolares + euros).toFixed(2);
    }
    pesos = parseFloat(pesos).toFixed(3)
    dolares = parseFloat(dolares).toFixed(3)
    euros = parseFloat(euros).toFixed(3)

    billetera = new BilleteraParcial(pesos, dolares, euros);
    return sumatoria;
}

