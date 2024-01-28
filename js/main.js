// Primero declaro variables
let historialJSON = JSON.parse(localStorage.getItem("historialJSON"));
let dineroActualNum = 0;
//Éstas son las variables del monto actual
let opcionesMonedaClick = true
let dineroActualTipo = document.querySelector ("#dineroActualTipo");    //Símbolo del monto
let dineroActualTexto = document.querySelector ("#dineroActualTexto"); //Texto del monto
let opcionesMoneda = document.querySelector ("#opciones-moneda");   //El div de opciones
let opcionMoneda1 = document.querySelector("#opcionMoneda1");   //Opción peso
let opcionMoneda2 = document.querySelector("#opcionMoneda2");   //Opción dólar
let opcionMoneda3 = document.querySelector("#opcionMoneda3");   //Opción euro
let opcionMoneda4 = document.querySelector("#opcionMoneda4");   //Opción yen
//Variables del historial
let historialSection = document.querySelector("#historial-section");
let ubicacionMovimientos = document.querySelector("#ubicacion-movimientos")
//Variables del form de ingreso de dinero
let formIngreso = document.querySelector("#form-ingreso");  //Form general
let montoIngreso = document.querySelector("#monto-ingreso");    //Ingreso de dinero
let alertaIngreso = document.querySelector("#alerta-ingreso");  //alerta de ingresos
let alertaIngresoActiva = false;
//Variables del form de retiro de dinero
let formRetiro = document.querySelector("#form-retiro");  //Form general
let montoRetiro = document.querySelector("#monto-retiro");    //Ingreso de dinero
let alertaRetiro = document.querySelector("#alerta-retiro");  //alerta de ingresos
let alertaRetiroActiva = false;
//variables de la sección de transferencias
let opcionesTransf = true;
let alertaTransf = document.querySelector("#alerta-transf");
let alertaTransfActiva = false;
    //Opción CBU
let opcionCBU = document.querySelector("#opcion-cbu");
let formCBU = document.querySelector("#cbu");
let numeroCBU = document.querySelector("#numero-cbu");
let montoCBU = document.querySelector("#monto-cbu");
    //Opción Alias
let opcionAlias = document.querySelector("#opcion-alias");
let formAlias = document.querySelector("#alias");
let numeroAlias = document.querySelector("#numero-alias");
let montoAlias = document.querySelector("#monto-alias");
// Variables de calculadora
let logoCalculadora = document.querySelector("#calculadora-logo");
let calculadora = document.querySelector("#calculadora");
let alertaCalculadora = document.querySelector("#alerta-calculadora");
let calculadoraActiva = false;

//Declaro los arrays, objetos y clases
class movimiento {
    dineroM;
    transaccion;
    mensaje;
    constructor (dineroM, transaccion) {
        this.dineroM = dineroM;
        this.transaccion = transaccion;
        this.mensaje = `${transaccion} de $${dineroM}`;
    }
}
const historial = [];
class dinero {
    peso;
    dolar;
    euro;
    yen;
    constructor (peso) {
        this.peso = peso;
        this.dolar = this.peso / 1030;
        this.euro = this.peso / 888;
        this.yen = this.peso / 5;
    }
}

//Declaro funciones
function ingresoDineroJson(montoTemporal) {
    localStorage.removeItem("dineroJSON");
    localStorage.setItem("dineroJSON", montoTemporal);
}
function escribirHistorial (montoX, transaccionX) {
    let movimientoNuevo = new movimiento (montoX, transaccionX);
    historial.unshift (movimientoNuevo.mensaje);
    console.log(historial);
    ubicacionMovimientos.innerHTML = "";
    historial.forEach(movimientoIndividual => {
        let nuevoMov = document.createElement("h3");
        ubicacionMovimientos.append(nuevoMov);
        nuevoMov.innerText = `${movimientoIndividual}`;
    })
    localStorage.removeItem("historialJSON");
    localStorage.setItem("historialJSON", JSON.stringify(historial));
}
function potencia (tipo, num1, num2){
    if (tipo == "raiz"){
        num2 = num2 **-1;
    }
    resultadoCalculo = num1 **num2;
    return resultadoCalculo;
}
//Inicio
if(historialJSON !== null) {
    let dineroJSON = parseFloat(localStorage.getItem("dineroJSON"));
    dineroActualNum = dineroJSON;
    historialJSON.forEach(movimientoIndividual => {
        historial.push (movimientoIndividual);
        let nuevoMovJSON = document.createElement("h3");
        ubicacionMovimientos.append(nuevoMovJSON);
        nuevoMovJSON.innerText = `${movimientoIndividual}`;
    });
}
dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
let variableTemporal1 = new dinero (dineroActualNum);
dineroActualTipo.addEventListener ("click", ()=> {
    if (opcionesMonedaClick === true) {
        opcionesMoneda.classList.remove("none");
        opcionesMonedaClick = false;
    } else {
        opcionesMoneda.classList.add("none");
        opcionesMonedaClick = true;
    }
});

