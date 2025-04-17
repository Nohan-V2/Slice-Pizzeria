const $pizzasWrapper = document.querySelector(".pizzas-wrapper");
const $totalQuantity = document.querySelector(".total-quantity");
const $emptyBasket = document.querySelector(".empty-basket");
const $basketProducts = document.querySelector(".basket-products");
const $totalOrderPrice = document.querySelector(".total-order-price");
const $confirmOrderBtn = document.querySelector(".confirm-order-btn");
const $orderModalWrapper = document.querySelector(".order-modal-wrapper");
const $orderDetail = document.querySelector(".order-detail");
const $newOrderBtn = document.querySelector(".new-order-btn");

let arrayBasketPizza = [];

// Crée les éléments visuels des pizzas à partir des données
function createPizza(data) {
  data.forEach((pizza) => {
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
    $pizzaBtnAfterAddItemMoinsIcon.src = "./images/Subtract-Icon.svg";
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
    $pizzaBtnAfterAddItemPlusIcon.src = "./images/Add-Icon.svg";
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

// Diminue la quantité d'une pizza dans le panier
function decreasePizza(pizza) {
  const productInBasket = arrayBasketPizza.find((item) => item.id === pizza.id);

  if (productInBasket.quantity === 1) {
    const index = arrayBasketPizza.indexOf(productInBasket);
    arrayBasketPizza.splice(index, 1);
  } else {
    productInBasket.quantity -= 1;
  }

  $totalQuantity.textContent = parseInt($totalQuantity.textContent) - 1;

  if (arrayBasketPizza.length > 0) {
    $emptyBasket.classList.add("hidden");
  } else {
    $emptyBasket.classList.remove("hidden");
  }

  updateBasketDisplay();
}

// Augmente la quantité d'une pizza dans le panier
function increaseBasket(pizza) {
  const productInBasket = arrayBasketPizza.find((item) => item.id === pizza.id);

  if (productInBasket) {
    productInBasket.quantity += 1;
  } else {
    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      image: pizza.image,
    };
    arrayBasketPizza.push(item);
  }

  $totalQuantity.textContent = parseInt($totalQuantity.textContent) + 1;

  if (arrayBasketPizza.length > 0) {
    $emptyBasket.classList.add("hidden");
  } else {
    $emptyBasket.classList.remove("hidden");
  }

  updateBasketDisplay();
}

// Calcule le prix total de la commande
function calculateTotalOrderPrice() {
  let totalPrice = 0;

  for (let i = 0; i < arrayBasketPizza.length; i++) {
    const item = arrayBasketPizza[i];
    totalPrice += item.price * item.quantity;
  }

  $totalOrderPrice.textContent = totalPrice + "€";
}

function calculateTotalOrderPriceDetails(data) {
  let totalPrice = 0;

  for (let i = 0; i < data.products.length; i++) {
    const item = data.products[i];
    totalPrice += item.product.price * item.quantity;
  }

  $totalOrderPrice.textContent = totalPrice + "€";
}

// Affiche les détails de la commande dans la modale
function displayOrderDetails(data) {
  $orderDetail.innerHTML = "";

  data.products.forEach((pizza) => {
    const $orderDetailProductItem = document.createElement("li");
    $orderDetailProductItem.classList.add("order-detail-product-item");
    $orderDetail.appendChild($orderDetailProductItem);

    const $orderDetailProductImage = document.createElement("img");
    $orderDetailProductImage.classList.add("order-detail-product-image");
    $orderDetailProductImage.src = pizza.product.image;
    $orderDetailProductImage.alt = pizza.product.description;
    $orderDetailProductItem.appendChild($orderDetailProductImage);

    const $orderDetailProductName = document.createElement("span");
    $orderDetailProductName.classList.add("order-detail-product-name");
    $orderDetailProductName.textContent = pizza.product.name;
    $orderDetailProductItem.appendChild($orderDetailProductName);

    const $orderDetailProductQuantity = document.createElement("span");
    $orderDetailProductQuantity.classList.add("order-detail-product-quantity");
    $orderDetailProductQuantity.textContent = `${pizza.quantity}x`;
    $orderDetailProductItem.appendChild($orderDetailProductQuantity);

    const $orderDetailProductUnitPrice = document.createElement("span");
    $orderDetailProductUnitPrice.classList.add(
      "order-detail-product-unit-price"
    );
    $orderDetailProductUnitPrice.textContent = "@ " + pizza.product.price + "€";
    $orderDetailProductItem.appendChild($orderDetailProductUnitPrice);

    const $orderDetailProductTotalPrice = document.createElement("span");
    $orderDetailProductTotalPrice.classList.add(
      "order-detail-product-total-price"
    );
    $orderDetailProductTotalPrice.textContent =
      pizza.product.price * pizza.quantity + "€";
    $orderDetailProductItem.appendChild($orderDetailProductTotalPrice);
  });

  const $orderDetailTotalPrice = document.createElement("li");
  $orderDetailTotalPrice.classList.add("order-detail-total-price");
  $orderDetailTotalPrice.innerHTML = `
    <span class="total-order-title">Order total</span>
    <span class="total-order-price">${$totalOrderPrice.textContent}</span>
  `;
  $orderDetail.appendChild($orderDetailTotalPrice);
}

// Ajout d'un événement pour le bouton de confirmation de commande
$confirmOrderBtn.addEventListener("click", async () => {
  if (arrayBasketPizza.length > 0) {
    $orderModalWrapper.classList.remove("hidden");

    const orderData = await createOrder();

    calculateTotalOrderPriceDetails(orderData);

    displayOrderDetails(orderData);
  } else {
    alert(
      "Votre panier est vide. Ajoutez des pizzas avant de confirmer la commande."
    );
  }
});

// Ajout d'un événement pour le bouton $newOrderBtn
$newOrderBtn.addEventListener("click", () => {
  arrayBasketPizza = [];

  $totalQuantity.textContent = "0";

  updateBasketDisplay();

  $orderDetail.innerHTML = "";

  $totalOrderPrice.textContent = "0€";

  $orderModalWrapper.classList.add("hidden");

  $emptyBasket.classList.remove("hidden");

  document.querySelectorAll(".add-to-cart-btn").forEach(($pizzaBtn) => {
    $pizzaBtn.classList.remove("hidden");
    const $pizzaBtnAfterAddItem = $pizzaBtn.nextElementSibling;
    if ($pizzaBtnAfterAddItem) {
      $pizzaBtnAfterAddItem.classList.add("hidden");

      const $pizzaBtnAfterAddItemText =
        $pizzaBtnAfterAddItem.querySelector("span");
      if ($pizzaBtnAfterAddItemText) {
        $pizzaBtnAfterAddItemText.textContent = "1";
      }
    }
  });
});

// Met à jour l'affichage du panier
function updateBasketDisplay() {
  $basketProducts.innerHTML = "";

  arrayBasketPizza.forEach((pizza) => {
    const $basketProductItem = document.createElement("li");
    $basketProductItem.classList.add("basket-product-item");
    $basketProducts.appendChild($basketProductItem);

    const $basketProductItemName = document.createElement("span");
    $basketProductItemName.classList.add("basket-product-item-name");
    $basketProductItemName.textContent = pizza.name;
    $basketProductItem.appendChild($basketProductItemName);

    const $basketProductDetails = document.createElement("div");
    $basketProductDetails.classList.add("basket-product-details");
    $basketProductItem.appendChild($basketProductDetails);

    const $basketProductDetailsQuantity = document.createElement("span");
    $basketProductDetailsQuantity.classList.add(
      "basket-product-details-quantity"
    );
    $basketProductDetailsQuantity.textContent = `${pizza.quantity}x`;
    $basketProductDetails.appendChild($basketProductDetailsQuantity);

    const $basketProductDetailsUnitPrice = document.createElement("span");
    $basketProductDetailsUnitPrice.classList.add(
      "basket-product-details-unit-price"
    );
    $basketProductDetailsUnitPrice.textContent = "@ " + pizza.price + "€";
    $basketProductDetails.appendChild($basketProductDetailsUnitPrice);

    const $basketProductDetailstotalPrice = document.createElement("span");
    $basketProductDetailstotalPrice.classList.add(
      "basket-product-details-total-price"
    );
    $basketProductDetailstotalPrice.textContent =
      pizza.price * pizza.quantity + "€";
    $basketProductDetails.appendChild($basketProductDetailstotalPrice);

    const $basketProductRemoveIcon = document.createElement("img");
    $basketProductRemoveIcon.classList.add("basket-product-remove-icon");
    $basketProductRemoveIcon.src = "../images/Remove-Icon.svg";
    $basketProductRemoveIcon.addEventListener("click", () => {
      arrayBasketPizza = arrayBasketPizza.filter(
        (item) => item.id !== pizza.id
      );

      let totalQuantity = 0;
      for (let i = 0; i < arrayBasketPizza.length; i++) {
        totalQuantity += arrayBasketPizza[i].quantity;
      }
      $totalQuantity.textContent = totalQuantity;

      if (arrayBasketPizza.length > 0) {
        $emptyBasket.classList.add("hidden");
      } else {
        $emptyBasket.classList.remove("hidden");
      }

      const $pizzaBtn = document.querySelector(
        `.add-to-cart-btn[data-id="${pizza.id}"]`
      );
      const $pizzaBtnAfterAddItem = $pizzaBtn.nextElementSibling;
      if ($pizzaBtn && $pizzaBtnAfterAddItem) {
        $pizzaBtn.classList.remove("hidden");
        $pizzaBtnAfterAddItem.classList.add("hidden");

        const $pizzaBtnAfterAddItemText =
          $pizzaBtnAfterAddItem.querySelector("span");
        if ($pizzaBtnAfterAddItemText) {
          $pizzaBtnAfterAddItemText.textContent = 1;
        }
      }

      updateBasketDisplay();
    });
    $basketProductItem.appendChild($basketProductRemoveIcon);
  });

  calculateTotalOrderPrice();
}

// Récupère les données des pizzas depuis l'API
async function fetchPizza() {
  const response = await fetch(
    "https://prime-garfish-currently.ngrok-free.app/products",
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  createPizza(data);
}

// Créer une commande dans l'API
async function createOrder() {
  const response = await fetch(
    "https://prime-garfish-currently.ngrok-free.app/orders",
    {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        products: arrayBasketPizza.map((pizza) => ({
          uuid: pizza.id,
          quantity: pizza.quantity,
        })),
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  return data;
}

fetchPizza();
