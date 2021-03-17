// ---------------------------------------------- //
// ---------------PETICIONES AJAX---------------- //
// ---------------------------------------------- //
function conversionInicialDolar(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ars",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        valorUsd =  resultado.tether.ars;
        usd = new Divisas ('Dolar', 'USD', valorUsd, '$');
        carteraDivisas.push(usd)
    })
}

function conversionInicialEuro(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=eurxb&vs_currencies=ars",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        valorEur = resultado.eurxb.ars

        euro = new Divisas ('Euro', 'EURO', valorEur, '€');
        carteraDivisas.push(euro)
    })
}

// ---------------------------------------------- //
// ---------------ACCIONAMIENTOS----------------- //
// ---------------------------------------------- //

function conversionMonedacripto (cantidad){
    if(cantidad > 0){
        let cripto = obtenerSessionStorage('criptomoneda');
        let conversion = parseFloat((cantidad / cripto.current_price).toFixed(3));
        return conversion
    } else {
        $('#conversion__convertido--valor').text('0,00');
        $(cantidad).val('');
    }
}

function accionarBtnCompra(){
    $('#confirmacionCompra').click(()=>{
        let selector = $('#nombreCripto__divisas').val(); 
        let valorInput = $('#conversion__ingreso--divisa').val();
        let conversion = $('#conversion__convertido--valor').text();
        let precio = $('#infoCripto__cotizacion--valorCompra').text();
        precio = precio.split(' ');
        precio = parseFloat(precio[1]);

        validacionCompra(selector, valorInput, conversion, precio);
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00')
    })
}

function accionarBtnVenta(){
    let criptoCliente = obtenerCriptoDeBilletera();

    if(criptoCliente != undefined){
        $('#confirmacionVenta').click(()=>{
            let selector = $('#nombreCripto__divisas').val();
            let valorInput = $('#conversion__ingreso--divisa').val();
            let conversion = $('#conversion__convertido--valor').text();

            validacionVenta(selector, valorInput, criptoCliente, conversion);
        })
    } else{
        $('#confirmacionVenta').off('click')
    }
}

// ----------------------------------------------//
// -------------ALGORITMOS DE COMPRA------------ //
// ----------------------------------------------// 

function validacionCompra(selector, input, conversion, precio){ 
    let billetera = eleccionDeBilletera(selector);
    let cantidad = billetera.billeteraTotal;

    input = parseFloat(input);
    let compra = parseFloat(conversion);

    if(input == "" || input == undefined || isNaN(input)){
        validarOperacion('Ingrese un valor real', '#conversion__confirmacion--texto');

    } else if(cantidad >= input){

        billeteraActual = cantidad - input;
        actualizacionBilleteras('#nombreCripto__divisas', billeteraActual);
        billeteraParaOcultar = mostrarBilletera();

        cripto = obtenerSessionStorage('cripto');
        tk = cripto[0].toUpperCase();
        moneda = cripto[1].toUpperCase();

        compra = new Transaccion(tk, compra, moneda, input, precio, 1);
        compraToStorage(compra);
        agregarCompras();

        activacionBtnVenta();

        validarOperacion('movimiento exitoso.', '#conversion__confirmacion--texto');
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00');

    } else{
        validarOperacion('No dispone de fondos suficientes.', '#conversion__confirmacion--texto');
    }
}

function agregarCompras (){
    compra = obtenerSessionStorage('compra');
    let precioCompra = compra.precio[0];
    arrayCompras = obtenerStorage('listaCompras');

    if(arrayCompras == null){
        arrayCompras = [];
        arrayCompras.push(compra);
    } else {
        for(i=0; i<arrayCompras.length; i++){
            let cripto = arrayCompras[i];

            if(compra.tipo == cripto.tipo && compra.moneda == cripto.moneda){
                if(arrayCompras.length > 1){
                    arrayCompras.splice(i, i+1);
                    let nuevoArray = arrayCompras.map(()=>{
                        return mismaCompra(cripto, compra);
                    })
                    compra = nuevoArray[0];
                } else{
                    compra = mismaCompra(cripto, compra);
                    arrayCompras.splice(0, 1);
                }
            } 
            if(compra.tipo == cripto.tipo && compra.moneda != cripto.moneda){
                valorCompra = conversionEntreCantidades(compra, cripto)
                cantidadTotal = parseFloat((compra.cantidad + cripto.cantidad).toFixed(3))

                if(arrayCompras.length>1){
                    arrayCompras.splice(i, i+1);
                    compra = mismaCompraDiferenteMoneda(cripto, compra, precioCompra)
                } else{
                    compra = mismaCompraDiferenteMoneda(cripto, compra, precioCompra);
                    arrayCompras.splice(0, 1);
                }
            }
        }
        arrayCompras.push(compra);
    }
    arrayComprasToStorage()

}


