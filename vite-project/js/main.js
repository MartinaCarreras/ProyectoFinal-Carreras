//Importo bootstrap y sweetalert
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Swal from 'sweetalert2';
// Primero declaro variables
let historialJSON = JSON.parse(localStorage.getItem("historialJSON"));
let dineroJSON = localStorage.getItem("dineroJSON");
let dineroActualNum = 0
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
    monedaActualizada() {
        fetch("https://dolarapi.com/v1/dolares/oficial")
            .then(resp => resp.json())
            .then(data => this.dolar = this.peso / data.compra);
        fetch("https://dolarapi.com/v1/cotizaciones/eur")
            .then(resp => resp.json())
            .then (data => this.euro = this.peso / data);
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
    historialJSON.forEach(movimientoIndividual => {
        historial.push (movimientoIndividual);
        let nuevoMovJSON = document.createElement("h3");
        ubicacionMovimientos.append(nuevoMovJSON);
        nuevoMovJSON.innerText = `${movimientoIndividual}`;
    });
}
if(dineroJSON !== null) {
    dineroActualNum = parseFloat(dineroJSON);
}
dineroActualTexto.innerText = `${dineroActualNum.toFixed(2)}`;
let variableTemporal1 = new dinero (dineroActualNum);
variableTemporal1.monedaActualizada();
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
        Swal.fire({
            title: "Error",
            text:"¡No puedes retirar dinero aquí!",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (isNaN(montoTemporal1)) {
        Swal.fire({
            title: "Error",
            text:"Ese no es un número.",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (montoTemporal1 == 0) {
        Swal.fire({
            title: "Error",
            text:"No estás ingresando nada.",
            icon: "error",
            showConfirmButton: true,
        })
    }else {
        variableTemporal1 = new dinero (variableTemporal1.peso + montoTemporal1);
        variableTemporal1.monedaActualizada();
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
        Swal.fire ({
            icon: "success",
            text: `Has ingresado $${montoTemporal1}.`,
            showCloseButton: true,
        })
        escribirHistorial (montoIngreso.value, "INGESO");
        ingresoDineroJson(variableTemporal1.peso);
    }
    formIngreso.reset();
});
formRetiro.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal2 = parseFloat(montoRetiro.value);
    if (montoTemporal2 < 0) {
        Swal.fire({
            title: "Error",
            text:"¡No puedes ingresar dinero aquí!",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (isNaN(montoTemporal2)) {
        Swal.fire({
            title: "Error",
            text:"Ese no es un número.",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (montoTemporal2 == 0) {
        Swal.fire({
            title: "Error",
            text:"No estás retirando nada.",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (montoTemporal2 > variableTemporal1.peso){
        Swal.fire({
            title: "Error",
            text:"No puedes retirar más dinero del que tienes.",
            icon: "error",
            showConfirmButton: true,
        })
    }else {
        if (alertaRetiroActiva == true) {
            alertaRetiro.classList.add("none");
            alertaRetiroActiva = false;
        }
        variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal2);
        variableTemporal1.monedaActualizada();
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
        Swal.fire ({
            icon: "success",
            text: `Has retirado $${montoTemporal2}.`,
            showCloseButton: true,
        })
        escribirHistorial (montoRetiro.value, "RETIRO");
        ingresoDineroJson(variableTemporal1.peso);
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
    if (numeroCBU.value.length !== 11) {
        Swal.fire ({
            title: "Error",
            text:"El número de cbu debe ser de 11 dígitos",
            showConfirmButton: true,
        })
    }else {
        let montoTemporal3 = parseFloat(montoCBU.value);
        if (montoTemporal3 == 0) {
            Swal.fire({
                title: "Error",
                text:"No estás transfiriendo nada.",
                icon: "error",
                showConfirmButton: true,
            })
        } else if (montoTemporal3 < 0) {
            Swal.fire({
                title: "Error",
                text:"No puedes transferir un monto negativo",
                icon: "error",
                showConfirmButton: true,
            })
        }else if (montoTemporal3 > dineroActualNum){
            Swal.fire({
                title: "Error",
                text:"No puedes transferir más dinero del que tienes.",
                icon: "error",
                showConfirmButton: true,
            })
        }else {
            Swal.fire ({
                icon: "question",
                title: "¿?",
                text:`Quieres transferir $${montoTemporal3} a la persona con CBU:${montoCBU.value}`,
                showConfirmButton: true,
                showCancelButton: true,
            }).then (respuesta =>{
                if (respuesta.isConfirmed) {
                    variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal3);
                    variableTemporal1.monedaActualizada();
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
                    ingresoDineroJson(variableTemporal1.peso);
                }else {
                    formCBU.reset();
                }
            })
        }
    }
    formCBU.reset();
})
formAlias.addEventListener ("submit", (event) => {
    event.preventDefault();
    let montoTemporal4 = parseFloat(montoAlias.value);
    if (montoTemporal4 == 0) {
        Swal.fire({
            title: "Error",
            text:"No estás transfiriendo nada.",
            icon: "error",
            showConfirmButton: true,
        })
    } else if (montoTemporal4 < 0) {
        Swal.fire({
            title: "Error",
            text:"No puedes transferir un monto negativo",
            icon: "error",
            showConfirmButton: true,
        })
    }else if (montoTemporal4 > dineroActualNum){
        Swal.fire({
            title: "Error",
            text:"No puedes transferir más dinero del que tienes.",
            icon: "error",
            showConfirmButton: true,
        })
    }else {
        Swal.fire ({
            icon: "question",
            title: "¿?",
            text:`Quieres transferir $${montoTemporal4} a la persona con Alias:${montoAlias.value}`,
            showConfirmButton: true,
            showCancelButton: true,
            backdrop:`
            url("../images/tonton-chick.gif")
            left bottom
            no-repeat
            `
        }).then(respuesta => {
            if (respuesta.isConfirmed) {
                variableTemporal1 = new dinero (variableTemporal1.peso - montoTemporal4);
                variableTemporal1.monedaActualizada();
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
                ingresoDineroJson(variableTemporal1.peso);
            }
        })
    }
    formAlias.reset();
})
logoCalculadora.addEventListener ("click", () => {
    Swal.fire ({
        icon: "info",
        text: "La función calculadora será habilitada en un futuro.",
    })
    // if (calculadoraActiva == false) {
    //     calculadora.classList.remove("none");
    //     calculadoraActiva = true;
    // } else {
    //     calculadora.classList.add("none");
    // }
    // alertaCalculadora.innerText = "La función CALCULADORA se habilitará en un futuro.";
})
