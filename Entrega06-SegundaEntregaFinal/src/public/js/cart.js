const addProduct = (id) => {
  const cid = "64cef69c04a0aed82a3489ab";
  const pid = id;

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: 1 }),
  };

  fetch(`/api/carts/${cid}/product/${pid}`, request)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("Error adding product to cart:", err);
    });
};

const deleteProduct = (id) => {
  const cid = "64cef69c04a0aed82a3489ab";
  const pid = id;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`/api/carts/${cid}/products/${pid}`, requestOptions)
    .then((response) => {
      if (response.status === 204) {
        console.log("Producto eliminado exitosamente");
      } else {
        console.error(
          "Error al eliminar el producto. Código de estado:",
          response.status
        );
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
    });
};

// obtengo el número de productos en el carrito
fetch("/cart/count")
  .then((response) => response.json())
  .then((data) => {
    console.log(
      (document.getElementById("countCart").textContent = data.count)
    );
  })
  .catch((error) => {
    console.error(
      "Error al obtener el número de productos en el carrito:",
      error
    );
  });
