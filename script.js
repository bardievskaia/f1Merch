let carrito = [];

const $ = id => document.getElementById(id);
const cartButton = $("cart-button");
const cartPopup = $("cart-popup");
const cartItems = $("cart-items");
const cartTotal = $("cart-total");
const cartCount = $("cart-count");
const closeCart = $("close-cart");

const guardarCarrito = () => localStorage.setItem("carrito", JSON.stringify(carrito));

function renderizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0, count = 0;

  carrito.forEach((p, i) => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    count += p.cantidad;

    cartItems.innerHTML += `
      <li>
        <strong>${p.nombre}</strong><br>
        Precio: ${p.precio} x ${p.cantidad} = ${subtotal}<br>
        <button data-action="decrease" data-index="${i}">-</button>
        <button data-action="increase" data-index="${i}">+</button>
        <button data-action="remove" data-index="${i}">Eliminar</button>
      </li>
    `;
  });

  cartTotal.textContent = `$${total}`;
  cartCount.textContent = count;
  carrito.length ? cartPopup.classList.add("active") : cartPopup.classList.remove("active");
  guardarCarrito();
}

function agregarAlCarritoPorId(id) {
  const p = productos.find(p => p.id === id);
  if (!p) return;

  const i = carrito.findIndex(c => c.id === id);
  if (i !== -1) {
    carrito[i].cantidad < p.stock ? carrito[i].cantidad++ : alert("Out Of Stock.");
  } else {
    p.stock > 0 ? carrito.push({ ...p, cantidad: 1 }) : alert("No Stock.");
  }
  renderizarCarrito();
}

function actualizarCantidad(i, cambio) {
  const p = carrito[i];
  if (cambio === 1 && p.cantidad >= p.stock) return alert("Out Of Stock.");
  p.cantidad += cambio;
  if (p.cantidad <= 0) carrito.splice(i, 1);
  renderizarCarrito();
}

function eliminarProducto(i) {
  carrito.splice(i, 1);
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

cartButton.onclick = () => carrito.length && cartPopup.classList.toggle("active");
closeCart.onclick = () => cartPopup.classList.remove("active");

cartItems.onclick = e => {
  const { action, index } = e.target.dataset;
  if (action === "increase") actualizarCantidad(+index, 1);
  if (action === "decrease") actualizarCantidad(+index, -1);
  if (action === "remove") eliminarProducto(+index);
};

window.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  renderizarCarrito();

  const productList = $("product-list");
  productos.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>$${p.precio}</strong></p>
        <button class="add-to-cart" data-id="${p.id}">Agregar al Carrito</button>
      </div>
    `;
  });

  productList.onclick = e => {
    if (e.target.classList.contains("add-to-cart")) {
      agregarAlCarritoPorId(+e.target.dataset.id);
    }
  };

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar Carrito";
  btnVaciar.id = "vaciar-carrito";
  btnVaciar.style.marginTop = "10px";
  btnVaciar.onclick = vaciarCarrito;
  document.querySelector(".cart-content").appendChild(btnVaciar);
});