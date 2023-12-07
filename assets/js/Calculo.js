function calcularPagoMensual() {
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, '')) || 0;
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', '')) || 0;
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value) || 0;

    //Valida que los campos de entrada no estén vacíos
    if (isNaN(montoSolicitado) || isNaN(tasaInteresAnual) || isNaN(plazoEnAnnos)) {
        montoSolicitado = 0;
        tasaInteresAnual = 0;
        plazoEnAnnos = 0;
    }
    //Instrucciones para calcular el pago mensual
    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * (tasaInteresMensual / 100) * Math.pow((1 + (tasaInteresMensual / 100)), plazoEnMeses) / (Math.pow((1 + (tasaInteresMensual / 100)), plazoEnMeses) - 1));

    document.getElementById('PagoMensual').value = pagoMensual.toFixed(2);
    return pagoMensual;
}

function calcularSalarioMinimo() {
    let pagoMensual = calcularPagoMensual();
    let salarioMinimo = pagoMensual / 0.40;
    document.getElementById('SalarioMinimo').value = salarioMinimo.toFixed(2);
    return salarioMinimo;
}

function mostrarEtiquetas() {
    // Obtener los valores de los campos de entrada y convertirlos a números
    let salario = parseFloat(document.getElementById('inputSalarioNeto').value.replace(/[^0-9.]/g, '')) || 0;
    let valorVivienda = parseFloat(document.getElementById('inputValorVivienda').value.replace(/[^0-9.]/g, '')) || 0;
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, '')) || 0;
    let edadCliente = calcularEdad();
    let porcentajeFinanciado;
    let mensaje1;
    let mensaje2;


    if (isNaN(salario)) {
        salario = 0;
    }

    if (isNaN(valorVivienda)) {
        valorVivienda = 0;
    }
    if (salario >= calcularSalarioMinimo()) {
        mensaje1 = "Salario suficiente para el crédito";
    } else {
        mensaje1 = "Salario insuficiente para el crédito";
    }
    if (edadCliente >= 22 && edadCliente < 55) {
        mensaje2 = "Edad valida para recibir el crédito";
    } else {
        mensaje2 = "Edad inválida para recibir el crédito";
    }
    porcentajeFinanciado = valorVivienda / montoSolicitado;
    cargarDatosDesdeLocalStorage();

    document.getElementById('salarioSuficiente').textContent = mensaje1;
    document.getElementById('edadSuficiente').textContent = mensaje2;
    document.getElementById('porcentajeFinanciado').textContent = "Porcentaje a financiar: " + porcentajeFinanciado + "%";

    return porcentajeFinanciado;
}

function mostrarTabla() {
    let correoElectronico = document.getElementById('inputEmail').value;
    let nombre = document.getElementById('inputNombre').value;
    let fechaNacimiento = document.getElementById('inputFechaNacimiento').value;
    let salarioNeto = parseFloat(document.getElementById('inputSalarioNeto').value.replace(/[^0-9.]/g, ''));
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', ''));
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value);
    let valorVivienda = parseFloat(document.getElementById('inputValorVivienda').value.replace(/[^0-9.]/g, ''));
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, ''));
    let porcentajeFinanciado = mostrarEtiquetas();
    let ingresoRequerido = calcularSalarioMinimo();

    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses));

    let tablaHTML = '<h3>Credito Happy Earth</h3>';
    tablaHTML += '<table border="1">'
    tablaHTML += `<tr><td>Correo Electrónico</td><td>${correoElectronico}</td></tr>`
    tablaHTML += `<tr><td>Nombre</td><td>${nombre}</td></tr>`
    tablaHTML += `<tr><td>Fecha de Nacimiento</td><td>${fechaNacimiento}</td></tr>`
    tablaHTML += `<tr><td>Salario Neto Mensual</td><td>${salarioNeto}</td></tr>`
    tablaHTML += `<tr><td>Valor de la Vivienda</td><td>${valorVivienda}</td></tr>`
    tablaHTML += `<tr><td>Monto a Solicitar</td><td>${montoSolicitado}</td></tr>`
    tablaHTML += `<tr><td>Plazo en Años</td><td>${plazoEnAnnos}</td></tr>`
    tablaHTML += `<tr><td>Tasa de Interés Anual</td><td>${tasaInteresAnual}%</td></tr>`
    tablaHTML += `<tr><td>Cuota</td><td>${pagoMensual.toFixed(2)}</td></tr>`
    tablaHTML += `<tr><td>% a Financiar</td><td>${porcentajeFinanciado.toFixed(2)}%</td></tr>`
    tablaHTML += `<tr><td>Ingreso neto Requerido</td><td>${ingresoRequerido.toFixed(2)}</td></tr>`
    tablaHTML += '</table>';
    document.getElementById('tablaResultados').innerHTML = tablaHTML;
}

