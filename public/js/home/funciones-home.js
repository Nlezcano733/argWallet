// ---------------------------------------------- //
// ---------------VALIDACIONES------------------- //
// ---------------------------------------------- //
function validarEnterUsuario(){
    $('#idUsuario').keydown(e => ingresoUserTecla(e, 'ingreso'));
    $('#passUsuario').keydown(e => ingresoUserTecla(e, 'ingreso'));
    $('#nuevoNombre').keydown(e => ingresoUserTecla(e, 'ingreso'));
    $('#nuevoId').keydown(e => ingresoUserTecla(e));
    $('#nuevoPass').keydown(e => ingresoUserTecla(e));
}

function ingresoUserTecla (e, uso){
    console.log(e)
    if(e.which === 13){
       uso === 'ingreso' ? ingresarUsuario() : crearUsuario()
    }
}

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