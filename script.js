const curiosidades = [
    "Un día en Venus dura más que un año.",
    "Hay más estrellas que granos de arena.",
    "Saturno flotaría en agua.",
    "La luz del Sol tarda 8 minutos en llegar.",
    "Neptuno tiene vientos supersónicos."
];

let i = 0;

function mostrarDato() {
    document.getElementById("datoCurioso").textContent = curiosidades[i];
    i = (i + 1) % curiosidades.length;
}

setInterval(mostrarDato, 3000);
mostrarDato();

let observaciones = JSON.parse(localStorage.getItem("astrobase")) || [];

const form = document.getElementById("formRegistro");
const contenedor = document.getElementById("contenedorTarjetas");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
const otroTipo = document.getElementById("otroTipo");

function sanitizar(txt) {
    return txt.trim();
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function guardar() {
    localStorage.setItem("astrobase", JSON.stringify(observaciones));
}

tipo.addEventListener("change", () => {

    if (tipo.value === "Otro") {
        otroTipo.style.display = "block";
    } else {
        otroTipo.style.display = "none";
        otroTipo.value = "";
    }

});

function renderizar() {

    contenedor.innerHTML = "";

    observaciones.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "tarjeta";

        card.innerHTML = `
<h3>${item.nombre}</h3>
<p>Tipo: ${item.tipo}</p>
<p>Fecha: ${item.fecha}</p>
<p>Ubicación: ${item.ubicacion}</p>
<p>Email: ${item.email}</p>
`;

        const acciones = document.createElement("div");
        acciones.className = "acciones";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "btnEditar";

        editar.onclick = () => {
            nombre.value = item.nombre;
            tipo.value = item.tipo;
            fecha.value = item.fecha;
            ubicacion.value = item.ubicacion;
            email.value = item.email;

            observaciones.splice(index, 1);
            guardar();
            renderizar();
        };

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "btnEliminar";

        eliminar.onclick = () => {
            observaciones.splice(index, 1);
            guardar();
            renderizar();
        };

        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        card.appendChild(acciones);
        contenedor.appendChild(card);

    });

    total.textContent = observaciones.length;
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = sanitizar(document.getElementById("nombre").value);

    let tipo = document.getElementById("tipo").value;

    if (tipo === "Otro") {
        tipo = otroTipo.value.trim();
    }

    const fecha = document.getElementById("fecha").value;
    const ubicacion = sanitizar(document.getElementById("ubicacion").value);
    const email = sanitizar(document.getElementById("email").value);

    if (nombre.length < 3) {
        mensaje.textContent = "Nombre inválido";
        return;
    }

    if (tipo === "") {
        mensaje.textContent = "Seleccione tipo";
        return;
    }

    if (tipo.length < 3) {
        mensaje.textContent = "Ingrese un tipo válido";
        return;
    }

    if (fecha === "") {
        mensaje.textContent = "Ingrese fecha";
        return;
    }

    if (ubicacion.length < 3) {
        mensaje.textContent = "Ubicación inválida";
        return;
    }

    if (!validarEmail(email)) {
        mensaje.textContent = "Correo inválido";
        return;
    }

    observaciones.push({ nombre, tipo, fecha, ubicacion, email });

    guardar();
    renderizar();

    mensaje.textContent = "✅ Observación guardada correctamente";
    form.reset();
    otroTipo.style.display = "none";

});

renderizar();

/* Tooltip */
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
form.appendChild(tooltip);

function ayuda(txt) {
    tooltip.textContent = txt;
    tooltip.classList.add("mostrar");
}

function ocultar() {
    tooltip.classList.remove("mostrar");
}

nombre.addEventListener("focus", () => ayuda("Ej: Antares"));
tipo.addEventListener("focus", () => ayuda("Ej: Planeta o galaxia"));
fecha.addEventListener("focus", () => ayuda("Seleccione fecha"));
ubicacion.addEventListener("focus", () => ayuda("Ej: Maipú, patio"));
email.addEventListener("focus", () => ayuda("Ej: astro@gmail.com"));
otroTipo.addEventListener("focus", () => ayuda("Ej: Asteroide"));

document.querySelectorAll("input,select").forEach(el => {
    el.addEventListener("blur", ocultar);
});

/* Scroll suave */
btnMision.addEventListener("click", (e) => {

    e.preventDefault();

    const destino = registro.offsetTop;
    let pos = window.scrollY;

    const mover = setInterval(() => {

        pos += 12;
        window.scrollTo(0, pos);

        if (pos >= destino) {
            clearInterval(mover);
        }

    }, 15);

});