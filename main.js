const dialog = document.querySelector("dialog");
const myFromAdd = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");
const myTabla = document.querySelector("#myData");
const urlAPI = "https://6509d051f6553137159c10d2.mockapi.io/tabla";

// ! Funcion para eliminar
// !-----------------------------------------------------------------------
const deleteData = async (id) => {
  let config = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };
  let res = await (await fetch(urlAPI + "/" + id, config)).json();
};

// ! Guardar data en el API
// !-----------------------------------------------------------------------
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
      console.log("Error al guardar los data. ", response.stringify);
    }
  } catch (error) {
    console.log("Error al guardar los data. ", response.stringify);
  }
});

// ! Funcion para editar
// !-----------------------------------------------------------------------
const editData = async (id) => {
  dialog.showModal(); // Mostrar el dialog
  const response = await fetch(urlAPI + "/" + id);
  const data = await response.json();

  // definir las variables de edicion
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

  // ? Función para el manejo de envio del formulario de edición
  const submitEditForm = async (e) => {
    e.preventDefault();
    const updateData = Object.fromEntries(new FormData(e.target));
    updateData.caja = editCajaIngreso.checked ? "Ingreso" : "Egreso";

    const config = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateData),
    };

    try {
      const response = await fetch(urlAPI + "/" + id, config); //Solicitut para actualización de data

      response.ok
        ? dialog.close()
        : console.log("Error al actualizar data. ", response.statusText);
    } catch (error) {
      console.log("Error en la edicion de los data. ");
    }
  };

  // ? Manejo de eventos del envio del formulario de edición

  editForm.addEventListener("submit", submitEditForm);

  document.querySelector("#cancelarEdicion").addEventListener("click", () => {
    dialog.close();
  });
};

// ! Funcion para realizar la busqueda
// !-----------------------------------------------------------------------
document.querySelector("#searchButton").addEventListener("click", () => {
  const searchTerm = document
    .querySelector("#searchProduct")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#myData tr.row");

  rows.forEach((row) => {
    const productoCell = row
      .querySelector("[data-producto]")
      .getAttribute("data-producto")
      .toLowerCase();

    productoCell.includes(searchTerm)
      ? (row.style.display = "")
      : (row.style.display = "none");
  });
});

// ! Función para mostrar la tabla
// !-----------------------------------------------------------------------

addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await (await fetch(urlAPI)).json();
    // myTabla.innerHTML = "";

    for (let i = 0; i < res.length; i++) {
      myTabla.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="row" id="${res[i].id}">
          <td>${i + 1}</td>
          <td data-valor="${res[i].valor}">${res[i].valor}</td>
          <td data-caja="${res[i].caja}">${res[i].caja}</td>
          <td data-cantidad="${res[i].cantidad}">${res[i].cantidad}</td>
          <td data-producto="${res[i].producto}">${res[i].producto}</td>
          <td>
            <button id="${res[i].id}" class="delete">Eliminar</button>
            <button id="${res[i].id}" class="edit">Editar</button>
          </td>
        </tr>`
      );
    }

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
