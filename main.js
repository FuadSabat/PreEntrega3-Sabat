// Calculadora de préstamos:

// Permite a los usuarios calcular el valor de cuotas de un préstamo ingresando el monto y la tasa de interés.
// Muestra los resultados en el DOM con un desglose del pago de cada cuota.
// Usa localStorage para guardar simulaciones anteriores.

// Evento para capturar el formulario al enviar
document
  .getElementById("loanForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Capturar valores del formulario
    const monto = parseFloat(document.getElementById("monto").value);
    const tasa = parseFloat(document.getElementById("interes").value);
    const anios = parseFloat(document.getElementById("años").value);

    // Validar que los valores sean números válidos
    if (
      !isNaN(monto) &&
      monto > 0 &&
      !isNaN(tasa) &&
      tasa >= 3 &&
      tasa <= 5 &&
      !isNaN(anios) &&
      anios > 0 &&
      anios <= 25
    ) {
      // Calcular la cuota mensual
      const cuota = calcularPrestamo(monto, tasa, anios);

      // Mostrar las cuotas desglosadas en el DOM
      mostrarDesglose(monto, tasa, anios, cuota);

      // Guardar simulación en localStorage
      guardarSimulacion(monto, tasa, anios, cuota);

      // Mostrar historial de simulaciones
      mostrarHistorial();

      // Limpiar campos del formulario
      document.getElementById("monto").value = "";
      document.getElementById("interes").value = "";
      document.getElementById("años").value = "";
    } else {
      alert(`Por favor ingresa valores válidos en todos los campos
        1- El monto debe ser un numero positivo
        2- La tasa de interes que debes elegir es un número entre 3 y 5
        3- Los años no pueden superar los 25`);
    }
  });

// Función para calcular el préstamo
function calcularPrestamo(monto, tasa, anios) {
  const meses = anios * 12;
  const tasaMensual = tasa / 100 / 12;
  const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
  return cuota.toFixed(2); // Redondear a 2 decimales
}

// Función para mostrar el desglose de cuotas en el DOM
function mostrarDesglose(monto, tasa, anios, cuota) {
  const mostrarResultadoDiv = document.getElementById("mostrarResultado");
  mostrarResultadoDiv.innerHTML = ""; // Limpiar el contenido anterior

  const meses = anios * 12;
  let totalPagado = 0;

  for (let i = 1; i <= meses; i++) {
    totalPagado += parseFloat(cuota);
    const p = document.createElement("p");
    p.textContent = `Mes ${i}: Cuota ${cuota} - Total pagado: ${totalPagado.toFixed(
      2
    )}`;
    mostrarResultadoDiv.appendChild(p);
  }
}

// Función para guardar simulaciones en localStorage
function guardarSimulacion(monto, tasa, anios, cuota) {
  const simulation = {
    monto: monto,
    tasa: tasa,
    anios: anios,
    cuota: cuota,
    fecha: new Date().toLocaleDateString(), // Formato de fecha
  };

  let simulations = JSON.parse(localStorage.getItem("simulations")) || [];
  simulations.push(simulation);

  localStorage.setItem("simulations", JSON.stringify(simulations));
}

// Función para mostrar historial de simulaciones
function mostrarHistorial() {
  const historialLista = document.getElementById("historialLista");
  historialLista.innerHTML = ""; // Limpiar el contenido anterior

  const simulations = JSON.parse(localStorage.getItem("simulations")) || [];

  simulations.forEach((simulation, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `Simulación ${index + 1}: Monto: $${
      simulation.monto
    }, Tasa: ${simulation.tasa}%, Años: ${simulation.anios}, Cuota: $${
      simulation.cuota
    }, Fecha: ${simulation.fecha}`;
    historialLista.appendChild(li);
  });
}

// Mostrar historial al cargar la página
document.addEventListener("DOMContentLoaded", mostrarHistorial);
