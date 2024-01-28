// Declaro variables
// let dinero = 0;
let opcionTransferencia = 0;
let transferencia = 1;
let i=0
let salir = false;
let cero = "Ingresa 0 para salir.";
let s = `Ingresa S para salir.`;
//Declaro los arrays, objetos y clases
// class movimiento {
//     dineroM;
//     transaccion;
//     mensaje;
//     constructor (dineroM, transaccion) {
//         this.dineroM = dineroM;
//         this.transaccion = transaccion;
//         this.mensaje = `${transaccion} de ${dineroM}`;
//     }
// }
const historial = [];
//Declaro funciones
function potencia (tipo, num1, num2){
    if (tipo == "raiz"){
        num2 = num2 **-1;
    }
    resultadoCalculo = num1 **num2;
    return resultadoCalculo;
}
function moneda (monedaNombre) {
    let opcionMoneda = prompt(`¿Cuánto está el ${monedaNombre} hoy?
    (${s})`).toLowerCase();
    if (opcionMoneda == "s") {
        opcionConv = 0;
    }else {
        let moneda = parseFloat(opcionMoneda);
        let resultadoConv = dinero / moneda;
        if (monedaNombre == "dolares") {
            alert (`Tu dinero en dólares serían $${resultadoConv}USD`)
        } else if (monedaNombre == "euro") {
            alert (`Tu dinero en euros serían €${resultadoConv}`)
        } else if (monedaNombre == "Yen") {
            alert (`Tu dinero en yenes serían ¥${resultadoConv}`)
        }
    }
}
function multip (opcionx, numM1, numM2) {
    if (opcionx == "dividir") {
        numM2 = numM2 **-1;
    }
    let resultadoM = numM1 * numM2
    return resultadoM;
} 
function numeroCalculo (num1, num2) {
    resultadoCalculo = num1 + num2;
    return resultadoCalculo;
}
function sinDinero (quiero, puedo, accion) {
    if (quiero > puedo){
        alert(`¡No puedes ${accion} mas dinero del que tienes!`);
    }
}
// Inicio
alert (`Bienvenido a su cartera personal!`);
while(salir!=true) {
    switch(i) {
        case 0:
            i = parseInt(prompt (`Elija una opción:
            0. Salir
            1. Ingresar dinero 
            2. Retirar dinero
            3. Siguiente-->`));
            if (i==0){
                salir=true;
            }
        break;
        case 1:
            let ingreso = 1;
            while (ingreso != 0) {
                ingreso = parseFloat(prompt(`Saldo actual: $${dinero}
                ¿Cuánto quieres ingresar?
                (${cero})`));
                if (ingreso < 0) {
                    alert (`¡No puedes retirar dinero aquí!`)
                }else if (ingreso > 0){
                    dinero = numeroCalculo(dinero, ingreso);
                    let movimientoNuevo = new movimiento (ingreso, "INGRESO");
                    let mensajeFinal = movimientoNuevo.mensaje;
                    historial.unshift (mensajeFinal);
                }
            }
            if (ingreso==0) {
                i = ingreso;
            }
        break;
        case 2:
            let egreso = 1;
            while (egreso != 0) {
                egreso = parseFloat(prompt(`Saldo actual: $${dinero}
                ¿Cuánto quieres retirar?
                (${cero})`));
                if (egreso < 0) {
                    alert (`ERROR. No puedes retirar números negativos.`)
                }else if (egreso < dinero){
                    dinero = numeroCalculo (dinero, -egreso);
                    let movimientoNuevo = new movimiento (egreso, "RETIRO");
                    let mensajeFinal = movimientoNuevo.mensaje;
                    historial.unshift (mensajeFinal);
                } else sinDinero(egreso, dinero, "retirar");
            }
            if (egreso==0) {
                i = egreso;
            }
        break;
        case 3:
            i = parseInt(prompt (`Elija una opción:
            0. <--Atrás
            4. Transferir dinero
            5. Historial de transacciones
            6. Calculadora personal 
            7. Siguiente-->`));
        break;
        case 4:
            let salirtransf = false;
            while (salirtransf!= true) {
                switch(opcionTransferencia) {
                    case 0:
                        opcionTransferencia = parseInt(prompt(`Elija una opción
                        1. Transferir por CBU
                        2. Transferir por alias
                        0. Salir`));
                        if (opcionTransferencia==0){
                            salirtransf=true;
                        }
                    break;
                    case 1:
                        let cbu = prompt(`Ingrese CBU
                        (${cero})`);
                        if (cbu == 0){
                            opcionTransferencia = 0;
                        }else {
                            transferencia = prompt(`Saldo actual: $${dinero}
                            ¿Cuánto quieres enviar a esta persona?
                            (${cero})`);
                            if (transferencia == 0){
                                opcionTransferencia = 0;
                            }else if (transferencia < dinero) {
                                numeroCalculo(dinero, -transferencia);
                                let movimientoNuevo = new movimiento (transferencia, "TRANSFERENCIA");
                                let mensajeFinal = movimientoNuevo.mensaje;
                                historial.unshift (mensajeFinal);
                                alert (`Has transferido $${transferencia} a la persona con CBU:${cbu}`);
                                opcionTransferencia = 0;
                            } else sinDinero(transferencia, dinero, "enviar");
                        }
                    break;
                    case 2:
                        let alias = prompt(`Ingrese alias
                        (${cero})`);
                        if (alias == 0) {
                            opcionTransferencia = 0;
                        }else {
                            transferencia = prompt(`Saldo actual: $${dinero}
                            ¿Cuánto quieres enviar a esta persona?
                            (${cero})`);
                            if (transferencia == 0){
                                opcionTransferencia = 0;
                            }else if (transferencia < dinero) {
                                numeroCalculo(dinero, -transferencia);
                                let movimientoNuevo = new movimiento (transferencia, "TRANSFERENCIA");
                                let mensajeFinal = movimientoNuevo.mensaje;
                                historial.unshift (mensajeFinal);
                                console.log (movimientoNuevo.mensaje);
                                alert (`Has transferido $${transferencia} a la persona con alias: ${alias}`);
                            }else sinDinero(transferencia, dinero, `enviar`);
                        }
                        opcionTransferencia = 0;
                    break;
                    default:
                        alert(`Esa no es una opcion. Intente de nuevo.`)
                        opcionTransferencia = 0;
                    break;
                }
            }
            if (salirtransf==true){
                i=3;
            }
        break;
        case 5:
            let salir = false;
            alert("ALERTA. Con los elementos dados hasta el momento, cada movimiento del historial va a ser dado individualmente en un alert cada uno. DESDE YA MUCHAS GRACIAS")
            while (salir == false) {
                historial.forEach(movimiento => alert(movimiento));
                salirHist = parseFloat(prompt("Ingrese 0 si quiere salir, sino toque cualquier tecla"));
                if(salirHist == 0) {
                    salir = true;
                }else {
                    salir = false;
                }
            }
            alert ("¡Gracias por ver nuestro historial!");
        break;
        case 6:
            let salirCalc = false;
            let opcion=0;
            let resultado=0;
            while(salirCalc != true) {
                switch(opcion){
                    case 0:
                        opcion = parseFloat(prompt(`Ingrese una opción:
            0. Salir
            1. Suma
            2. Resta
            3. Multiplicar
            4. Dividir
            5. Potencia
            6. Raíz`));
                        if (opcion == 0) {
                            salirCalc = true;
                        }
                    break;
                    case 1:
                        let opcionSuma = prompt(`¿Cuántos números estás sumando?
                        (${s})`).toLowerCase();
                        if (opcionSuma == `s`){
                            opcion = 0;
                        }else{
                            let cantidadSuma = parseFloat(opcionSuma);
                            for(let j=1; j<=cantidadSuma; j++){
                                let num = parseFloat(prompt(`¿Cuál es el ${j}º número?`))
                                resultado = numeroCalculo(resultado, num);
                            }
                            alert(`El resultado es: ${resultado}`)
                            resultado=0;
                            opcion = parseInt(prompt(`Si quieres hacer otra suma, ingresa 1.
            Si quieres salir al menú de cálculos, ingresa 0.`))
                        }
                    break;
                    case 2:
                        let salirResta = false
                        let numResta2 = 1;
                        let numResta1 = prompt(`Ingrese el primer número.
                        (Ingresa S para salir)`).toLowerCase();
                        if (numResta1 == `s`) {
                            opcion = 0;
                        }else {
                            resultado = parseFloat(numResta1);
                            while (salirResta != true) {
                                numResta2 = prompt(`Resultado actual: ${resultado}
                                ¿Cuánto estás restando?
                                (${s})`).toLowerCase();
                                if (numResta2 == `s`) {
                                    opcion = 0;
                                    salirResta = true;
                                }else {
                                    resultado = numeroCalculo(resultado, -numResta2);
                                }
                            }
                        }
                        resultado = 0
                    break;
                    case 3:
                        let salirM = false;
                        let num1M = prompt(`Ingrese el primer número.
                        (${s})`).toLowerCase();
                        if (num1M == `s`) {
                            salirM = true;
                        }else {
                            resultado = parseFloat(num1M);
                            while (salirM != true) {
                                num2M = prompt(`Resultado actual: ${resultado}
                                ¿Por cuánto quieres multiplicar este número?
                                (${s})`).toLowerCase();
                                if (num2M == "s") {
                                    salirM = true;
                                }else {
                                    resultado = multip ("multiplicar", resultado, num2M);
                                }
                            }
                        }
                        resultado = 0;
                        opcion = 0;
                    break;
                    case 4:
                        let salirD = false;
                        let num1D = prompt(`Ingrese el primer número.
                        (${s})`).toLowerCase();
                        if (num1D == `s`) {
                            salirD = true;
                        }else {
                            resultado = parseFloat(num1D);
                            while (salirD != true) {
                                num2D = prompt(`Resultado actual: ${resultado}
                                ¿Por cuánto quieres dividir este número?
                                (${s})`).toLowerCase();
                                if (num2D == "s") {
                                    salirD = true;
                                }else if (num2D == 0){
                                    alert(`ERROR. No puedes dividir por 0`)
                                }else{
                                    resultado = multip ("dividir", resultado, num2D);
                                }
                            }
                        }
                        resultado = 0;
                        opcion = 0;
                    break;
                    case 5:
                        let opcionPotencia = prompt(`Ingrese la base.
                    (${s})`).toLowerCase();
                        if (opcionPotencia == "s") {
                            opcion = 0;
                        }else {
                            let numBase = parseFloat(opcionPotencia);
                            let numExp = parseFloat(prompt(`Ingrese el exponente`));
                            if (numBase == 0 && numExp == 0) {
                                alert (`ERROR. Eso es una indeterminación matemática`)
                            }else {
                                alert(`El resultado es ${potencia("potencia", numBase, numExp)}`);
                            }
                        }
                    break;
                    case 6:
                        let opcionRaiz = prompt(`Ingrese el radicando.
                    (${s})`).toLowerCase();
                        if (opcionRaiz == "s") {
                            opcion = 0;
                        }else if (opcionRaiz < 0){
                            alert (`ERROR. Sólo se trabaja en el campo de los reales.`)
                        }else{
                            let numRadic = parseFloat(opcionRaiz);
                            let numIndice = parseFloat(prompt(`Ingrese el índice`));
                            if (numIndice == 0) {
                                alert (`ERROR. Eso es una indeterminación matemática`)
                            }else {
                                alert(`El resultado es ${potencia("raiz", numRadic, numIndice)}`);
                            }
                        }
                    break;
                    default:
                        alert(`Esa no es una opción. Intenta de nuevo.`)
                        opcion = 0;
                    break;
                }
            }
            if (salirCalc == true) {
                i = 3;
            }
        break;
        case 7:
            i = parseInt(prompt (`Elija una opción:
            0. <--Atrás
            8. Conversor de moneda`));
            if (i== 0) {
                i = 3;
            }
        break;
        case 8:
            let opcionConv = 0;
            let salirConv = false;
            while (salirConv != true) {
                switch (opcionConv) {
                    case 0: opcionConv = parseFloat(prompt(`¿A qué moneda estás realizando la conversion?
                    1. Dólar
                    2. Euro
                    3. Yen
                    ${cero}`))
                    if (opcionConv == 0) {
                        salirConv = true;
                    }
                    break;
                    case 1:
                        moneda ("dolar");
                        opcionConv = 0;
                    break
                    case 2:
                        moneda ("euro");
                        opcionConv = 0;
                    break;
                    case 3:
                        moneda ("yen");
                        opcionConv = 0;
                    break
                    default:
                        alert (`ERROR. Esa no es una opcion.`)
                        opcionConv = 0;
                    break;
                }
            }
            alert(`¡Gracias por usar el conversor de moneda!`)
            i = 6;
        break;
        default:
            alert(`Esa no es una opción. Intenta de nuevo`)
            i = 0;
        break;
    }
}
