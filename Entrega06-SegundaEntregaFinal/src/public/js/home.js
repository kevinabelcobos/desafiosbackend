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