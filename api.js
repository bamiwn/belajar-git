const output = document.getElementById('products');
let baseURL = 'https://dummyjson.com/products';

fetch(baseURL)
  .then((res) => res.json())
  .then((data) => {
    let result = '';

    console.log(data.products);

    data.products.forEach((p) => {
      if (!p.isDeleted) {
        result += `
          <div id="${p.id}" class="card col-sm-12 col-md-6 col-lg-4 mb-4">
              <img src="${p.thumbnail}" class="card-img-top">
              <div class="card-body">
                  <h5 class="card-title">${p.title}</h5>
                  <p class="card-text">${p.description}</p>
                  <a href="${baseURL + '/' + p.id}" class="btn btn-success">Order Sekarang</a>
                  <button class="btn btn-danger" onclick="deletedItem(${p.id})">Delete</button>
              </div>
          </div>
          `;
      }
    });

    output.innerHTML = result;
  });

function deletedItem(itemID) {
  const id = document.getElementById(itemID);

  id.addEventListener(
    'click',
    () => {
      fetch(`${baseURL}/${itemID}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => data);
    },
    { once: true }
  );
}