opcionMoneda1.addEventListener ("click", ()=> {
    dineroActualNum = variableTemporal1.peso;
    dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
    dineroActualTipo.innerText = "$";
});
opcionMoneda2.addEventListener ("click", ()=> {
    dineroActualNum = variableTemporal1.dolar;
    dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
    dineroActualTipo.innerText = "$USD";
    // console.log("hola");
});
opcionMoneda3.addEventListener ("click", ()=> {
    dineroActualNum = variableTemporal1.euro;
    dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
    dineroActualTipo.innerText = "€";
});
opcionMoneda4.addEventListener ("click", ()=> {
    dineroActualNum = variableTemporal1.yen;
    dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
    dineroActualTipo.innerText = "¥";
});
formIngreso.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal1 = parseFloat(montoIngreso.value);
    if (montoTemporal1 < 0) {
        if (alertaIngresoActiva == false) {
            alertaIngreso.classList.remove ("none");
            alertaIngresoActiva = true;
        }
        alertaIngreso.innerText = "¡No puedes retirar dinero aquí!";
    }else if (isNaN(montoTemporal1)) {
        if (alertaIngresoActiva == false) {
            alertaIngreso.classList.remove ("none");
            alertaIngresoActiva = true;
        }
        alertaIngreso.innerText = "Ese no es un número.";
    }else if (montoTemporal1 == 0) {
        if (alertaIngresoActiva = false) {
            alertaIngreso.classList.remove ("none");
            alertaIngresoActiva = true;
        }
        alertaIngreso.innerText = "No estás ingresando nada.";
    }else {
        if (alertaIngresoActiva == true) {
            alertaIngreso.classList.add("none");
            alertaIngresoActiva = false;
        }
        variableTemporal1 = new dinero (variableTemporal1.peso + montoTemporal1);
        switch (dineroActualTipo.innerText) {
            case "$":
                dineroActualTexto.innerText = `${variableTemporal1.peso.toFixed(2)}`;
                dineroActualNum = variableTemporal1.peso;
            break;
            case "$USD":
                dineroActualTexto.innerText = `${variableTemporal1.dolar.toFixed(2)}`;
                dineroActualNum = variableTemporal1.dolar;
            break;
            case "€":
                dineroActualTexto.innerText = `${variableTemporal1.euro.toFixed(2)}`;
                dineroActualNum = variableTemporal1.euro;
            break;
            case "¥":
                dineroActualTexto.innerText = `${variableTemporal1.yen.toFixed(2)}`;
                dineroActualNum = variableTemporal1.yen;
            break;
        }
        escribirHistorial (montoIngreso.value, "INGESO");
        ingresoDineroJson(variableTemporal1);
    }
    formIngreso.reset();
});
formRetiro.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal2 = parseFloat(montoRetiro.value);
    if (montoTemporal2 < 0) {
        if (alertaRetiroActiva == false) {
            alertaRetiro.classList.remove ("none");
            alertaRetiroActiva = true;
        }
        alertaRetiro.innerText = "¡No puedes ingresar dinero aquí!";
    }else if (isNaN(montoTemporal2)) {
        if (alertaRetiroActiva == false) {
            alertaRetiro.classList.remove ("none");
            alertaRetiroActiva = true;
        }
        alertaRetiro.innerText = "Ese no es un número.";
    }else if (montoTemporal2 == 0) {
        if (alertaRetiroActiva == false) {
            alertaRetiro.classList.remove ("none");
            alertaRetiroActiva = true;
        }
        alertaRetiro.innerText = "No estás retirando nada.";
    }else if (montoTemporal2 > variableTemporal1.peso){
        if (alertaRetiroActiva == false) {
            alertaRetiro.classList.remove ("none");
            alertaRetiroActiva = true;
        }
        alertaRetiro.innerText = "No puedes retirar más dinero del que tienes.";
    }else {
        if (alertaRetiroActiva == true) {
            alertaRetiro.classList.add("none");
            alertaRetiroActiva = false;
        }
        variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal2);
        switch (dineroActualTipo.innerText) {
            case "$":
                dineroActualTexto.innerText = `${variableTemporal1.peso.toFixed(2)}`;
                dineroActualNum = variableTemporal1.peso;
            break;
            case "$USD":
                dineroActualTexto.innerText = `${variableTemporal1.dolar.toFixed(2)}`;
                dineroActualNum = variableTemporal1.dolar;
            break;
            case "€":
                dineroActualTexto.innerText = `${variableTemporal1.euro.toFixed(2)}`;
                dineroActualNum = variableTemporal1.euro;
            break;
            case "¥":
                dineroActualTexto.innerText = `${variableTemporal1.yen.toFixed(2)}`;
                dineroActualNum = variableTemporal1.yen;
            break;
        }
        escribirHistorial (montoRetiro.value, "RETIRO");
        ingresoDineroJson(variableTemporal1);
    }
    formRetiro.reset();
});
opcionCBU.addEventListener ("click", () => {
    if (opcionesTransf == false) {
        opcionAlias.classList.remove ("button-color2");
        opcionAlias.classList.add ("button-color1");
        opcionCBU.classList.remove ("button-color1");
        opcionCBU.classList.add ("button-color2");
        formAlias.classList.add ("none");
        formCBU.classList.remove ("none");
        opcionesTransf =true;
    }
})
opcionAlias.addEventListener ("click", () => {
    if (opcionesTransf == true) {
        opcionAlias.classList.add ("button-color2");
        opcionAlias.classList.remove ("button-color1");
        opcionCBU.classList.add ("button-color1");
        opcionCBU.classList.remove ("button-color2");
        formAlias.classList.remove ("none");
        formCBU.classList.add ("none");
        opcionesTransf = false;
    }
})
formCBU.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal3 = parseFloat(montoCBU.value);
    if (montoTemporal3 == 0) {
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No estás transfiriendo nada.";
    } else if (montoTemporal3 < 0) {
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No puedes transferir un monto negativo.";
    }else if (montoTemporal3 > dineroActualNum){
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No puedes transferir más dinero del que tienes.";
    }else {
        if (alertaTransfActiva == true) {
            alertaTransf.classList.add("none");
            alertaTransfActiva = false;
        }
        variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal3);
        switch (dineroActualTipo.innerText) {
            case "$":
                dineroActualTexto.innerText = `${variableTemporal1.peso.toFixed(2)}`;
                dineroActualNum = variableTemporal1.peso;
            break;
            case "$USD":
                dineroActualTexto.innerText = `${variableTemporal1.dolar.toFixed(2)}`;
                dineroActualNum = variableTemporal1.dolar;
            break;
            case "€":
                dineroActualTexto.innerText = `${variableTemporal1.euro.toFixed(2)}`;
                dineroActualNum = variableTemporal1.euro;
            break;
            case "¥":
                dineroActualTexto.innerText = `${variableTemporal1.yen.toFixed(2)}`;
                dineroActualNum = variableTemporal1.yen;
            break;
        }
        escribirHistorial (montoTemporal3, `TRANSFERENCIA a ${numeroCBU.value}`);
        ingresoDineroJson(variableTemporal1);
    }
    formCBU.reset();
})
formAlias.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal4 = parseFloat(montoAlias.value);
    if (montoTemporal4 == 0) {
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No estás transfiriendo nada.";
    } else if (montoTemporal4 < 0) {
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No puedes transferir un monto negativo.";
    }else if (montoTemporal4 > dineroActualNum){
        if (alertaTransfActiva == false) {
            alertaTransf.classList.remove ("none");
            alertaTransfActiva = true;
        }
        alertaTransf.innerText = "No puedes transferir más dinero del que tienes.";
    }else {
        if (alertaTransfActiva == true) {
            alertaTransf.classList.add("none");
            alertaTransfActiva = false;
        }
        variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal4);
        switch (dineroActualTipo.innerText) {
            case "$":
                dineroActualTexto.innerText = `${variableTemporal1.peso.toFixed(2)}`;
                dineroActualNum = variableTemporal1.peso;
            break;
            case "$USD":
                dineroActualTexto.innerText = `${variableTemporal1.dolar.toFixed(2)}`;
                dineroActualNum = variableTemporal1.dolar;
            break;
            case "€":
                dineroActualTexto.innerText = `${variableTemporal1.euro.toFixed(2)}`;
                dineroActualNum = variableTemporal1.euro;
            break;
            case "¥":
                dineroActualTexto.innerText = `${variableTemporal1.yen.toFixed(2)}`;
                dineroActualNum = variableTemporal1.yen;
            break;
        }
        escribirHistorial (montoTemporal4, `TRANSFERENCIA a ${numeroAlias.value}`);
        ingresoDineroJson(variableTemporal1);
    }
    formAlias.reset();
})
logoCalculadora.addEventListener ("click", () => {
    if (calculadoraActiva == false) {
        calculadora.classList.remove("none");
        calculadoraActiva = true;
    } else {
        calculadora.classList.add("none");
    }
    alertaCalculadora.innerText = "La función CALCULADORA se habilitará en un futuro.";
})
