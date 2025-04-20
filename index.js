import { Menu } from "./componentes/headerMenu.js";
import { menuClick } from "./componentes/headerMenu.js";
import { renderModalCart } from "./componentes/carritoModal.js";
import { AddToCart } from "./componentes/carritoModal.js";
import { mainVerduras } from "./componentes/mainVerdu.js";
import { mainFrutas } from "./componentes/mainFrutas.js";
import { Contactos } from "./componentes/footer.js";
import { ArrayFrutas } from "./arrayFrutas.js";
import { nuevoArray } from "./arrayVerd.js";
import { actualizarLogoCarrito } from "./componentes/carritoModal.js";


export function Render() {
    return `
    ${Menu()}
    <main class="main" id="mercaderias">
        <h2 id="verduras">Verduras</h2>
        <section class="verduras" id="contenedor-verduras">
            ${mainVerduras()}
        </section>
        <h2 id="frutas">Frutas</h2>
        <section class="frutas" id="contenedor-frutas">
            ${mainFrutas()}
        </section>
    </main>
    ${Contactos()}
    `
}

document.body.innerHTML = Render();
menuClick();
renderModalCart();
AddToCart();
actualizarLogoCarrito();
activarDeslizamiento();


//Deslizamiento suave Href"";
function activarDeslizamiento() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

//filtro
  document.addEventListener("DOMContentLoaded", () => {
    const contenedorFrutas = document.getElementById("contenedor-frutas");
    const contenedorVerduras = document.getElementById("contenedor-verduras");
    const inputFiltro = document.getElementById("filtro");
  
    const tituloFrutas = document.getElementById("frutas");
    const tituloVerduras = document.getElementById("verduras");
  
    inputFiltro.addEventListener("input", () => {
      const texto = inputFiltro.value.toLowerCase();
  
      const frutasFiltradas = ArrayFrutas.filter(frut => {
        const fruta = Object.values(frut)[0];
        return fruta.Nombre.toLowerCase().includes(texto);
      });
  
      const verdurasFiltradas = nuevoArray.filter(v => {
        const verdura = Object.values(v)[0];
        return verdura.Nombre.toLowerCase().includes(texto);
      });
  
      contenedorFrutas.innerHTML = frutasFiltradas.length > 0
        ? mainFrutas(frutasFiltradas)
        : '';
  
      contenedorVerduras.innerHTML = verdurasFiltradas.length > 0
        ? mainVerduras(verdurasFiltradas)
        : '';
  
      // Mostrar u ocultar los títulos según si hay productos
      tituloFrutas.style.display = frutasFiltradas.length > 0 ? "block" : "none";
      tituloVerduras.style.display = verdurasFiltradas.length > 0 ? "block" : "none";
  
      // Si no hay ni frutas ni verduras, mostrar mensaje
      if (frutasFiltradas.length === 0 && verdurasFiltradas.length === 0) {
        contenedorFrutas.innerHTML = "<h2>No se encontraron productos</h2>";
      }
  
      AddToCart(); // Reactivar btns add-to-card
    });
  });
  

