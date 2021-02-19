function validarOperacion (mensaje, className){
    let nodoPadre, elemento, contenido;
    elemento = document.createElement('p');
    contenido = document.createTextNode(mensaje);
    elemento.appendChild(contenido);
    elemento.setAttribute('id', 'confirmacion');
    
    nodoPadre = document.getElementsByClassName(className);
    nodoPadre[0].append(elemento)

    setTimeout(() => {
        nodoPadre[0].removeChild(elemento)
    }, 2500);
}


function validacionNumeroReal (){
    valorInput = document.getElementById('deposito-retiro').value 
    if(valorInput <= 0 || valorInput == "" || valorInput == null){
        validarOperacion('Ingrese un numero real.', 'dr');
        valorInput = "";
    } 
}

function billeteraInicial(){
    billetera = obtenerStorage('billetera')
    if(billetera == null || billetera == ""){
        billetera = new BilleteraParcial('ARS', 0);
    }
    return billetera
}

function billeteraCompletaInicial(){
    billeteraCompleta = obtenerStorage('billeteraCompleta');
    if(billeteraCompleta == null || billeteraCompleta == ""){
        billeteraCompleta = new Billetera('ARS', 'undefined', ars, 0, 0, 0);
    }
    console.log(billeteraCompleta)
    return billeteraCompleta;
}

function monedaInicial(){
    moneda = obtenerStorage('moneda');
    if(moneda == null || moneda == ''){
        moneda = carteraDivisas[0]
    }
    return moneda;
}


function crearBilleteraCompleta(){
    billeteraCompleta = obtenerStorage('billeteraCompleta');
    compra = obtenerSessionStorage('compra');
    billetera = obtenerStorage('billetera');
    moneda = obtenerStorage('moneda');

    if(billeteraCompleta == null){
        compraArray = [compra];
        billeteraCompleta = new Billetera (billetera.divisa, moneda.simbolo, billetera.billeteraTotal, compra.valor, compraArray)
        billeteraCompletaToStorage();
    } else{
        comprasEnBilletera = billeteraCompleta.arrayCompras;
        comprasEnBilletera.push(compra);
        compraArray = comprasEnBilletera;

        let gastoTotal = compra.valor + billeteraCompleta.cantidadDivisa;

        billeteraCompleta = new Billetera (billetera.divisa, moneda.simbolo, billetera.billeteraTotal, gastoTotal, compraArray);
        billeteraCompletaToStorage();
    }
}


function arrayTipoCripto(tipo, cantidad){
    let array = [];
    objeto = new Compra(tipo, cantidad);
    array.push(objeto);
    return array
}
