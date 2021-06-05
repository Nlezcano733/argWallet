// ---------------------------------------------- //
// ---------------ACCIONAMIENTOS----------------- //
// ---------------------------------------------- //

function compraMax(){
    let selector = $('#nombreCripto__divisas').val()
    let billetera = elegirBilletera(selector)
    let cantidad = billetera.billeteraTotal

    conversion = conversionMonedacripto(cantidad)
    modificarElemento('#conversion__convertido--valor', conversion);
    $('#conversion__ingreso--divisa').val(cantidad)
}

function ventaMax(){
    let divisas = obtenerSessionStorage('divisas')
    let selector = $('#nombreCripto__divisas').val()
    divisas = objetoCompleto(selector, divisas)

    selector = selector.toUpperCase();

    let cripto = obtenerCriptoDeBilletera()
    let cantidad = cripto.cantidad;
    modificarElemento('#conversion__convertido--valor', cantidad);

    let arrayPrecios = cripto.precio;
    let suma = 0;


    if(arrayPrecios.length >= 1){
        arrayPrecios.forEach((precio)=>{
            suma += precio;
        })
    }
    let promedioPrecio = suma / cripto.cantCompras;


    if(cripto.moneda == selector){
        calculoConversion = promedioPrecio * cantidad
        conversion = parseFloat((calculoConversion).toFixed(2))
    } else{
        conversion = conversionVentaMax(promedioPrecio, selector, cripto)
    }

    $('#conversion__ingreso--divisa').val(conversion)
}

function conversionVentaMax(prom, selector, cripto){
    let divisas = obtenerSessionStorage('divisas');
    let conversion
    dolar = divisas[1].value;
    euro = divisas[2].value;

    moneda = cripto.moneda;
    cantidad = cripto.cantidad;

    if(selector == 'ARS'){
        if(moneda == 'USD'){
            conversion = (dolar / prom) * cantidad;
        }
        if(moneda == 'EUR'){
            conversion = (euro * prom) * cantidad;
        }
    }
    if(selector == 'USD'){
        if(moneda == 'ARS'){
            conversion = (dolar / prom) * cantidad;
        }
        if(moneda == 'EUR'){
            conversion = ((euro / dolar) * prom) * cantidad
        }
    }
    if(selector == 'EUR'){
        if(moneda == 'ARS'){
            conversion = (prom / euro) * cantidad;
        }
        if(moneda == 'USD'){
            conversion = ((dolar / euro) * prom) * cantidad;
        }
    }
    return parseFloat((conversion).toFixed(3))
}

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

function comprar(){
    let selector = $('#nombreCripto__divisas').val(); 
    let valorInput = $('#conversion__ingreso--divisa').val();
    let conversion = $('#conversion__convertido--valor').text();
    let precio = $('#infoCripto__cotizacion--valorCompra').text();
    precio = precio.split(' ');
    precio = parseFloat(precio[1]);

    validacionCompra(selector, valorInput, conversion, precio);
    $('#conversion__ingreso--divisa').val('');
    $('#conversion__convertido--valor').text('0,00')
}

function accionarBtnVenta(){
    let criptoCliente = obtenerCriptoDeBilletera();

    if(criptoCliente){
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

    let validacion = ingresoNegativo(input, '#conversion__confirmacion--texto')
    if(validacion == 'negativo'){
        $('#conversion__ingreso--divisa').val('');
        return
    }

    if(cantidad >= input){
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

    } else if(cantidad < input){
        validarOperacion('No dispone de fondos suficientes.', '#conversion__confirmacion--texto');
    } else{
        validarOperacion('Ingrese un valor real.', '#conversion__confirmacion--texto');
    }
}

function agregarCompras (){
    compra = obtenerSessionStorage('compra');
    let precioCompra = compra.precio[0];
    arrayCompras = obtenerStorage('listaCompras');

    if(arrayCompras){
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
    } else {
        arrayCompras = [];
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

    let validacion = ingresoNegativo(input, '#conversion__confirmacion--texto')
    if(validacion == 'negativo'){
        $('#conversion__ingreso--divisa').val('');
        return
    }

    if(cantEnBilletera >= venta){
        let nuevoArray = arrayCompleto.map(()=>{
            return descontarVenta(criptoCliente, venta, input, selector)
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

        validarOperacion('movimiento exitoso.', '#conversion__confirmacion--texto');
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00');
    } else if( cantEnBilletera < venta){
        validarOperacion('No dispone de fondos necesarios, vuelva a intentarlo.', '#conversion__confirmacion--texto');
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00');
    } else{
        validarOperacion('Ingrese un valor real', '#conversion__confirmacion--texto');
    }
}

function obtenerCriptoDeBilletera (){
    let arrayCompras = obtenerStorage('listaCompras')
    let cripto = obtenerSessionStorage('criptomoneda')
    let tk = cripto.symbol.toUpperCase();

    if(arrayCompras && arrayCompras[0]){
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
        let valorPrecio = conversionPorBilletera(promedio, selector, copiaObjeto)
        copiaObjeto.precio = [valorPrecio]
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
        if(posicion.tipo == cripto.tipo){
            if(verif){
                array.splice(i, 1, cripto)
            } else{
                array.splice(i, 1)
            }
        }
    }
    return array
}

function mostrarCantidadCriptos (){
    let arrayCompras = obtenerStorage('listaCompras')
    let cripto = obtenerSessionStorage('criptomoneda')
    let tk = cripto.symbol.toUpperCase();

    if(arrayCompras){
        for(let i=0; i<arrayCompras.length;i++){
            let posicion = arrayCompras[i];
            if(posicion.tipo == tk){
                let mensaje = `Usted dispone ${posicion.cantidad} ${posicion.tipo}`;
                modificarElemento('#conversion__confirmacion--cantidad', mensaje);
                break;
            } else{
                modificarElemento('#conversion__confirmacion--cantidad', '');
            }
        }
    }
}
