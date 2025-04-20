import { nuevoArray } from "../arrayVerd.js";

export function mainVerduras(data = nuevoArray) {
    return data.map(verd => {
      const verdura = Object.values(verd)[0];
      return `
        <div class="container-frutas">
          <h3>${verdura.Nombre}</h3>
          <img src="./images/${verdura.id}.png" alt="${verdura.Nombre}">
          <p>${verdura.Descripcion}</p>
          <h4><b>$${verdura.Precio}</b></h4>
          <button class="add-to-cart" data-id="${verdura.id}">Agregar al carrito</button>
        </div>
      `;
    }).join("");
  }