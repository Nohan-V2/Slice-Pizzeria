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

function createPizza(data) {
  data.forEach((pizza) => {
    // create Pizza Items
    const $pizzaItem = document.createElement("div");
    $pizzaItem.classList.add("pizza-item");
    $pizzasWrapper.appendChild($pizzaItem);
    const $pizzaPicture = document.createElement("img");
    $pizzaPicture.classList.add("pizza-picture");
    $pizzaPicture.src = pizza.image; // Utilisation directe de l'URL absolue
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
    $pizzaBtnAfterAddItemMoinsIcon.src = "./images/Subtract-Icon.svg"; // Correction du chemin
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
    $pizzaBtnAfterAddItemPlusIcon.src = "./images/Add-Icon.svg"; // Correction du chemin
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

  if (productInBasket.quantity === 1) {
    // Si la quantité est de 1, on supprime le produit du panier
    const index = arrayBasketPizza.indexOf(productInBasket);
    arrayBasketPizza.splice(index, 1);
  } else {
    // Sinon, on diminue la quantité
    productInBasket.quantity -= 1;
  }

  // Met à jour la quantité totale affichée
  $totalQuantity.textContent = parseInt($totalQuantity.textContent) - 1;

  if (arrayBasketPizza.length > 0) {
    $emptyBasket.classList.add("hidden");
  } else {
    // Si le panier est vide, on affiche le message de panier vide
    $emptyBasket.classList.remove("hidden");
  }

  // Met à jour l'affichage du panier
  updateBasketDisplay();
}

function increaseBasket(pizza) {
  const productInBasket = arrayBasketPizza.find((item) => item.id === pizza.id);

  if (productInBasket) {
    // Si le produit est déjà dans le panier, on augmente sa quantité
    productInBasket.quantity += 1;
  } else {
    // Sinon, on l'ajoute au panier avec toutes ses propriétés
    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      image: pizza.image, // Ajout de l'image
    };
    arrayBasketPizza.push(item);
  }

  // Met à jour la quantité totale affichée
  $totalQuantity.textContent = parseInt($totalQuantity.textContent) + 1;

  if (arrayBasketPizza.length > 0) {
    $emptyBasket.classList.add("hidden");
  } else {
    $emptyBasket.classList.remove("hidden");
  }

  // Met à jour l'affichage du panier
  updateBasketDisplay();
}

// Fonction pour calculer le prix total de la commande
function calculateTotalOrderPrice() {
  const totalPrice = arrayBasketPizza.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  $totalOrderPrice.textContent = totalPrice.toFixed(2) + "€";
}

// Fonction pour afficher les détails de la commande dans $orderDetail
function displayOrderDetails() {
  $orderDetail.innerHTML = ""; // Vide le contenu actuel de $orderDetail

  arrayBasketPizza.forEach((pizza) => {
    console.log("Image path:", pizza.image); // Vérifie la valeur de pizza.image

    const $orderDetailProductItem = document.createElement("li");
    $orderDetailProductItem.classList.add("order-detail-product-item");
    $orderDetail.appendChild($orderDetailProductItem);

    const $orderDetailProductImage = document.createElement("img");
    $orderDetailProductImage.classList.add("order-detail-product-image");
    $orderDetailProductImage.src = pizza.image; // Utilisation directe de l'URL absolue
    $orderDetailProductImage.alt = pizza.name;
    $orderDetailProductItem.appendChild($orderDetailProductImage);

    const $orderDetailProductName = document.createElement("span");
    $orderDetailProductName.classList.add("order-detail-product-name");
    $orderDetailProductName.textContent = pizza.name;
    $orderDetailProductItem.appendChild($orderDetailProductName);

    const $orderDetailProductQuantity = document.createElement("span");
    $orderDetailProductQuantity.classList.add("order-detail-product-quantity");
    $orderDetailProductQuantity.textContent = `${pizza.quantity}x`; // Ajout du "x"
    $orderDetailProductItem.appendChild($orderDetailProductQuantity);

    const $orderDetailProductUnitPrice = document.createElement("span");
    $orderDetailProductUnitPrice.classList.add(
      "order-detail-product-unit-price"
    );
    $orderDetailProductUnitPrice.textContent = pizza.price + "€";
    $orderDetailProductItem.appendChild($orderDetailProductUnitPrice);

    const $orderDetailProductTotalPrice = document.createElement("span");
    $orderDetailProductTotalPrice.classList.add(
      "order-detail-product-total-price"
    );
    $orderDetailProductTotalPrice.textContent =
      (pizza.price * pizza.quantity).toFixed(2) + "€";
    $orderDetailProductItem.appendChild($orderDetailProductTotalPrice);
  });

  // Conserver le total général dans order-detail
  const $orderDetailTotalPrice = document.createElement("li");
  $orderDetailTotalPrice.classList.add("order-detail-total-price");
  $orderDetailTotalPrice.innerHTML = `
    <span class="total-order-title">Order total</span>
    <span class="total-order-price">${$totalOrderPrice.textContent}</span>
  `;
  $orderDetail.appendChild($orderDetailTotalPrice);
}

// Ajout d'un événement pour le bouton de confirmation de commande
$confirmOrderBtn.addEventListener("click", () => {
  if (arrayBasketPizza.length > 0) {
    // Affiche la fenêtre modale de commande
    $orderModalWrapper.classList.remove("hidden");

    // Met à jour le prix total dans la fenêtre modale
    calculateTotalOrderPrice();

    // Affiche les détails de la commande
    displayOrderDetails();
  } else {
    alert(
      "Votre panier est vide. Ajoutez des pizzas avant de confirmer la commande."
    );
  }
});

// Ajout d'un événement pour le bouton $newOrderBtn
$newOrderBtn.addEventListener("click", () => {
  // Réinitialise le panier
  arrayBasketPizza = [];

  // Réinitialise la quantité totale
  $totalQuantity.textContent = "0";

  // Réinitialise l'affichage du panier
  updateBasketDisplay();

  // Réinitialise l'affichage de $orderDetail
  $orderDetail.innerHTML = "";

  // Réinitialise le prix total
  $totalOrderPrice.textContent = "0.00€";

  // Masque la fenêtre modale
  $orderModalWrapper.classList.add("hidden");

  // Réinitialise les boutons "Ajouter au panier" et "après ajout"
  document.querySelectorAll(".add-to-cart-btn").forEach(($pizzaBtn) => {
    $pizzaBtn.classList.remove("hidden");
    const $pizzaBtnAfterAddItem = $pizzaBtn.nextElementSibling;
    if ($pizzaBtnAfterAddItem) {
      $pizzaBtnAfterAddItem.classList.add("hidden");

      // Réinitialise le compteur de quantité dans $pizzaBtnAfterAddItem
      const $pizzaBtnAfterAddItemText =
        $pizzaBtnAfterAddItem.querySelector("span");
      if ($pizzaBtnAfterAddItemText) {
        $pizzaBtnAfterAddItemText.textContent = "1";
      }
    }
  });
});

// Appel de la fonction pour mettre à jour le prix total à chaque modification du panier
function updateBasketDisplay() {
  // Vide le contenu actuel du panier
  $basketProducts.innerHTML = "";

  // Parcourt les produits du panier et les affiche
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
    $basketProductDetailsQuantity.textContent = pizza.quantity;
    $basketProductDetails.appendChild($basketProductDetailsQuantity);

    const $basketProductDetailsUnitPrice = document.createElement("span");
    $basketProductDetailsUnitPrice.classList.add(
      "basket-product-details-unit-price"
    );
    $basketProductDetailsUnitPrice.textContent = pizza.price + "€";
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
      // Retirer complètement l'élément du panier
      arrayBasketPizza = arrayBasketPizza.filter(
        (item) => item.id !== pizza.id
      );

      // Mettre à jour la quantité totale affichée
      $totalQuantity.textContent = arrayBasketPizza.reduce(
        (total, item) => total + item.quantity,
        0
      );

      // Vérifier si le panier est vide
      if (arrayBasketPizza.length > 0) {
        $emptyBasket.classList.add("hidden");
      } else {
        $emptyBasket.classList.remove("hidden");
      }

      // Réinitialiser le bouton "Ajouter au panier" et le bouton "après ajout"
      const $pizzaBtn = document.querySelector(
        `.add-to-cart-btn[data-id="${pizza.id}"]`
      );
      const $pizzaBtnAfterAddItem = $pizzaBtn.nextElementSibling; // Bouton "après ajout"
      if ($pizzaBtn && $pizzaBtnAfterAddItem) {
        $pizzaBtn.classList.remove("hidden");
        $pizzaBtnAfterAddItem.classList.add("hidden");

        // Réinitialiser le compteur de quantité dans $pizzaBtnAfterAddItem
        const $pizzaBtnAfterAddItemText =
          $pizzaBtnAfterAddItem.querySelector("span");
        if ($pizzaBtnAfterAddItemText) {
          $pizzaBtnAfterAddItemText.textContent = 1;
        }
      }

      // Mettre à jour l'affichage du panier
      updateBasketDisplay();
    });
    $basketProductItem.appendChild($basketProductRemoveIcon);
  });

  // Met à jour le prix total de la commande
  calculateTotalOrderPrice();
}

async function fetchPizza() {
  const response = await fetch("../products.json");
  // const response = await fetch("http://10.59.122.27:3000/products");
  const data = await response.json();
  // console.log(data);

  createPizza(data);
}

fetchPizza();
