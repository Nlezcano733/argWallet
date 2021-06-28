// ----------------------------------------------//
// -----------------NAVEGACION------------------ //
// ----------------------------------------------//

$('#conversor__btnBilletera').click(()=>{
    window.location.href = 'panelUsuario.html';
})
$('#conversor__btnMercado').click(()=>{
    window.location.href = 'panelUsuario.html#2';
})

// -------------------------------------------- //
//           APERTURA MENU RESPONSIVE           //
// -------------------------------------------- //

function accionarMenu (){
    $('#burger-logo').click( e =>{ abrirMenu(e.target.className) });
    $('#user-logo').click( e =>{ abrirMenu(e.target.className) });
    $('#market-logo').click( e =>{ abrirMenu(e.target.className) });
}

function abrirMenu (clase){
    if(clase === 'fas fa-bars'){
        $('.billeteraUser').fadeOut();
        $('#aside').fadeOut();
        $('.navBar').toggle('slide');
        $('.navBar').css('display', 'flex');

        setTimeout(()=>{ 
            $('#burger-logo').attr('class', 'fas fa-times');
            $('#redes').css('display', 'flex')
        }, 400)
        btnClose();

    } else if(clase === 'fas fa-user-circle'){
        $('.navBar').fadeOut();
        $('#aside').fadeOut();
        $('.billeteraUser').toggle('slide');
        btnClose();

    } else if(clase === 'fab fa-bitcoin'){
        $('.navBar').fadeOut();
        $('.billeteraUser').fadeOut();
        $('#aside').toggle('slide');
        $('#aside').css('display', 'flex');
        btnClose();
    }
    
    else {
        $('.navBar').fadeOut();
        $('.billeteraUser').fadeOut();
        $('#aside').fadeOut();
        habilitarBotones();
    }
}

// ----------------------------------------------//
// --------------MODIFICAR HEADER--------------- //
// ----------------------------------------------//

function mostrarBilletera(){
    let billeteraTotal = obtenerArrayDeBilleteras();
    let elemento = $('.billeteraUser__balance__billetera--cantidad')
    let posicion;

    for(i=0; i<billeteraTotal.length; i++){
        posicion = billeteraTotal[i];
        if(!posicion.billeteraTotal){
            modificarElemento(elemento[i], `${posicion.simbolo}0,00`)
        } else{
            let cantidad = grandesCantidades(posicion.billeteraTotal)
            modificarElemento(elemento[i], `${posicion.simbolo}${cantidad}`)
        }
    }
}

function accionarOjo(){
    estado = obtenerStorage('mostrarBilletera')
    if(!estado){
        localStorage.setItem('mostrarBilletera', 'true')
    } else{
        localStorage.setItem('mostrarBilletera', 'false')
    }
    
    mostrarOcultar();
    $('#ojo').click(mostrarOcultar)
}

function mostrarOcultar (){
    estado = obtenerStorage('mostrarBilletera')
    let mensajeOculto = '**************';
    let ojo = $('#ojo');

    let billeteras = obtenerArrayDeBilleteras();
    let cantidades = textoCantidad(billeteras);

    if(!estado){
        $(ojo).attr('class', 'fas fa-eye');
        $('.billeteraUser__balance__billetera--cantidad').text(mensajeOculto);
        $('#conversion__ingreso--divisa').focus(()=>{
            $('#conversion__confirmacion--cantidad').hide()
        })
        
        localStorage.setItem('mostrarBilletera', 'true')
    } else{
        $(ojo).attr('class', 'fas fa-eye-slash');
        $('#pesos__cantidad').text(cantidades[0])
        $('#dolares__cantidad').text(cantidades[1])
        $('#euros__cantidad').text(cantidades[2])
        
        $('#conversion__ingreso--divisa').focus(()=>{
            $('#conversion__confirmacion--cantidad').show();
        })
        
        localStorage.setItem('mostrarBilletera', 'false')
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
    if(resultado){
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

function activarListaCripto () {
    if(window.outerWidth > 700 ){
        $('#aside').hover(()=>{
            $('.listado__nombreCripto').fadeIn(500)
            $('#aside').animate({width: '220px'});
        }, ()=>{
            $('#aside').animate({width: '50px'}, 500, ()=>{
                $('.listado__nombreCripto').hide()
            })
        });
    } else {
        $('.listado__nombreCripto').show()
    }
}


function accionarBtnLista(){
    for(let i=0; i<25; i++){
        let btn = $('.listado')
        $(btn[i]).click(()=>{
            btnLista(i)
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
    $('#confirmacionVenta').off('click');
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
    }).fail(()=>{
        modificarElemento('#conversion__titulo', `Ocurrio un error en la conexion, vuelva a intenarlo`)
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

                activacionBtnVenta();
            }
        })
    }).fail(()=>{
        modificarElemento('#conversion__titulo', `Ocurrio un error en la conexion, vuelva a intenarlo`)
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
    let carteraDivisas = obtenerStorage('divisas');
    moneda = moneda.toUpperCase();
    let objetoMoneda = objetoCompleto(moneda, carteraDivisas);
    let simbolo = objetoMoneda.simbolo;
    let nombre = primeraLetraMayuscula(cripto.id);
    let tk = (cripto.symbol).toUpperCase();
    let par = parDeConversion(cripto, moneda);
    let cambio = porcentajeDeCambio(cripto.price_change_percentage_24h);
    let mktCap = grandesCantidades(cripto.market_cap);
    let vol = grandesCantidades(cripto.total_volume);
    let totalSupply = grandesCantidades(cripto.circulating_supply);
    let maxSupply = grandesCantidades(cripto.max_supply);
    if(!maxSupply){
        maxSupply = '---'
    }
    let fecha = formateoFecha(cripto.ath_date);


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

    modificarElemento('#infoCripto__info--circSupply', `${totalSupply} ${tk}`);
    modificarElemento('#infoCripto__info--maxSupply', `${maxSupply} ${tk}`);
    modificarElemento('#infoCripto__valores--max', `${simbolo}${cripto.high_24h}`);
    modificarElemento('#infoCripto__valores--min', `${simbolo}${cripto.low_24h}`);
    modificarElemento('#infoCripto__valores--vol', `${simbolo}${vol}`);
    modificarElemento('#infoCripto__valores--ath', `${simbolo}${cripto.ath}`)
    modificarElemento('#infoCripto__valores--dateAth', fecha)
    
    let valorCambio = $('#infoCripto__cotizacion--valorCambio')
    valorCambio = valorCambio[0]
    let textoCambio = valorCambio.innerHTML;
    let valorTextoCambio = textoCambio.indexOf('-')

    if(valorTextoCambio == -1){
        $(valorCambio).css('color', '#14b10b')
    }

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
    let borrar = event.keyCode;

    if(borrar == 8 || borrar == 27){
        $('#conversion__ingreso--divisa').val('');
        valorATomar = 0
    } else{
        valorATomar = input + teclaPresionada;
    }

    conversion = conversionMonedacripto(valorATomar);
    modificarElemento('#conversion__convertido--valor', conversion);

}

function activacionEnter(event){
    if(event.which == 13){
        event.preventDefault();
        comprar();
    }
}

function activacionBtnVenta(){
    let criptoCliente = obtenerCriptoDeBilletera();
    if(!criptoCliente){
        $('#confirmacionVenta').attr('disabled', '');
        $('#confirmacionVenta').off('click')
    } else{
        $('#confirmacionVenta').removeAttr('disabled');
        accionarBtnVenta();
    }
}