// // Validacion de ingreso de datos 
// function validacionIngresoString(ingreso){
//     let nombreOk;
//     if(ingreso == null || ingreso == ""){
//         let validacionEntrada = false;

//         while(validacionEntrada == false){
//             ingreso = prompt('Por favor complete la casilla con su nombre.');
//             if (ingreso != null && ingreso != ""){
//                 validacionEntrada = true;
//             }
//         }  
//     }
//     nombreOk = ingreso.trim();
//     return nombreOk;
// }


// Validar que alcance el dinero de cuenta para la compra de criptos
function validacionDisponibilidad(dineroDisponible, dineroParaRestar){
    if(dineroDisponible < dineroParaRestar){
        while (dineroDisponible < dineroParaCompra || dineroDisponible == null){
            alert('Usted no dispone de fondos suficientes')
            dineroParaCompra = parseInt(prompt('Ingrese cantidad de dinero para compra'));
            if(dineroDisponible >= dineroParaRestar){
                return dineroParaRestar;
            }
        }
    } else{
        return dineroParaRestar;
    }
}



