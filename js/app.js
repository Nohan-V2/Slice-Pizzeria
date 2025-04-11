const $pizzasWrapper = document.querySelector(".pizzas-wrapper");
const $emptyBasket = document.querySelector(".empty-basket");
const $basketProducts = document.querySelector(".basket-products");

let arrayBasketPizza = [];

function createPizza(data) {
  data.forEach((pizza) => {
    // create Pizza Items
    const $pizzaItem = document.createElement("div");
    $pizzaItem.classList.add("pizza-item");
    $pizzasWrapper.appendChild($pizzaItem);
    const $pizzaPicture = document.createElement("img");
    $pizzaPicture.classList.add("pizza-picture");
    $pizzaPicture.src = pizza.image;
    $pizzaPicture.alt = pizza.name;
    $pizzaItem.appendChild($pizzaPicture);

    const $pizzaBtn = document.createElement("span");
    $pizzaBtn.classList.add("add-to-cart-btn");
    $pizzaBtn.innerHTML = `<img src="../images/carbon_shopping-cart-plus.svg"alt=""srcset=""/> Ajouter au panier`;
    $pizzaBtn.setAttribute("data-id", pizza.id);
    $pizzaItem.appendChild($pizzaBtn);

    $pizzaBtn.addEventListener("click", () => {
      increaseBasket(pizza);

      $pizzaBtnAfterAddItem.classList.remove("hidden");
      $pizzaBtn.classList.add("hidden");
    });

    const $pizzaBtnAfterAddItem = document.createElement("span");
    $pizzaBtnAfterAddItem.classList.add("add-to-cart-btn-after-add-item");
    $pizzaBtnAfterAddItem.classList.add("hidden");
    $pizzaItem.appendChild($pizzaBtnAfterAddItem);

    const $pizzaBtnAfterAddItemMoinsIcon = document.createElement("img");
    $pizzaBtnAfterAddItemMoinsIcon.src = "../images/Subtract-Icon.svg";
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemMoinsIcon);

    $pizzaBtnAfterAddItemMoinsIcon.addEventListener("click", () => {
      decreasePizza(pizza);

      if ($pizzaBtnAfterAddItemText.textContent === "1") {
        $pizzaBtnAfterAddItem.classList.add("hidden");
        $pizzaBtn.classList.remove("hidden");
      } else {
        $pizzaBtnAfterAddItemText.textContent--;
      }
    });

    const $pizzaBtnAfterAddItemText = document.createElement("span");
    $pizzaBtnAfterAddItemText.textContent = 1;
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemText);

    const $pizzaBtnAfterAddItemPlusIcon = document.createElement("img");
    $pizzaBtnAfterAddItemPlusIcon.src = "../images/Add-Icon.svg";
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemPlusIcon);

    $pizzaBtnAfterAddItemPlusIcon.addEventListener("click", () => {
      increaseBasket(pizza);

      $pizzaBtnAfterAddItemText.textContent++;
    });

    const $pizzaInfos = document.createElement("ul");
    $pizzaInfos.classList.add("pizza-infos");
    $pizzaItem.appendChild($pizzaInfos);

    const $pizzaName = document.createElement("li");
    $pizzaName.classList.add("pizza-name");
    $pizzaName.textContent = pizza.name;
    $pizzaInfos.appendChild($pizzaName);

    const $pizzaPrice = document.createElement("li");
    $pizzaPrice.classList.add("pizza-price");
    $pizzaPrice.textContent = pizza.price + "€";
    $pizzaInfos.appendChild($pizzaPrice);

    return pizza;
  });
}

function decreasePizza(pizza) {
  const productInBasket = arrayBasketPizza.find((item) => item.id === pizza.id);
  console.log(productInBasket);
  console.log(pizza.id + "zzz ");

  if (productInBasket.quantity === 1) {
    const index = arrayBasketPizza.indexOf(productInBasket);
    arrayBasketPizza.splice(index, 1);
  } else {
    productInBasket.quantity -= 1;
  }
}

function increaseBasket(pizza) {
  const productInBasket = arrayBasketPizza.find((item) => item.id === pizza.id);
  console.log(productInBasket);
  if (productInBasket) {
    productInBasket.quantity += 1;
  } else {
    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
    };
    arrayBasketPizza.push(item);
  }

  displayPizza();
}

function displayPizza(pizza) {}

async function fetchPizza() {
  const response = await fetch("../products.json");
  // const response = await fetch("http://10.59.122.27:3000/products");
  const data = await response.json();
  // console.log(data);

  createPizza(data);
}

fetchPizza();
