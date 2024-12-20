document.addEventListener("DOMContentLoaded", () => {
    const cardProductos = document.getElementById("card-productos")

    function fetchProductos() {
        fetch('https://dummyjson.com/products/search?q=phone')
            .then(res => res.json())
            .then((data) => {
                const productos = data.products;
                cardProductos.innerHTML = "";
                // Genera las cards de productos
                productos.forEach((product) => {
                    const cardDiv = document.createElement("div");
                    cardDiv.className = "col-md-4";

                    cardDiv.innerHTML = `
                    <div class="card mt-5">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text fw-bold">Precio: $${product.price}</p>
                                <button class="btn btn-success mt-auto">Agregar</button>
                            </div>
                    </div>
                `;

                    // Agregar evento al botón "Agregar"
                    const botonAgregar = cardDiv.querySelector("button");
                    botonAgregar.addEventListener("click", () => {
                        agregarAlCartito(product);
                    });

                    // Añadir la card al contenedor
                    cardProductos.appendChild(cardDiv);
                });
            })
            .catch((error) => console.error("Error", error));
    }

    // Función para agregar al carrito usando localStorage
    function agregarAlCartito(product) {
        let cart = JSON.parse(localStorage.getItem("card")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} ha sido agregado al carrito!`);
    }

    // Carga inicial de productos
    fetchProductos();
}); document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-iten');
    const totalgeneral = document.getElementById('total');
    let total = 0;


    // Cargar productos en la tabla del carrito
    carritoItemsStorage.forEach(item => {
        const row = document.createElement('tr');

        // Nombre del producto
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = `$${item.title}`;
        row.appendChild(nombreCelda);

        // Precio del producto
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${item.price}`;
        row.appendChild(precioCelda);

        // Cantidad (hardcodeado a 1)
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = 1;
        row.appendChild(cantidadCelda);

        // Subtotal
        const subtotal = item.price;
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${subtotal}`;
        row.appendChild(subtotalCelda);

        // Agregar fila a la tabla
        carritoTableBody.appendChild(row);

        // Sumar al total
        total += subtotal;
    });

    // Mostrar el total
    totalgeneral.textContent = total.toFixed(2);
    // Botón para limpiar el carrito y volver al inicio
    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    // Botón para finalizar la compra con sweet Alert
    document.getElementById('pagar-carrito').addEventListener('click', () => {
        Swal.fire({
            title: 'Compra Finalizada',
            text: 'Gracias por su compra',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Limpiar el carrito después de finalizar la compra
        localStorage.removeItem('cart');

        // Redirigir al inicio despues de 4 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 4000);
    });
});