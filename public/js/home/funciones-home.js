// ---------------------------------------------- //
// ---------------VALIDACIONES------------------- //
// ---------------------------------------------- //

function validarNombre(nombre){
    nombre = nombre.trim();
    patron = /[^a-zA-Z ]/g;

    validacion = patron.exec(nombre)
    if(!validacion){
        nombreCompleto = []
        nombre = nombre.split(' ');

        nombre.forEach((n)=>{
            n = primeraLetraMayuscula(n);
            nombreCompleto.push(n)
        })
        nombre = nombreCompleto.join(' ')
        return nombre
    } else{
        return false
    }
}

function validarId(id){
    id = id.trim();
    validacion = id.indexOf(' ');

    if(validacion == -1){
        return id
    } else{
        return false
    }
}

function validarPass(pass){
    if(pass.length >= 8){
        return pass
    } else{
        return false
    }
}