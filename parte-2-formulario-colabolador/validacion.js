"use strict";

// ─── Funciones de retroalimentación ────────────────────────────────────

function mostrarError(campoId, mensaje) {
  const campo = document.querySelector(#${campoId});
  const span = document.querySelector(#error-${campoId});

  campo.classList.add("invalido");
  campo.classList.remove("valido");

  span.textContent = mensaje;
  span.classList.add("visible");
}

function limpiarError(campoId) {
  const campo = document.querySelector(#${campoId});
  const span = document.querySelector(#error-${campoId});

  campo.classList.remove("invalido");
  campo.classList.add("valido");

  span.textContent = "";
  span.classList.remove("visible");
}

function limpiarTodo() {
  [
    "nombre",
    "email",
    "username",
    "password",
    "confirmar",
    "rol",
    "equipo",
    "horas",
    "terminos"
  ].forEach(id => limpiarError(id));
}


// ─── Validación del nombre ─────────────────────────────────────────────

function validarNombre() {
  const campo = document.querySelector("#nombre");

  if (campo.validity.valueMissing) {
    mostrarError("nombre", "El nombre es obligatorio.");
    return false;
  }

  if (campo.validity.tooShort) {
    mostrarError(
      "nombre",
      El nombre debe tener al menos ${campo.minLength} caracteres.
    );
    return false;
  }

  limpiarError("nombre");
  return true;
}


// ─── Validación del correo ─────────────────────────────────────────────

function validarEmail() {
  const campo = document.querySelector("#email");

  if (campo.validity.valueMissing) {
    mostrarError("email", "El correo es obligatorio.");
    return false;
  }

  if (campo.validity.typeMismatch) {
    mostrarError("email", "El formato del correo no es válido.");
    return false;
  }

  limpiarError("email");
  return true;
}


// ─── Validación del nombre de usuario ──────────────────────────────────

// Se reutiliza el pattern definido en HTML para evitar duplicar
// la misma regla con una expresión regular en JavaScript.
// Así existe una sola fuente de verdad para el formato permitido.

function validarUsername() {
  const campo = document.querySelector("#username");

  if (campo.validity.valueMissing) {
    mostrarError(
      "username",
      "El nombre de usuario es obligatorio."
    );
    return false;
  }

  if (campo.validity.patternMismatch) {
    mostrarError(
      "username",
      "Use 4 a 20 caracteres: letras, números o guion bajo, sin espacios."
    );
    return false;
  }

  limpiarError("username");
  return true;
}


// ─── Validación de contraseña ──────────────────────────────────────────
// Estrategia B: validaciones independientes.
// Permite indicar exactamente qué regla está incumpliendo el usuario.

function validarPassword() {
  const campo = document.querySelector("#password");
  const valor = campo.value;

  if (campo.validity.valueMissing) {
    mostrarError(
      "password",
      "La contraseña es obligatoria."
    );
    return false;
  }

  if (campo.validity.tooShort) {
    mostrarError(
      "password",
      "La contraseña debe tener al menos 8 caracteres."
    );
    return false;
  }

  if (!/[A-Z]/.test(valor)) {
    mostrarError(
      "password",
      "Falta al menos una letra mayúscula."
    );
    return false;
  }

  if (!/[0-9]/.test(valor)) {
    mostrarError(
      "password",
      "Falta al menos un número."
    );
    return false;
  }

  if (!/[^A-Za-z0-9]/.test(valor)) {
    mostrarError(
      "password",
      "Falta al menos un carácter especial."
    );
    return false;
  }

  limpiarError("password");
  return true;
}


// ─── Confirmación de contraseña ────────────────────────────────────────

function validarConfirmar() {
  const password = document.querySelector("#password").value;
  const confirmar = document.querySelector("#confirmar").value;

  if (!confirmar) {
    mostrarError(
      "confirmar",
      "La confirmación es obligatoria."
    );
    return false;
  }

  if (password !== confirmar) {
    mostrarError(
      "confirmar",
      "Las contraseñas no coinciden."
    );
    return false;
  }

  limpiarError("confirmar");
  return true;
}


// ─── Elementos del campo condicional ───────────────────────────────────

const selectRol = document.querySelector("#rol");
const grupoEquipo = document.querySelector("#grupo-equipo");
const campoEquipo = document.querySelector("#equipo");


// ─── Validación del rol ────────────────────────────────────────────────

function validarRol() {
  const campo = document.querySelector("#rol");

  if (campo.validity.valueMissing) {
    mostrarError("rol", "Seleccione un rol.");
    return false;
  }

  limpiarError("rol");
  return true;
}


// ─── Campo condicional Equipo a cargo ──────────────────────────────────
// Estrategia A: alternar el atributo required nativo.
// Cuando el rol es Líder, el navegador considera obligatorio el campo.

selectRol.addEventListener("change", () => {
  const esLider = selectRol.value === "lider";

  grupoEquipo.classList.toggle("oculto", !esLider);

  campoEquipo.required = esLider;

  if (!esLider) {
    campoEquipo.value = "";
    limpiarError("equipo");
  }
});


function validarEquipo() {
  const campo = document.querySelector("#equipo");

  if (!campo.required) {
    return true;
  }

  if (campo.validity.valueMissing) {
    mostrarError(
      "equipo",
      "Indique el equipo a cargo para el rol de Líder."
    );
    return false;
  }

  limpiarError("equipo");
  return true;
}


// ─── Validación de horas ───────────────────────────────────────────────

function validarHoras() {
  const campo = document.querySelector("#horas");

  if (campo.validity.valueMissing) {
    mostrarError(
      "horas",
      "Indique las horas disponibles por semana."
    );
    return false;
  }

  if (campo.validity.rangeUnderflow) {
    mostrarError(
      "horas",
      Debe disponer al menos de ${campo.min} horas semanales.
    );
    return false;
  }

  if (campo.validity.rangeOverflow) {
    mostrarError(
      "horas",
      No puede superar las ${campo.max} horas semanales.
    );
    return false;
  }

  limpiarError("horas");
  return true;
}


// ─── Validación de términos ────────────────────────────────────────────

function validarTerminos() {
  const campo = document.querySelector("#terminos");

  if (!campo.checked) {
    mostrarError(
      "terminos",
      "Debe aceptar los términos para continuar."
    );
    return false;
  }

  limpiarError("terminos");
  return true;
}


// ─── Validación en tiempo real ─────────────────────────────────────────

document.querySelector("#nombre")
  .addEventListener("blur", validarNombre);

document.querySelector("#email")
  .addEventListener("blur", validarEmail);

document.querySelector("#username")
  .addEventListener("blur", validarUsername);

document.querySelector("#password")
  .addEventListener("blur", validarPassword);

document.querySelector("#confirmar")
  .addEventListener("blur", validarConfirmar);

document.querySelector("#rol")
  .addEventListener("change", validarRol);

document.querySelector("#equipo")
  .addEventListener("blur", validarEquipo);

document.querySelector("#horas")
  .addEventListener("blur", validarHoras);

document.querySelector("#terminos")
  .addEventListener("change", validarTerminos);


// Limpiar error al comenzar a escribir la confirmación

document.querySelector("#confirmar")
  .addEventListener("input", () => {
    if (document.querySelector("#confirmar").value) {
      limpiarError("confirmar");
    }
  });


// ─── Indicador de fortaleza de contraseña ──────────────────────────────

function evaluarFortaleza(valor) {
  let puntos = 0;

  if (valor.length >= 8) {
    puntos++;
  }

  if (/[A-Z]/.test(valor)) {
    puntos++;
  }

  if (/[0-9]/.test(valor)) {
    puntos++;
  }

  if (/[^A-Za-z0-9]/.test(valor)) {
    puntos++;
  }

  const niveles = [
    "",
    "Débil",
    "Regular",
    "Buena",
    "Fuerte"
  ];

  const colores = [
    "",
    "#C62828",
    "#F57F17",
    "#1565C0",
    "#2E7D32"
  ];

  return {
    nivel: niveles[puntos],
    color: colores[puntos],
    puntos
  };
}


const campoPassword = document.querySelector("#password");

campoPassword.addEventListener("input", () => {
  const { nivel, color, puntos } =
    evaluarFortaleza(campoPassword.value);

  let indicador = document.querySelector("#fortaleza");

  if (!indicador) {
    indicador = document.createElement("span");
    indicador.id = "fortaleza";

    campoPassword.insertAdjacentElement(
      "afterend",
      indicador
    );
  }

  indicador.textContent =
    puntos > 0 ? Contraseña: ${nivel} : "";

  indicador.style.color = color;
});


// ─── Manejo del envío del formulario ───────────────────────────────────

const form = document.querySelector("#form-registro");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const resultados = [
    validarNombre(),
    validarEmail(),
    validarUsername(),
    validarPassword(),
    validarConfirmar(),
    validarRol(),
    validarEquipo(),
    validarHoras(),
    validarTerminos()
  ];

  const todoValido =
    resultados.every(resultado => resultado === true);

  if (todoValido) {
    const mensajeExito =
      document.querySelector("#mensaje-exito");

    mensajeExito.classList.remove("oculto");
    mensajeExito.classList.add("visible");

    setTimeout(() => {
      form.reset();

      limpiarTodo();

      campoEquipo.required = false;

      grupoEquipo.classList.add("oculto");

      mensajeExito.classList.remove("visible");
      mensajeExito.classList.add("oculto");
    }, 2000);

  } else {
    const primerInvalido =
      form.querySelector(".invalido");

    if (primerInvalido) {
      primerInvalido.focus();
    }
  }
});