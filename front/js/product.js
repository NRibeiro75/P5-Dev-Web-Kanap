  const urlSearchParams = new URLSearchParams(window.location.search);
  // console.log(urlSearchParams);

  const Id = urlSearchParams.get('id');
  // console.log(Id);

  const name = urlSearchParams.get('name');


  document.title = name;

  const url = 'http://localhost:3000/api/products/' + Id;
  const Img = document.querySelector('.item__img');
  const Title = document.getElementById('title');
  const Price = document.getElementById('price');
  const Description = document.getElementById('description');
  const Quantity = document.getElementById('quantity');
  const Colors = document.getElementById('colors');



  const fetchProduct = async () => {
    product = await fetch(url)
      .then(res => res.json())
      .then((data) => (productsData = data));
    console.log(productsData);

    document.title = productsData.name;
    Img.innerHTML = `<img src="${productsData.imageUrl}" alt="${productsData.altTxt}"></img>`;
    Title.innerHTML = productsData.name;
    Price.innerHTML = productsData.price;
    Description.innerHTML = productsData.description;
    for (let colors of productsData.colors) {
      Colors.innerHTML += `<option value="${colors}">${colors}</option>`;
    }
  }
  fetchProduct();

  const btn_addToCart = document.getElementById("addToCart");


  btn_addToCart.addEventListener("click", (e) => {
    e.preventDefault();

    // localStorage.setItem("cart", JSON.stringify([]));
    // var panier = JSON.parse(localStorage.getItem("cart"));
    // console.log(panier);
    // panier.push({
    //   "id": 1,
    //   "quantity": 2,
    //   "couleur": "rouge",
    // })
    // localStorage.setItem("cart", JSON.stringify(panier));




    // const colorItem = Colors.value;
    const quantityItem = Quantity.value;

    const productList = {
      //altTxt: productsData.altTxt,
      colors: colors.value,
      //image: productsData.imageUrl,
      //name: productsData.name,
      //price: productsData.price,
      quantity: Number(quantityItem),
      _id: Id,
    };
    console.log(productList);



    let panier = JSON.parse(localStorage.getItem("cart"));
    console.log(panier);

   
    const addPopUp = () => {

      if (window.confirm(`${productsData.name} 
color: ${colors.value} 
A bien été ajouté au panier
Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
        window.location.href = "cart.html";
      } else {
        window.location.href = "index.html";
      }
    }
  
    if (panier) {
      panier.push(productList);
      localStorage.setItem("cart", JSON.stringify(panier));
      console.log(panier);
      // conditionPopUp();
      addPopUp();
    } else {
      panier = [];
      panier.push(productList);
      localStorage.setItem("cart", JSON.stringify(panier));
      console.log(panier);
      // conditionPopUp();
      addPopUp();
    }


  });