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
    }).fail(()=>{
        mensajeError('tbody')
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
    }).fail(()=>{
        mensajeError('tbody')
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


function depositarBilletera(input, moneda){
    moneda = moneda.toLowerCase()
    let billeteraUsada = eleccionDeBilletera(moneda);
    cantidad = billeteraUsada.billeteraTotal;

    
    let validacion = ingresoNegativo(input, '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion')
    if(validacion == 'negativo'){
        $('#depositoRetiro__interaccion__input--cantidad').val('');
        return
    }

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

// ---------------------------------------------------------- //
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

        if(cantidadRestante == 0){
            habilitacionBtn();
        }
        validarOperacion('Movimiento exitoso', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion')
    } 
    if (dineroIngresado > billeteraActual){
        validarOperacion('No dispone de fondos suficientes', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
    }
}


// ---------------------------------------------- //
// -------------ARMADO DE BILLETERAS------------- //
// ---------------------------------------------- //

function crearBilletera(input){
    let dineroIngresado;

    if(input != null || input != ""){
        dineroIngresado = parseInt(input);
        actualizacionBilleteras('#depositoRetiro__registro--divisas', dineroIngresado);
        actualizarBilleterasStorage();

    } else{
        validarOperacion('Ingrese un valor real.', '.depositoRetiro__interaccion', '#depositoRetiro__interaccion--validacion');
        $(input).val('');
    }
    //Crea una billetera parcial y la almacena en storage
}


// ---------------------------------------------- //
// ---------ARMADO DE LISTA DE COMPRAS----------- //
// ---------------------------------------------- //

function getAjaxArmadoCompras(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        infoParaListaCompras(resultado);
        accionarOjo();
    }).fail(()=>{
        mensajeError('#cartera__lista')
    })
}
function getAjaxModificarCompras(moneda, compras){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        modificacionCompras(resultado, compras);
    }).fail(()=>{
        mensajeError('#cartera__lista')
    })
}

function infoParaListaCompras(cripto){
    let arrayCompras = obtenerStorage('listaCompras');
    let sumaArray;
    let arrayInfo = [];

    if(arrayCompras == null){
        arrayCompras = [];
        let mensaje = 'Usted no dispone de criptomonedas actualmente';
        crearElemento('#cartera__lista', 'h3', 'id', 'cartera__lista__mensaje', mensaje, 0);
        return;
    }
    
    for(i=0; i<arrayCompras.length;i++){
        let posicionCompra = arrayCompras[i];
        let compraTK = posicionCompra.tipo;

        for(j=0;j<cripto.length;j++){
            let posicionInfo = cripto[j];
            let criptoTk = posicionInfo.symbol.toUpperCase();

            if(compraTK == criptoTk){
                sumaArray = cripto[j]
                break
            }
        }
        arrayInfo.push(sumaArray);
    }

    armadoDeCabecera()
    let arrayBalances = gananciaPerdida(arrayCompras, arrayInfo);
    armadoListaCompras(arrayCompras, arrayInfo, arrayBalances)

    //filtra cantidad de info y arma la lista de activos
}

function conversionEntreCantidades(compra, selector){
    let arrayDivisas = obtenerSessionStorage('divisas')
    let valDolar = arrayDivisas[1].value;
    let valEuro = arrayDivisas[2].value;

    let monedaConversion = compra.moneda;
    let gastoCompra = compra.gasto;

    let conversion;

    if(selector == 'ARS'){
        if(monedaConversion == 'USD'){
            conversion = gastoCompra * valDolar;
        } else if(monedaConversion == 'EUR'){
            conversion = gastoCompra * valEuro;
        } else{
            conversion = gastoCompra;
        }
    }
    if(selector == 'USD'){
        if(monedaConversion == 'ARS'){
            conversion =  gastoCompra / valDolar;
        } else if(monedaConversion == 'EUR'){
            conversion =  gastoCompra * ((valEuro / valDolar));
        } else{
            conversion =  gastoCompra;
        }
    }
    if(selector == 'EUR'){
        if(monedaConversion == 'ARS'){
            conversion =  gastoCompra / valEuro;
        } else if(monedaConversion == 'USD'){
            conversion =  gastoCompra * (valDolar / valEuro);
        } else{
            conversion =  gastoCompra;
        }
    }
    return parseFloat((conversion).toFixed(3));

    //convierte las cantidades de gasto de las compras segun la moneda de la primer compra para unificar valores
}



