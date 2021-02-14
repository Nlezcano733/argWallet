function validarOperacionDR (mensaje){
    let nodoPadre, elemento, contenido;
    elemento = document.createElement('p');
    contenido = document.createTextNode(mensaje);
    elemento.appendChild(contenido);

    //nodoPadre.appendChild(elemento);
    elemento.setAttribute('id', 'confirmacion');
    
    nodoPadre = document.getElementsByClassName('dr');
    nodoPadre[0].append(elemento)

    setTimeout(() => {
        nodoPadre[0].removeChild(elemento)
    }, 2500);
}

function validacionNumeroReal (){
    valorInput = document.getElementById('deposito-retiro').value 
    if(valorInput <= 0 || valorInput == "" || valorInput == null){
        validarOperacionDR('Ingrese un numero real.')
        valorInput = "";
    } 
}
