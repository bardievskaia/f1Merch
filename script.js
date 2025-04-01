document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const cartIcon = document.getElementById("cart-icon");
    let carrito = [];

    function mostrarProductos() {
        productos.forEach(producto => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            productContainer.appendChild(productElement);
        });
    }

    window.agregarAlCarrito = function (id) {
        const producto = productos.find(p => p.id === id);
        const itemEnCarrito = carrito.find(p => p.id === id);
        
        if (producto && producto.stock > 0) {
            if (itemEnCarrito) {
                if (itemEnCarrito.cantidad < producto.stock) {
                    itemEnCarrito.cantidad++;
                } else {
                    alert("No hay más stock disponible");
                }
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            actualizarCarrito();
        }
    };

    function actualizarCarrito() {
        console.log("Carrito actualizado:", carrito);
        // Aquí se actualizaría el DOM del carrito
    }

    mostrarProductos();
});
