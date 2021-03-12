$('#conversor__btnBilletera').click(()=>{
    window.location.href = 'panelUsuario.html';
})
$('#conversor__btnMercado').click(()=>{
    window.location.href = 'panelUsuario.html#2';
})

// ----------------------------------------------//
// --------------MODIFICAR HEADER--------------- //
// ----------------------------------------------//

function mostrarBilletera (){
    let selector = $('.billeteraUser__balance--divisas').val();
    let balanceTotal

    balanceTotal = sumatoriaBilleteraTotal();

    let objetoDivisaElegida = objetoCompletoSelecto(selector, carteraDivisas);
    cantidadBilleteraMostrada = modificarCantidad(objetoDivisaElegida, balanceTotal, '.billeteraUser__balance--cantidad');

}

function modificarCantidad({simbolo}, cantidadTotal, ubicacion){
    textoParaMostrar = `${simbolo} ${cantidadTotal}`;
    mostrador = $(ubicacion).text(textoParaMostrar);
    return textoParaMostrar;
}


function mostrarOcultar (){
    let mensajeOculto = '**************';
    let ojo = $('#ojoUser');
    let selectorBalance = $('.billeteraUser__balance--divisas');

    let mostrador = $('.billeteraUser__balance--cantidad').text()
    let cantidadBalance = sumatoriaBilleteraTotal();

    if(mostrador != mensajeOculto){
        console.log('if')
        $(ojo).attr('class', 'fas fa-eye');
        $(selectorBalance).attr('disabled', '')
        $('.billeteraUser__balance--cantidad').text(mensajeOculto);
    } else{
        console.log('else')
        $(ojo).attr('class', 'fas fa-eye-slash');
        $(selectorBalance).removeAttr('disabled', '')
        $('.billeteraUser__balance--cantidad').text(cantidadBalance);
    }  
}

// ----------------------------------------------//
// -------------LISTADO DE CRIPTOS-------------- //
// ----------------------------------------------//     

function getAjaxArmadoLista(){
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        listadoDeCriptos(resultado);
    })
}

function listadoDeCriptos(resultado){
    let i=0;
    if(resultado != undefined){
        resultado.forEach((cripto) => {
            carteraCriptos.push(cripto.id);
            nombre = primeraLetraMayuscula(cripto.id);

            crearDivIdPadre('#aside', 'class', 'listado');
            crearImagen('.listado', cripto.image, 'class', 'listado__logoCripto', i);
            crearElemento('.listado', 'p', 'class', 'listado__nombreCripto', nombre, i);
            let eleccionCripto = $('.listado__logoCripto');
            eleccionCripto = eleccionCripto[i];
            i++
        });
        accionarBtnLista();
    }
}

$('#aside').hover(()=>{
    $('#aside').animate({width: '220px'});
}, ()=>{
    $('#aside').animate({width: '50px'})
});


function accionarBtnLista(){
    for(let i=0; i<25; i++){
        let btn = $('.listado')
        $(btn[i]).click(()=>{
            btnLista(i)
            // activacionBtnVenta()
            $('#conversion__ingreso--divisa').keypress(conversionDinamica);
            $('#conversion__ingreso--divisa').val('');
            $('#conversion__convertido--valor').text('0,00')
        })
    }
}

function btnLista(i){
    let nombre = $('.listado__nombreCripto');
    nombreElegido = $(nombre[i]).text();
    nombre = nombreElegido.toLowerCase();
    armadoDePanelElegido(nombre);
}

// ----------------------------------------------//
// ---------------ARMADO DE PANEL--------------- //
// ----------------------------------------------// 

function armadoDePanelInicial(){
    let par = obtenerSessionStorage('cripto');
    let tk = par[0];
    let moneda = par[1];

    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        resultado.forEach((cripto)=>{
            if(tk == cripto.symbol){
                armadoDePanel(cripto, moneda);
                criptoCompletoToStorage(cripto);

                activacionBtnVenta();
            }
        })
    })
}

