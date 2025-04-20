import { Carrito } from "./carritoModal.js";


export function Menu() {
    return `
<header class="header" id="inicio">
    <div class="cart-content">
        <button class="open-modal">
            <i class='bx bxs-cart'></i>
            <span class="cantidad"></span> <!-- Aquí agregamos el contador -->
        </button>
        <h1 class="logo">VerduMax</h1>
    </div>
    ${Carrito()}
    <div class="search-content">
        <input type="text" class="filtroProductos" id="filtro">
        <a href="#mercaderias"><i class='bx bx-search'></i></a>
    </div>
    <button id="open-close"><i class='bx bx-menu'></i></button>
    <p class="titleMax">Los más frescos frutos de todo Zona Zur</p>
    <div class="menu hide">
        <ul class="ul">
            <a href="#inicio"><li>Inicio</li></a>
            <a href="#verduras"><li>Verduras</li></a>
            <a href="#frutas"><li>Frutas</li></a>
            <a href="#contactos"><li>Contacto</li></a>
        </ul>
    </div>
</header>
`
}


//header Menu
export function menuClick() {
    const btnMenu = document.querySelector("#open-close");
    const toggleMenu = document.querySelector(".hide");
    
    btnMenu.addEventListener("click", () => {
        toggleMenu.classList.toggle("hide");
    })
};

