const socket = io();

const actualizarTabla = (products) => {
  const tbody = document.getElementById("cards-product");
  let html = "";
  products.forEach((product) => {
    html += `
      <div class="card" style="width: 30rem;">
      <img class="card-img-top" src="${product.thumbail}" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-stock">Stock: ${product.stock}</p>
        <p class="card-price">${product.price}</p>
        <p class="_id">ID: ${product._id}</p>
        <a class="card-enlace">add to cart</a>
       </div>
      </div>
    `;
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

document.getElementById("form-category").onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(document.getElementById("form-category"));
  const category = data.get("categorys");
  const sort = data.get("sort");
  if (category && sort) {
    const url = `?query=category,${category}&sort=${sort}`;
    window.location.href = url;
  }
};

document.getElementById("formCreate").onsubmit = handleSubmit;
document.getElementById("formDelete").onsubmit = handleDelete;
