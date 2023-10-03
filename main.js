//main.js
const dialog = document.querySelector("dialog");
const myFromAdd = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");
const myTabla = document.querySelector("#myData");
const urlAPI = "http://127.0.0.2:5004/presupestos";
let totalIngresos = 0;
let totalEgresos = 0;
let total = 0;

const obtenerDatosDesdeAPI = async () => {
  let totalIngresos = 0;
  let totalEgresos = 0;
  let total = 0;
  try {
    const response = await fetch(urlAPI);
    if (response.ok) {
      const data = await response.json();
      console.dir(data);

      const presupuestos = data.presupestos; // Obtener el array de presupuestos
      console.log("Presupuestos ---- " + presupuestos)
      // Iterar sobre cada presupuesto en el array
      for (const presupuesto of presupuestos) {
        console.log("Presupuesto --- " + presupuesto)
        const valor = presupuesto.valor;
        const caja = presupuesto.caja;
        const cantidad = presupuesto.cantidad;
        const producto = presupuesto.producto;
        const id = presupuesto.id;

        // Hacer lo que necesites con estos valores, por ejemplo, calcular totales
        if (caja === "ingreso") {
          totalIngresos += valor;
        } else if (caja === "egreso") {
          totalEgresos += valor;
        }
        total = totalIngresos - totalEgresos;

        // Puedes mostrar estos valores en la tabla, actualizar la interfaz, etc.
        console.log(`Valor: ${valor}, Caja: ${caja}, Cantidad: ${cantidad}, Producto: ${producto}, ID: ${id}`);
      }

      return presupuestos;
    } else {
      console.log("Error al obtener los datos desde la API. ", response.statusText);
      return [];
    }
  } catch (error) {
    console.log("Error al obtener los datos desde la API. ", error);
    return [];
  }
};

// const calcularTotales = () => {
//   totalIngresos = 0;
//   totalEgresos = 0;

//   const rows = document.querySelectorAll("#myData tr.row");
//   const config = {
//     method: "PUT",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(updateData),
//   };
//   rows.forEach((row) => {
//     const valor = parseFloat(
//       row.querySelector("[data-valor]").getAttribute("data-valor")
//     );
//     const caja = row
//       .querySelector("[data-caja]")
//       .textContent.trim()
//       .toLowerCase();

//     if (caja === "ingreso") {
//       totalIngresos += valor;
//     } else if (caja === "egreso") {
//       totalEgresos += valor;
//     }
//   });

//   total = totalIngresos - totalEgresos;

//   // Actualiza los elementos HTML para mostrar los nuevos totales.
//   document.querySelector("#totalIngresos").textContent =
//     formatPrice(totalIngresos);
//   document.querySelector("#totalEgresos").textContent =
//     formatPrice(totalEgresos);
//   document.querySelector("#total").textContent = formatPrice(total);
// };

// Funcion para eliminar

const deleteData = async (id) => {
  let config = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };
  let res = await (await fetch(urlAPI + "/" + id, config)).json();
};

// Guardar data en el API
myFromAdd.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const { valor, cantidad } = data;
  data.valor = typeof valor === "string" ? Number(valor) : null;
  data.cantidad = typeof cantidad === "string" ? Number(cantidad) : null;

  const config = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(urlAPI, config);
    if (response.ok) {
      const res = await response.json();
      console.log(res);
    } else {
      console.log("Error al guardar los datos. ", response.stringify);
    }
  } catch (error) {
    console.log("Error al guardar los datos. ", error);
  }
});

// Funcion para editar
const editData = async (id) => {
  dialog.showModal();
  const response = await fetch(urlAPI + "/" + id);
  const data = await response.json();

  const editValor = document.querySelector("#editValor");
  const editCajaIngreso = document.querySelector("#editCajaIngreso");
  const editCajaEgreso = document.querySelector("#editCajaEgreso");
  const editCantidad = document.querySelector("#editCantidad");
  const editProducto = document.querySelector("#editProducto");

  editValor.value = data.valor;

  data.caja === "ingreso"
    ? (editCajaIngreso.checked = true)
    : (editCajaEgreso.checked = true);

  editCantidad.value = data.cantidad;
  editProducto.value = data.producto;

  const submitEditForm = async (e) => {
    e.preventDefault();
    const updateData = Object.fromEntries(new FormData(e.target));
    const { valor, cantidad } = updateData;
    updateData.valor = typeof valor === "string" ? Number(valor) : null;
    updateData.cantidad =
      typeof cantidad === "string" ? Number(cantidad) : null;

    updateData.caja = editCajaIngreso.checked ? "ingreso" : "egreso";

    const config = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateData),
    };

    try {
      const response = await fetch(urlAPI + "/" + id, config);

      if (response.ok) {
        dialog.close();
        // Después de una edición exitosa, recalcula los totales.
        obtenerDatosDesdeAPI();
      } else {
        console.log("Error al actualizar los datos. ", response.statusText);
      }
    } catch (error) {
      console.log("Error en la edición de los datos. ", error);
    }
  };

  editForm.addEventListener("submit", submitEditForm);

  document.querySelector("#cancelarEdicion").addEventListener("click", () => {
    dialog.close();
  });
};

// Función para realizar la búsqueda
document.querySelector("#searchButton").addEventListener("click", () => {
  const searchTerm = document
    .querySelector("#searchProduct")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#myData tr.row");

  rows.forEach((row) => {
    const productoCell = row
      .querySelector("[data-producto]")
      .getAttribute("data-producto");

    if (productoCell) {
      const productoLower = productoCell.toLowerCase();
      if (productoLower.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});

// Función para formatear los precios
const formatPrice = (price) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "COP",
  }).format(price);
};

// Función para mostrar la tabla
addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await (await fetch(urlAPI)).json();

    for (let i = 0; i < res.length; i++) {
      myTabla.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="row" id="${res[i].id}">
          <td>${i + 1}</td>
          <td data-valor="${res[i].valor}">$ ${formatPrice(res[i].valor)}</td>
          <td data-caja="${res[i].caja}">${res[i].caja}</td>
          <td data-cantidad="${res[i].cantidad}">${res[i].cantidad}</td>
          <td data-producto="${res[i].producto}">${res[i].producto}</td>
          <td class="button-container"> 
            <button id="${res[i].id}" class="edit">Editar</button>
            <button id="${res[i].id}" class="delete">Eliminar</button>
          </td>
        </tr>`
      );

      // Actualizar totales
      if (res[i].caja === "ingreso") {
        totalIngresos += res[i].valor;
      } else if (res[i].caja === "egreso") {
        totalEgresos += res[i].valor;
      }
      total = totalIngresos - totalEgresos;
    }

    // Mostrar totales
    document.querySelector("#totalIngresos").textContent =
      formatPrice(totalIngresos);
    document.querySelector("#totalEgresos").textContent =
      formatPrice(totalEgresos);
    document.querySelector("#total").textContent = formatPrice(total);

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.id;
        deleteData(id);
      });
    });

    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.id;
        editData(id);
      });
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});

obtenerDatosDesdeAPI();
