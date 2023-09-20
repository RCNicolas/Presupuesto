let myForm = document.querySelector("form");
let myTabla = document.querySelector("#myData");

let urlMockAPI = "https://6509d051f6553137159c10d2.mockapi.io/tabla";

//! AGREGAR TABLA DE DATOS AL HTML =======================================
addEventListener("DOMContentLoaded", async () => {
  let res = await (await fetch(urlMockAPI)).json();
  for (let i = 0; i < res.length; i++) {
    myTabla.insertAdjacentHTML(
      "beforeend" /*html*/,
      `
      <tr class="row" id="${res[i].id}">
          <td>${res[i].id}</td>
          <td><input type="text" class="edit-caja" value="${res[i].caja}" /></td>
          <td><input type="text" class="edit-valor" value="${res[i].cantidad}" /></td>
          <td><input type="text" class="edit-valor" value="${res[i].valor}" /></td>
          <td><input type="text" class="edit-producto" value="${res[i].producto}" /></td>
          <td>
            <input type="button" value="Guardar" class="save" id="${res[i].id}-save" style="display: none;" />
            <input type="button" value="Cancelar" class="cancel" id="${res[i].id}-cancel" style="display: none;" />
            <button type="button" value="Editar" class="edit" id="${res[i].id}-edit">Editar</button>
            <input type="button" value="Eliminar" class="delete" id="${res[i].id}-delete" />
          </td>
      </tr>`
    );
  }
});

myForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //Quita el comportamiento por default
  const data = Object.fromEntries(new FormData(e.target));
  const { valor, cantidad } = data;
  data.valor = typeof valor === "string" ? Number(valor) : null;
  data.cantidad = typeof cantidad === "string" ? Number(cantidad) : null;
  let config = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await (await fetch(urlMockAPI, config)).json();
  console.log(res);
});


