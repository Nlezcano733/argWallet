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

        validacionCompra(selector, valorInput, conversion);
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
    }
}



// ----------------------------------------------//
// -------------ALGORITMOS DE COMPRA------------ //
// ----------------------------------------------// 

function validacionCompra(selector, input, conversion){ 
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

        compra = new Transaccion(tk, compra, moneda, input);
        compraToStorage(compra);
        agregarCompras();

        validarOperacion('movimiento exitoso.', '#conversion__confirmacion--texto');

    } else{
        validarOperacion('No dispone de fondos suficientes. Deposite dinero, por favor.', '#conversion__confirmacion--texto');
    }
}

function agregarCompras (){
    compra = obtenerSessionStorage('compra');
    arrayCompras = obtenerStorage('listaCompras');

    if(arrayCompras == null){
        arrayCompras = [];
        arrayCompras.push(compra);

    } else {
        for(i=0; i<arrayCompras.length; i++){
            let cripto = arrayCompras[i]

            if(compra.tipo == cripto.tipo && compra.moneda == cripto.moneda){
                arrayCompras.splice(i, i+1);
                let nuevoArray = arrayCompras.map(()=>{
                    return mismaCompra(cripto, compra);
                })
                compra = nuevoArray[0];
            }
            if(compra.tipo == cripto.tipo && compra.moneda != cripto.moneda){
                valorCompra = conversionEntreCantidades(compra, cripto)
                cantidadTotal = parseFloat((compra.cantidad + cripto.cantidad).toFixed(3))

                arrayCompras.splice(i, i+1)
                compra = new Transaccion (cripto.tipo, cantidadTotal, cripto.moneda, valorCompra)
            }
        }
        arrayCompras.push(compra);
    }
    arrayComprasToStorage()

}


function mismaCompra(cripto, compra){
    let gasto = compra.gasto;
    let cantidad = compra.cantidad

    let copiaObjeto = {...cripto};
    copiaObjeto.cantidad = cantidad + copiaObjeto.cantidad;
    copiaObjeto.gasto = gasto + copiaObjeto.gasto;
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
            return descontarVenta(criptoCliente, venta, input, selector)
        })
        let objetoDescontado = nuevoArray[0];
        let listaBilletera = agregarVentas(objetoDescontado, billetera);
        actualizarComprasStorage(listaBilletera)
        
        let billeteraActual = ingresoBilletera(billetera, venta);
        actualizacionBilleteras('#nombreCripto__divisas', billeteraActual);
        billeteraParaOcultar = mostrarBilletera();

        cripto = obtenerSessionStorage('cripto');
        tk = cripto[0].toUpperCase();
        moneda = cripto[1].toUpperCase();

        venta = new Transaccion(tk, venta, moneda, input);
        ventaToStorage(venta);

        validarOperacion('movimiento exitoso.', '#conversion__confirmacion--texto');

    } else{
        validarOperacion('No dispone de fondos suficientes. Deposite dinero, por favor.', '#conversion__confirmacion--texto');
    }
}


function obtenerCriptoDeBilletera (){
    let arrayCompras = obtenerStorage('listaCompras')
    let cripto = obtenerSessionStorage('criptomoneda')
    let tk = cripto.symbol.toUpperCase();

    for(i=0; i<arrayCompras.length;i++){
        let posicion = arrayCompras[i];
        if(posicion.tipo == tk){
            return posicion
        }
    }
}

function descontarVenta (cripto, venta, valor, selector){ 
    selector = selector.toUpperCase();
    let copiaObjeto = {...cripto};
    copiaObjeto.cantidad = parseFloat((copiaObjeto.cantidad - venta).toFixed(3));

    if(copiaObjeto.moneda == selector){
        copiaObjeto.gasto = parseFloat((copiaObjeto.gasto - valor).toFixed(3));
    } else{
        conversion = conversionPorBilletera(venta, selector, copiaObjeto);
        copiaObjeto.gasto = parseFloat((copiaObjeto.gasto - conversion).toFixed(3));
    }
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

function agregarVentas(cripto){
    let array = obtenerStorage('listaCompras');
    for(i=0;i<array.length;i++){
        let posicion = array[i];
        if(posicion.tipo == cripto.tipo){
            array.splice(i, 1, cripto)
            return array
        }
    }
}