function mismaCompra(cripto, compra){
    let gasto = compra.gasto;
    let cantidad = compra.cantidad
    let cantCompras = cripto.cantCompras;

    let arrayCompras = cripto.precio;
    array = arrayCompras.push(compra.precio[0])

    let copiaObjeto = {...cripto};
    copiaObjeto.cantidad = parseFloat((cantidad + copiaObjeto.cantidad).toFixed(3));
    copiaObjeto.gasto = gasto + copiaObjeto.gasto;
    copiaObjeto.cantCompras = cantCompras + 1;
    return copiaObjeto;
}

function mismaCompraDiferenteMoneda(cripto, compra, precioNuevaCompra){
    let gasto = compra.gasto;
    let cantidad = compra.cantidad
    let cantCompras = cripto.cantCompras;
    let precioConvertido = conversionEntrePrecios(compra, cripto, precioNuevaCompra);

    let copiaObjeto = {...cripto};
    copiaObjeto.cantidad = parseFloat((cantidad + copiaObjeto.cantidad).toFixed(3));
    copiaObjeto.gasto = gasto + copiaObjeto.gasto;
    copiaObjeto.cantCompras = cantCompras + 1;

    let array = copiaObjeto.precio;
    array.push(precioConvertido)

    return copiaObjeto;
}

function conversionEntreCantidades(compra, cripto){
    let valDolar = carteraDivisas[1].value;
    let valEuro = carteraDivisas[2].value;

    let moneda = cripto.moneda;
    let gasto = cripto.gasto;
    let monedaConversion = compra.moneda;
    let gastoCompra = compra.gasto;

    let conversion;

    if(moneda == 'ARS'){
        if(monedaConversion == 'USD'){
            conversion = gasto + (valDolar * gastoCompra);
        } else if(monedaConversion == 'EUR'){
            conversion = gasto + (valEuro * gastoCompra);
        } else{
            conversion = gasto + gastoCompra
        }
    }
    if(moneda == 'USD'){
        if(monedaConversion == 'ARS'){
            conversion =  gasto + (gastoCompra / valDolar);
        } else if(monedaConversion == 'EUR'){
            conversion =  gasto + ((valEuro / valDolar) * gastoCompra);
        } else{
            conversion =  gasto + gastoCompra;
        }
    }
    if(moneda == 'EUR'){
        if(monedaConversion == 'ARS'){
            conversion =  gasto + (gastoCompra / valEuro);
        } else if(monedaConversion == 'USD'){
            conversion =  gasto + (gastoCompra * (valDolar / valEuro));
        } else{
            conversion =  gasto + gastoCompra;
        }
    }
    return parseFloat((conversion).toFixed(3));
}

function conversionEntrePrecios(compra, cripto, precioCompra){
    let dolares = carteraDivisas[1].value;
    let euros = carteraDivisas[2].value;

    let monedaCompra = compra.moneda;
    let monedaBilletera = cripto.moneda;

    let conversion;
    
    if(monedaBilletera == 'ARS'){
        if(monedaCompra == 'USD'){
            conversion = precioCompra * dolares;
        }
        if(monedaCompra == 'EUR'){
            conversion = precioCompra * euros;
        }
    }
    if(monedaBilletera == 'USD'){
        if(monedaCompra == 'ARS'){
            conversion = precioCompra / dolares;
        }
        if(monedaCompra == 'EUR'){
            conversion = precioCompra / (euros / dolares);
        }
    }
    if(monedaBilletera == 'EUR'){
        if(monedaCompra == 'ARS'){
            conversion = precioCompra / euros;
        }
        if(monedaCompra == 'USD'){
            conversion = precioCompra / (dolares / euros);
        }
    }
    return parseFloat((conversion).toFixed(2));
}

// ----------------------------------------------//
// -------------ALGORITMOS DE VENTA------------- //
// ----------------------------------------------// 

