let carrito = []; 

const botonCarrito = document.getElementById("cart-button");
const popupCarrito = document.getElementById("cart-popup");
const listaCarrito = document.getElementById("cart-items");
const totalCarrito = document.getElementById("cart-total");
const cantidadCarrito = document.getElementById("cart-count");
const cerrarCarrito = document.getElementById("close-cart");


function mostrarCarrito() {
  listaCarrito.innerHTML = ""; 
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    cantidadTotal += producto.cantidad;

    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${producto.nombre}</strong><br>
      Precio: €${producto.precio} x ${producto.cantidad} = €${subtotal}<br>
      <button data-action="decrease" data-index="${index}">-</button>
      <button data-action="increase" data-index="${index}">+</button>
      <button data-action="remove" data-index="${index}">Eliminar</button>
    `;
    listaCarrito.appendChild(item);
  });

  totalCarrito.textContent = `€${total}`;
  cantidadCarrito.textContent = cantidadTotal;
}

// Agrega un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const enCarrito = carrito.find(p => p.id === id);

  if (enCarrito) {
    if (enCarrito.cantidad < producto.stock) {
      enCarrito.cantidad++;
    } else {
      alert("Sin stock disponible.");
    }
  } else {
    if (producto.stock > 0) {
      carrito.push({ ...producto, cantidad: 1 });
    } else {
      alert("No hay stock.");
    }
  }
  mostrarCarrito();
}


function cambiarCantidad(index, cambio) {
  const producto = carrito[index];
  if (!producto) return;

 
  if (cambio === 1 && producto.cantidad >= producto.stock) {
    alert("Sin stock.");
    return;
  }

  producto.cantidad += cambio;

  
  if (producto.cantidad <= 0) {
    carrito.splice(index, 1);
  }
  mostrarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

botonCarrito.addEventListener("click", () => {
  if (carrito.length > 0) {
    popupCarrito.classList.toggle("active");
  }
});

cerrarCarrito.addEventListener("click", () => {
  popupCarrito.classList.remove("active");
});

listaCarrito.addEventListener("click", (e) => {
  const index = parseInt(e.target.dataset.index);
  const accion = e.target.dataset.action;

  if (accion === "increase") cambiarCantidad(index, 1);
  if (accion === "decrease") cambiarCantidad(index, -1);
  if (accion === "remove") eliminarProducto(index);
});


window.addEventListener("DOMContentLoaded", () => {
  // Recupero elementos de antes si estaban en carrito seleccionados
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    carrito = JSON.parse(guardado);
    mostrarCarrito();
  }

  const listaProductos = document.getElementById("product-list");

 
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>€${producto.precio}</strong></p>
      <button class="add-to-cart" data-id="${producto.id}">Agregar al Carrito</button>
    `;

    listaProductos.appendChild(card);
  });

 
  listaProductos.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id);
    }
  });


  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar Carrito";
  botonVaciar.style.marginTop = "10px";
  botonVaciar.addEventListener("click", vaciarCarrito);
  document.querySelector(".cart-content").appendChild(botonVaciar);
});