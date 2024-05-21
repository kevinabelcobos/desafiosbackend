const socket = io();

const actualizarTabla = (products) => {
  const tbody = document.getElementById("tbody");
  let html = "";
  products.forEach((product) => {
    html += `<tr>
                    <td>${product._id}</td>
                    <td>${product.title}</td>
                    <td>${product.descripcion}</td>
                    <td>${product.code}</td>
                    <td>${product.price}</td>
                    <td>${product.status}</td>
                    <td>${product.stock}</td>
                    <td>${product.category}</td>
                    <td>${product.thumbail}</td>
                </tr>`;
  });
  tbody.innerHTML = html;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData(document.getElementById("formCreate"));

  const product = {
    title: data.get("title"),
    descripcion: data.get("descripcion"),
    code: data.get("code"),
    price: parseInt(data.get("price")),
    status: parseInt(data.get("status")),
    stock: parseInt(data.get("stock")),
    category: data.get("category"),
    thumbail: data.get("thumbail"),
  };

  socket.emit("new-product", product);

  socket.on("reload-table", (products) => {
    actualizarTabla(products);
  });
};

const handleDelete = (e) => {
  e.preventDefault();

  const data = new FormData(document.getElementById("formDelete"));

  const id = data.get("id");

  socket.emit("delete-product", id);

  socket.on("reload-table", (products) => {
    actualizarTabla(products);
  });
};

document.getElementById("formCreate").onsubmit = handleSubmit;
document.getElementById("formDelete").onsubmit = handleDelete;