function validacionVenta(selector, input, criptoCliente, cantCriptos){
    let arrayCompleto = obtenerStorage('listaCompras');
    let cantEnBilletera = criptoCliente.cantidad;
    let venta = parseFloat(cantCriptos);

    let billetera = eleccionDeBilletera(selector);
    input = parseFloat(input); 


    if(input == "" || input == undefined || isNaN(input)){
        validarOperacion('Ingrese un valor real', '#conversion__confirmacion--texto');

    } else if( cantEnBilletera >= venta){

        let nuevoArray = arrayCompleto.map(()=>{
            return descontarVenta(criptoCliente, venta, input, selector)    // TO DO - promediar precios compra
        })
        let objetoDescontado = nuevoArray[0];

        if(objetoDescontado.gasto > 0){
            listaBilletera = agregarQuitarCompra(objetoDescontado, true)
        } else{
            listaBilletera = agregarQuitarCompra(objetoDescontado, false)
        }

        if(listaBilletera.length > 0){
            actualizarComprasStorage(listaBilletera)
        } else{
            localStorage.removeItem('listaCompras')
        }
        
        let billeteraActual = ingresoBilletera(billetera, venta);
        actualizacionBilleteras('#nombreCripto__divisas', billeteraActual);
        billeteraParaOcultar = mostrarBilletera();

        // TO DO - ver utilidad de enviar transacciones de venta a storage - uso para ver ganancias
        // cripto = obtenerSessionStorage('cripto');
        // tk = cripto[0].toUpperCase();
        // moneda = cripto[1].toUpperCase();

        // venta = new Transaccion(tk, venta, moneda, input);
        // ventaToStorage(venta);

        validarOperacion('movimiento exitoso.', '#conversion__confirmacion--texto');
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00');

    } else{
        validarOperacion('No dispone de fondos necesarios, vuelva a intentarlo.', '#conversion__confirmacion--texto');
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00');
    }
}


function obtenerCriptoDeBilletera (){
    let arrayCompras = obtenerStorage('listaCompras')
    let cripto = obtenerSessionStorage('criptomoneda')
    let tk = cripto.symbol.toUpperCase();

    if(arrayCompras != null && arrayCompras[0] != null){
        for(i=0; i<arrayCompras.length;i++){
            let posicion = arrayCompras[i];
            if(posicion.tipo == tk){
                return posicion
            }
        }
    }
}

function descontarVenta (cripto, venta, valor, selector){ 
    selector = selector.toUpperCase();
    let copiaObjeto = {...cripto};
    let arrayPrPago = copiaObjeto.precio;
    let suma = 0;

    arrayPrPago.forEach((precio)=>{
        suma += precio;
    })
    let promedio = parseFloat((suma / arrayPrPago.length).toFixed(3));

    if(copiaObjeto.moneda == selector){
        copiaObjeto.gasto = parseFloat((copiaObjeto.gasto - valor).toFixed(3));
        copiaObjeto.precio = [promedio];
    } else{
        conversion = conversionPorBilletera(venta, selector, copiaObjeto);
        copiaObjeto.gasto = parseFloat((copiaObjeto.gasto - conversion).toFixed(3));
        copiaObjeto.precio = conversionPorBilletera(promedio, selector, copiaObjeto)
    }

    copiaObjeto.cantidad = parseFloat((copiaObjeto.cantidad - venta).toFixed(3));
    copiaObjeto.cantCompras = 1
    return copiaObjeto;
}

function conversionPorBilletera(valor, selector, {moneda}){
    let dolar = carteraDivisas[1].value
    let euro = carteraDivisas[2].value
    let conversion;
    selector = selector.toUpperCase();

    if(selector == 'ARS'){
        if(moneda == 'USD'){
            conversion = valor / dolar
        } 
        if(moneda == 'EUR'){
            conversion = valor / euro
        }
    }
    if(selector == 'USD'){
        if(moneda == 'ARS'){
            conversion = valor * dolar
        }
        if(moneda == 'EUR'){
            conversion = valor * (dolar / euro)
        }
    }
    if(selector == 'EUR'){
        if(moneda == 'ARS'){
            conversion = valor * euro
        }
        if(moneda == 'USD'){
            conversion = valor * (euro / dolar)
        }
    }
    return parseFloat((conversion).toFixed(3))
}

function ingresoBilletera({billeteraTotal}, cantidad){
    cripto = obtenerSessionStorage('criptomoneda');
    conversion =  cripto.current_price * cantidad;
    return billeteraTotal + conversion
}


function agregarQuitarCompra(cripto, verif){
    let array = obtenerStorage('listaCompras');
    for(i=0;i<array.length;i++){
        let posicion = array[i];
        if(posicion.tipo == cripto.tipo && verif == true){
            array.splice(i, 1, cripto)
        }
        if(posicion.tipo == cripto.tipo && verif == false){
            array.splice(i, 1)
        }
    }
    return array
}

function mostrarCantidadCriptos (){
    let arrayCompras = obtenerStorage('listaCompras')
    let cripto = obtenerSessionStorage('criptomoneda')
    let tk = cripto.symbol.toUpperCase();

    if(arrayCompras != null){
        for(i=0; i<arrayCompras.length;i++){
            let posicion = arrayCompras[i];
            if(posicion.tipo == tk){
                let mensaje = `Usted dispone ${posicion.cantidad} ${posicion.tipo}`
                modificarElemento('#conversion__confirmacion--cantidad', mensaje);
                break;
            } else{
                modificarElemento('#conversion__confirmacion--cantidad', '');
            }
        }
    }
}