function modificacionCompras(cripto, compras){
    let selector = $('#cartera__lista__cabecera--divisas').val();
    let billetera = elegirBilletera(selector);
    let sumaArray;
    let arrayInfo = [];
    
    
    if(compras.length > 0){
        for(let i=0; i<compras.length;i++){
            let posicionCompra = compras[i];
            let compraTK = posicionCompra.tipo;

            for(let j=0;j<cripto.length;j++){
                let posicionInfo = cripto[j];
                let criptoTk = posicionInfo.symbol.toUpperCase();

                if(compraTK == criptoTk){
                    sumaArray = cripto[j]
                    break
                }
            }
            arrayInfo.push(sumaArray);
        }

        for(let i=0; i<compras.length; i++){
            let ganPerd = gananciaPerdida(arrayCompras, arrayInfo);

            selector = selector.toUpperCase();
            let conversion = conversionEntreCantidades(compras[i], selector);
            let nodoConversion = $('.cartera__lista__posesion--conversion');
            let nodoBalance = $('.cartera__lista__posesion--ganancias');
            let balance = estilosBalance(billetera.simbolo, ganPerd[i])

            conversion += ganPerd[i];
            conversion = parseFloat(conversion.toFixed(2))

            modificarElemento(nodoConversion[i], `${billetera.simbolo}${conversion}`);
            modificarElemento(nodoBalance[i], balance);

            let valorBalance = $('.cartera__lista__posesion--ganancias')
            valorBalance = valorBalance[i]
            let textoBalance = valorBalance.innerHTML;
            let valorTextoBalance = textoBalance.indexOf('+')
            let valorNeutro = textoBalance.indexOf('$')
            
            if(valorTextoBalance == 0 || valorNeutro == 0){
                $(valorBalance).css('color', '#14b10b')
            } else{
                $(valorBalance).css('color', '#e70008')
            }
        }
    }
    //filtra la cantidad de info y modifica la lista de activos segun selector
}

function gananciaPerdida(compras, info){
    let moneda = $('#cartera__lista__cabecera--divisas').val()
    moneda = moneda.toUpperCase();
    let arrayBalances = []
    let balance;

    for(let i=0; i<compras.length; i++){
        let suma = 0;
        let compraUnidad = compras[i]

        let arrayPrPago = compraUnidad.precio
        let prActual = info[i].current_price;
        let cantidad = compraUnidad.cantidad;

        arrayPrPago.forEach((precio)=>{
            suma += precio;
        })
        let promedio = parseFloat((suma / compraUnidad.cantCompras).toFixed(3));

        if(moneda != compraUnidad.moneda){
            let conversionPrecio = conversionParaListaActivos(moneda, compraUnidad, promedio);

            balance = (prActual - conversionPrecio) * cantidad;
            balance = parseFloat((balance).toFixed(2))
            
        } else{
            balance = (prActual - promedio) * cantidad;
            balance = parseFloat((balance).toFixed(2))
        }
        
        arrayBalances.push(balance)
    }
    return arrayBalances;
    // indica la diferencia de $ entre el lo que valian las criptos en la compra y actualmente
}

function conversionParaListaActivos (selector, cripto, precio){
    let arrayDivisas = obtenerSessionStorage('divisas')
    let dolares = arrayDivisas[1].value;
    let euros = arrayDivisas[2].value;
    let moneda = cripto.moneda;

    if(selector == 'ARS'){
        if(moneda == 'USD'){
            conversion = precio * dolares;
        }
        if(moneda == 'EUR'){
            conversion = precio * euros;
        }
    }
    if(selector == 'USD'){
        if(moneda == 'ARS'){
            conversion = precio / dolares;
        }
        if(moneda == 'EUR'){
            conversion = precio * (euros / dolares)
        }
    }
    if(selector == 'EUR'){
        if(moneda == 'ARS'){
            conversion = precio / euros
        } if(moneda == 'USD'){
            conversion = precio * (dolares / euros);
        }
    }
    return parseFloat((conversion).toFixed(3))
    // realiza la conversion de precio promedio para unificarlo con selector de tabla
}