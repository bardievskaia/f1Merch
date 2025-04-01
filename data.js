const productos = [
    { id: 1, nombre: "MV1 2025 Team Polo", imagen: "", descripcion: "New MV1 2025 Team Polo", precio: 90, stock: 5 },
    { id: 2, nombre: "RB 2025 Team Shirt", imagen: "img/producto2.jpg", descripcion: "New RB 2025 Team Shirt", precio: 85, stock: 8 },
    { id: 3, nombre: "RB 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New RB 2025 Team Cap", precio: 50, stock: 3 },
    { id: 4, nombre: "LH44 2025 Helmet", imagen: "img/producto3.jpg", descripcion: "Lewis Hamilton 2025 miniature helmet", precio: 90, stock: 3 },
    { id: 5, nombre: "Ferrari 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "New Ferrari 2025 Team Shirt", precio: 85, stock: 3 },
    { id: 6, nombre: "Ferrari 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New Ferrari 2025 Team Cap", precio: 50, stock: 3 },
    { id: 7, nombre: "LN4 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "New Lando 2025 Team Shirt", precio: 90, stock: 3 },
    { id: 8, nombre: "McLaren 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "New McLaren 2025 Team Shirt", precio: 85, stock: 3 },
    { id: 9, nombre: "McLaren 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New McLaren 2025 Team Cap", precio: 50, stock: 3 },
    { id: 10, nombre: "GS63 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "New GS63 2025 Team Shirt", precio: 90, stock: 3 },
    { id: 11, nombre: "Mercedes 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "New Mercedes 2025 Team Shirt", precio: 85, stock: 3 },
    { id: 12, nombre: "Mercedes 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New Mercedes 2025 Team Cap", precio: 50, stock: 3 },
    { id: 13, nombre: "ALO14 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 90, stock: 3 },
    { id: 14, nombre: "Producto 14", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 85, stock: 3 },
    { id: 15, nombre: "AM 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New Aston Martin 2025 Team Cap", precio: 50, stock: 3 },
    { id: 16, nombre: "Williams 2025 Team Sweatshirt", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 90, stock: 3 },
    { id: 17, nombre: "Producto 17", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 85, stock: 3 },
    { id: 18, nombre: "Williams 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New Williams 2025 Team Cap", precio: 50, stock: 3 },
    { id: 19, nombre: "YT22 2025 Team Shirt", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 90, stock: 3 },
    { id: 20, nombre: "Producto 20", imagen: "img/producto3.jpg", descripcion: "Descripción del producto 3", precio: 85, stock: 3 },
    { id: 21, nombre: "VCARB 2025 Team Cap", imagen: "img/producto3.jpg", descripcion: "New VCarb 2025 Team Cap", precio: 50, stock: 3 },
];

// Función para cargar los productos dinámicamente
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    productos.forEach(producto => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="add-to-cart" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productList.appendChild(productCard);
    });
});