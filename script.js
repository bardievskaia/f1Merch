let carrito = [];

const cartButton = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const closeCart = document.getElementById("close-cart");

function renderizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    count += producto.cantidad;

    item.innerHTML = `
      <strong>${producto.nombre}</strong><br>
      Precio: ${producto.precio} x ${producto.cantidad} = ${subtotal}<br>
      <button data-action="decrease" data-index="${index}">-</button>
      <button data-action="increase" data-index="${index}">+</button>
      <button data-action="remove" data-index="${index}">Eliminar</button>
    `;

    cartItems.appendChild(item);
  });

  cartTotal.textContent = `$${total}`;
  cartCount.textContent = count;

  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (count > 0) {
    cartPopup.classList.add("active");
  } else {
    cartPopup.classList.remove("active");
  }
}

function agregarAlCarritoPorId(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const index = carrito.findIndex(p => p.id === producto.id);
  if (index !== -1) {
    if (carrito[index].cantidad < producto.stock) {
      carrito[index].cantidad++;
    } else {
      alert("No hay más stock disponible de este producto.");
    }
  } else {
    if (producto.stock > 0) {
      carrito.push({ ...producto, cantidad: 1 });
    } else {
      alert("Producto sin stock disponible.");
    }
  }
  renderizarCarrito();
}

function actualizarCantidad(index, cambio) {
  const producto = carrito[index];
  if (cambio === 1 && producto.cantidad >= producto.stock) {
    alert("Has alcanzado el stock máximo de este producto.");
    return;
  }
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  renderizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

cartButton.addEventListener("click", () => {
  if (carrito.length > 0) {
    cartPopup.classList.toggle("active");
  }
});

closeCart.addEventListener("click", () => {
  cartPopup.classList.remove("active");
});

cartItems.addEventListener("click", (e) => {
  const index = parseInt(e.target.dataset.index);
  if (e.target.dataset.action === "increase") {
    actualizarCantidad(index, 1);
  } else if (e.target.dataset.action === "decrease") {
    actualizarCantidad(index, -1);
  } else if (e.target.dataset.action === "remove") {
    eliminarProducto(index);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    renderizarCarrito();
  }

  const productList = document.getElementById("product-list");

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio}</strong></p>
      <button class="add-to-cart" data-id="${producto.id}">Agregar al Carrito</button>
    `;

    productList.appendChild(card);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarritoPorId(id);
    }
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar Carrito";
  btnVaciar.id = "vaciar-carrito";
  btnVaciar.style.marginTop = "10px";
  btnVaciar.addEventListener("click", vaciarCarrito);
  document.querySelector(".cart-content").appendChild(btnVaciar);
});