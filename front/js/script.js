let productsData = [];
const product = document.getElementById('items');


const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (productsData = data));

    console.log(productsData);
};

const productsDetails = async () => {
    await fetchProducts();
    product.innerHTML = (
        productsData.map(kanap => (
            `<a href="./product.html?id=${kanap._id}">
             <article>
               <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
               <h3 class="productName">${kanap.name}</h3>
               <p class="productDescription">${kanap.description}</p>
             </article>
          </a>`
        )).join('')
    );
};

productsDetails();