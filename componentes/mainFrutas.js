import { ArrayFrutas } from "../arrayFrutas.js";

export function mainFrutas(data = ArrayFrutas) {
    return data.map(frut => {
      const fruta = Object.values(frut)[0];
      return `
        <div class="container-frutas">
          <h3>${fruta.Nombre}</h3>
          <img src="./images/${fruta.id}.png" alt="${fruta.Nombre}">
          <p>${fruta.Descripcion}</p>
          <h4><b>$${fruta.Precio}</b></h4>
          <button class="add-to-cart" data-id="${fruta.id}">Agregar al carrito</button>
        </div>
      `;
    }).join("");
  }