function armadoDePanelElegido(nombre){
    let moneda = $('#nombreCripto__divisas').val();
    moneda = moneda.toLowerCase()

    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + moneda + "&order=market_cap_desc&per_page=25&page=1&sparkline=false",
        type: "GET",
        dataType: "json"
    }).done((resultado)=>{
        resultado.forEach((cripto)=>{
            if(nombre == cripto.id){
                armadoDePanel(cripto, moneda);
                criptoCompletoToStorage(cripto);

                let parElegido = [cripto.symbol, moneda];
                parElegido = JSON.stringify(parElegido)
                sessionStorage.setItem('cripto', parElegido);

                activacionBtnVenta()
            }
        })
    })
}

function armadoDePanelPorSelector(){
    $('#nombreCripto__divisas').change(()=>{
        let cripto = obtenerSessionStorage('criptomoneda');
        nombre = cripto.id;
        armadoDePanelElegido(nombre)
        $('#conversion__ingreso--divisa').val('');
        $('#conversion__convertido--valor').text('0,00')
    })
}

function armadoDePanel(cripto, moneda){
    moneda = moneda.toUpperCase();
    let objetoMoneda = objetoCompleto(moneda, carteraDivisas);
    let simbolo = objetoMoneda.simbolo;
    let nombre = primeraLetraMayuscula(cripto.id);
    let tk = (cripto.symbol).toUpperCase();
    let par = parDeConversion(cripto, moneda);
    let cambio = porcentajeDeCambio(cripto.price_change_percentage_24h)
    let mktCap = grandesCantidades(cripto.market_cap);
    let vol = grandesCantidades(cripto.total_volume)
    let maxSupply = cripto.max_supply
    if(maxSupply == null){
        maxSupply = '---'
    }
    let fecha = formateoFecha(cripto.ath_date)


    modificarElemento('#nombreCripto__id', nombre);
    modificarElemento('#nombreCripto__tk', tk);
    modificarFoto('#logoCripto__img', cripto.image);
    modificarElemento('#infoCripto__cotizacion--par', par);
    modificarElemento('#conversion__ingreso--simbolo', simbolo);
    modificarElemento('#conversion__convertido--ticker', tk)

    modificarElemento('#infoCripto__cotizacion--valorCompra', `${simbolo} ${cripto.current_price}`);
    modificarElemento('#infoCripto__cotizacion--valorCambio', cambio);
    modificarElemento('#infoCripto__info--mktCap', `${simbolo} ${mktCap}`);
    modificarElemento('#infoCripto__info--rank', `#${cripto.market_cap_rank}`);

    modificarElemento('#infoCripto__info--circSupply', `${cripto.circulating_supply} ${tk}`);
    modificarElemento('#infoCripto__info--maxSupply', `${maxSupply} ${tk}`);
    modificarElemento('#infoCripto__valores--max', `${simbolo}${cripto.high_24h}`);
    modificarElemento('#infoCripto__valores--min', `${simbolo}${cripto.low_24h}`);
    modificarElemento('#infoCripto__valores--vol', `${simbolo}${vol}`);
    modificarElemento('#infoCripto__valores--ath', `${simbolo}${cripto.ath}`)
    modificarElemento('#infoCripto__valores--dateAth', fecha)
}

function valorSelectorInicial(){
    let moneda = obtenerSessionStorage('cripto');
    let monedaInicial = moneda[1];
    $('#nombreCripto__divisas').val(monedaInicial)
}


// ----------------------------------------------//
// ---------CONVERSION DE CRIPTOMONEDAS--------- //
// ----------------------------------------------// 

function conversionDinamica(event){
    input = $('#conversion__ingreso--divisa').val();
    let teclaPresionada = event.key;
    valorATomar = input + teclaPresionada;

    conversion = conversionMonedacripto(valorATomar);
    modificarElemento('#conversion__convertido--valor', conversion);
}

function activacionBtnVenta(){
    let criptoCliente = obtenerCriptoDeBilletera();
    console.log(criptoCliente)
    if(criptoCliente == undefined){
        $('#confirmacionVenta').attr('disabled', '');
    } else{
        $('#confirmacionVenta').removeAttr('disabled');
    }
}