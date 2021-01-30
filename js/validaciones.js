// Validacion de ingreso de datos 
function validacionIngresoString(ingreso){
    let nombreOk;
    if(ingreso == null || ingreso == ""){
        let validacionEntrada = false;

        while(validacionEntrada == false){
            ingreso = prompt('Por favor complete la casilla con su nombre.');
            if (ingreso != null && ingreso != ""){
                validacionEntrada = true;
            }
        }  
    }
    nombreOk = ingreso.trim();
    return nombreOk;
}

//validacion de dinero real
function validacionIngresoDinero (ingreso){;
    let confirmacion = false;

    if(ingreso <= 0 || ingreso == null){
        while(confirmacion == false){
            alert("Por favor, ingrese una suma de dinero Real");
            ingreso = parseFloat(prompt("Ingrese la cantidad de dinero que quiera ingresar en su cuenta"));
            if (ingreso > 0){
                confirmacion = true;
            }
        }
    }

    return ingreso;
}

// Validar que alcance el dinero de cuenta para la compra de criptos
function validacionDisponibilidad(dineroDisponible, dineroParaCompra){
    if(dineroDisponible < dineroParaCompra){
        while (dineroDisponible < dineroParaCompra || dineroDisponible == null){
            alert('Usted no dispone de fondos suficientes')
            dineroParaCompra = parseInt(prompt('Ingrese cantidad de dinero para compra'));
            if(dineroDisponible >= dineroParaCompra){
                return dineroParaCompra;
            }
        }
    } else{
        return dineroParaCompra;
    }

}