function mostrarProyeccion() {
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, ''));
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', ''));
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value);

    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses));

    let tablaProyeccionHTML = '<h2>Proyección de Pagos</h2>';
    tablaProyeccionHTML += '<table border="1">';
    tablaProyeccionHTML += '<tr><th>Mes</th><th>Pago Mensual</th><th>Intereses</th><th>Amortización</th><th>Saldo por Mes</th></tr>';

    let saldoMesAnterior = montoSolicitado;

    for (let mes = 1; mes <= plazoEnMeses; mes++) {
        let intereses = vInteres(tasaInteresMensual, mes, pagoMensual, montoSolicitado);
        let amortizacion = pagoMensual - intereses;
        let saldoMes = saldoMesAnterior - amortizacion;
        saldoMesAnterior = saldoMes;

        // Agregar la fila a la tabla de proyección
        tablaProyeccionHTML += `<tr><td>${mes}</td><td>${pagoMensual.toFixed(2)}</td><td>${intereses.toFixed(2)}</td><td>${amortizacion.toFixed(2)}</td><td>${saldoMes.toFixed(2)}</td></tr>`;
    }

    tablaProyeccionHTML += '</table>';
    document.getElementById('tablaProyeccion').innerHTML = tablaProyeccionHTML;
}


function calcularEdad() {
    let fechaNacimiento = document.getElementById('inputFechaNacimiento').value;
    let OfechaNacimiento= new Date(fechaNacimiento);
    let fechaActual = new Date();
    let diferencia = fechaActual - OfechaNacimiento;
    let edad = Math.floor(diferencia / (365.25 * 24 * 60 * 60 * 1000));
    return edad;
}
function vInteres(tasaMensual, mes, pagoMensual, montoSolicitado){
    var vInteres = 0;
    var amortiza = montoSolicitado;

    for (var i = 1; i <= mes; i++) {
        vInteres = (amortiza * (tasaMensual / 100));
        amortiza = amortiza - (pagoMensual - vInteres);
        
    }

    return vInteres;
}

function cargarDatosDesdeLocalStorage() {
    let inputEmail = document.getElementById('inputEmail');
    let inputNombre = document.getElementById('inputNombre');
    let inputFechaNacimiento = document.getElementById('inputFechaNacimiento');
    let inputSalarioNeto = document.getElementById('inputSalarioNeto');
    let inputTasaInteres = document.getElementById('inputTasaInteres');
    let inputPlazo = document.getElementById('inputPlazo');
    let inputValorVivienda = document.getElementById('inputValorVivienda');
    let inputMontoSolicitado = document.getElementById('inputMontoSolicitado');
  
    inputEmail.value = localStorage.getItem('inputEmail') || '';
    inputNombre.value = localStorage.getItem('inputNombre') || '';
    inputFechaNacimiento.value = localStorage.getItem('inputFechaNacimiento') || '';
    inputSalarioNeto.value = localStorage.getItem('inputSalarioNeto') || '';
    inputTasaInteres.value = localStorage.getItem('inputTasaInteres') || '7.10%';
    inputPlazo.value = localStorage.getItem('inputPlazo') || '';
    inputValorVivienda.value = localStorage.getItem('inputValorVivienda') || '';
    inputMontoSolicitado.value = localStorage.getItem('inputMontoSolicitado') || '';
  
    inputEmail.addEventListener('input', function () {
      localStorage.setItem('inputEmail', inputEmail.value);
    });
  
    inputNombre.addEventListener('input', function () {
      localStorage.setItem('inputNombre', inputNombre.value);
    });
  
    inputFechaNacimiento.addEventListener('input', function () {
      localStorage.setItem('inputFechaNacimiento', inputFechaNacimiento.value);
    });
  
    inputSalarioNeto.addEventListener('input', function () {
      localStorage.setItem('inputSalarioNeto', inputSalarioNeto.value);
    });
  
    inputTasaInteres.addEventListener('input', function () {
      localStorage.setItem('inputTasaInteres', inputTasaInteres.value);
    });
  
    inputPlazo.addEventListener('input', function () {
      localStorage.setItem('inputPlazo', inputPlazo.value);
    });
  
    inputValorVivienda.addEventListener('input', function () {
      localStorage.setItem('inputValorVivienda', inputValorVivienda.value);
    });
  
    inputMontoSolicitado.addEventListener('input', function () {
      localStorage.setItem('inputMontoSolicitado', inputMontoSolicitado.value);
    });
  }
  document.addEventListener('DOMContentLoaded', cargarDatosDesdeLocalStorage);

$(document).ready(function(){
    $("#inputPlazo").on("input", function(){
        var valorActual = $(this).val();
        $("#valorPlazo").text(valorActual);
    });
});