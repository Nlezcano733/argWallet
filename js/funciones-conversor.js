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

function accionarBtnCompraVenta(){
    $('#confirmacionCompra').click(()=>{
        let selector = $('#nombreCripto__divisas').val();               //selector
        let valorInput = $('#conversion__ingreso--divisa').val();       //input
        let conversion = $('#conversion__convertido--valor').text();    //resultado de conversion
        let cripto = obtenerSessionStorage('criptomoneda');             //info de cripto

        validacionCompra(selector, valorInput, conversion, cripto);
    })
    // $('#confirmacionVenta').click(()=>{
    //     validacionVenta(selector, valorInput, conversion, cripto);
    // })
    
}

function validacionCompra(selector, input, conversion, cripto){
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

        compra = new Compra(tk, compra, moneda, input);
        compraToStorage(compra);

        agregarCompras();
        // mostrarCompra();

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

            if(compra.tipo == cripto.tipo){
                arrayCompras.splice(i, i+1);
                let nuevoArray = arrayCompras.map(()=>{
                    return mismaCompra(cripto, compra);
                })
                compra = nuevoArray[0];
            }
        }
        arrayCompras.push(compra);
    }
    arrayComprasToStorage()

}

function mismaCompra(cripto, compra){
    let cantidadComprada = compra.gasto;

    let copiaObjeto = {...cripto};
    copiaObjeto.gasto = cantidadComprada + copiaObjeto.gasto;
    return copiaObjeto;
}

// TO DO - crear funcion para vender criptos



function mostrarCompra (){
    let comprasRealizadas = obtenerStorage('listaCompras');
    let posicionActual = comprasRealizadas.length;
        
    for(let i=posicionActual-1; i<posicionActual; i++){
        let objetoPosicion = comprasRealizadas[i];
        // armadoDeCompras(i, objetoPosicion)
        // console.log(objetoPosicion)
    }
}

// TO DO - agregar armado de compras
