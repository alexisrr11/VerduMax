import { ArrayFrutas } from "../arrayFrutas.js";
import { nuevoArray } from "../arrayVerd.js";

//Array contenedor de productos pusheados
let carrito = [];

//Funcion principal se renderiza en index.js
export function Carrito() {
    return `
        <div class="modal-carro hide-modal-cart">
            <h3>Carrito <i class='bx bxs-cart'></i></h3>
            <div class="productosModal">
                <p>"No hay productos"</p>
            </div>
        </div>
    `;
}

//Abrir y cerrar modal-carrito
export function renderModalCart() {
    const btnOpenModal = document.querySelector(".open-modal");
    const modalCarro = document.querySelector(".modal-carro");

    btnOpenModal.addEventListener("click", () => {
        modalCarro.classList.toggle("hide-modal-cart");
    });
}
//Funcion para calcular descuentos
function calcularDescuento(producto) {
    const cantidad = producto.Quanty;

    if (cantidad >= 10) {
        return 0.20; // (20%)
    } else if (cantidad >= 5) {
        return 0.10; // (10%)
    } else if (cantidad >= 2) {
        return 0.05; // (5%)
    }
    return 0;
}

//Muestra contenido del modal
function renderCarrito() {
    const contenedorCart = document.querySelector(".productosModal");
    if (!contenedorCart) return;

    if (carrito.length === 0) {
        contenedorCart.innerHTML = `<p>"No hay productos"</p>`;
        return;
    }

    const productosHTML = carrito.map(producto => {
        const descuento = calcularDescuento(producto);
        const precioUnitario = producto.Precio;
        const precioConDescuento = precioUnitario - (precioUnitario * descuento);
        const totalProducto = (precioConDescuento * producto.Quanty).toFixed(2);
        return `
            <div class="itemCarrito">
                <button class="btn-remove" data-id="${producto.id}"><i class='bx bx-trash'></i></button>
                <img src="./images/${producto.id}.png" alt="${producto.Nombre}">
                <p><b>${producto.Nombre}</b> $${precioUnitario} 
                   <span class="descuento">(-${(descuento * 100)}%)</span></p>
                <button class="less" data-id="${producto.id}"><i class='bx bxs-chevron-down-circle'></i></button>
                ${producto.Quanty}
                <button class="plus" data-id="${producto.id}"><i class='bx bxs-chevron-up-circle'></i></button>
                <p><b>$${totalProducto}</b></p>
            </div>
        `;
    }).join("");

    const total = carrito.reduce((acc, item) => {
        const descuento = calcularDescuento(item);
        const precioConDescuento = item.Precio - (item.Precio * descuento);
        return acc + (precioConDescuento * item.Quanty);
    }, 0).toFixed(2);

    const mensajeWhatsApp = encodeURIComponent(
        "Hola! Quiero hacer una compra:\n\n" +
        carrito.map(p => {
            const descuento = calcularDescuento(p);
            const precioConDescuento = p.Precio - (p.Precio * descuento);
            const totalProducto = (precioConDescuento * p.Quanty).toFixed(2);
            return `🛒 ${p.Nombre} x${p.Quanty} - $${totalProducto}`;
        }).join("\n") +
        `\n\nTotal: $${total}`
    );

    const whatsappLink = `https://wa.me/5491137659081?text=${mensajeWhatsApp}`;

    contenedorCart.innerHTML = `
        ${productosHTML}
        <div class="total-compra">
            <p><b>Total: $${total}</b></p>
            <a href="${whatsappLink}" target="_blank" class="btn-finalizar-compra">
                Comprar
            </a>
        </div>
    `;

    activarBotonesEliminar();
    activarBotonesCantidad();
    actualizarLogoCarrito();
}


//Pushea productos dentro del array: carrito[]
export function AddToCart() { 
    const btnAddCart = document.querySelectorAll(".add-to-cart");

    btnAddCart.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idProducto = parseInt(btn.getAttribute("data-id"));

            // Buscar en frutas
            let producto = ArrayFrutas.find(item => {
                const fruta = Object.values(item)[0];
                return fruta.id === idProducto;
            });

            if (producto) {
                producto = Object.values(producto)[0];

                const existe = carrito.find(p => p.id === producto.id);
                if (existe) {
                    existe.Quanty += 1;
                } else {
                    carrito.push({ ...producto, Quanty: 1 });
                }

                alert(`Agregaste 1 Kilo de ${producto.Nombre}`);
                renderCarrito();
                return;
            }

            // Buscar en verduras
            producto = nuevoArray.find(item => {
                const verdura = Object.values(item)[0];
                return verdura.id === idProducto;
            });

            if (producto) {
                producto = Object.values(producto)[0];

                const existe = carrito.find(p => p.id === producto.id);
                if (existe) {
                    existe.Quanty += 1;
                } else {
                    carrito.push({ ...producto, Quanty: 1 });
                }

                alert(`Agregaste 1 Kilo de ${producto.Nombre}`);
                renderCarrito();
                return;
            }

            console.warn("Producto no encontrado con ID:", idProducto);
        });
    });
}

//btn Eliminar producto del modalCarrito
function activarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-remove");

    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
            const idAEliminar = parseInt(btn.getAttribute("data-id"));
            carrito = carrito.filter(producto => producto.id !== idAEliminar);
            renderCarrito();
            actualizarLogoCarrito();
        });
    });
}

//funcion sumar restar
function activarBotonesCantidad() {
    const botonesMas = document.querySelectorAll(".plus");
    const botonesMenos = document.querySelectorAll(".less");

    botonesMas.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            carrito[index].Quanty++;
            renderCarrito();
        });
    });

    botonesMenos.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (carrito[index].Quanty > 1) {
                carrito[index].Quanty--;
                renderCarrito();
            }
        });
    });
}

//Cantidad logo carrito
export function actualizarLogoCarrito() {
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.Quanty, 0);
    const logoCarrito = document.querySelector(".cart-content .cantidad");

    if (logoCarrito) {
        logoCarrito.textContent = cantidadTotal > 0 ? cantidadTotal : '';
    }
}
