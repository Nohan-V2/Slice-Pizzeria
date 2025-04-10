const $pizzasWrapper = document.querySelector(".pizzas-wrapper");
const $emptyBasket = document.querySelector(".empty-basket");
const $basketProducts = document.querySelector(".basket-products");
const $totalQuantity = document.querySelector(".total-quantity");
const $totalOrderPrice = document.querySelector(".total-order-price");
const $pizzaBtn = document.querySelector(".add-to-cart-btn");

let arrayBasketPizza = [];

async function fetchPizza() {
  const response = await fetch("http://10.59.122.27:3000/products");
  const data = await response.json();
  // console.log(data);

  //   Create pizza item
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
    $pizzaItem.appendChild($pizzaBtn);

    const $pizzaBtnAfterAddItem = document.createElement("span");
    $pizzaBtnAfterAddItem.classList.add("add-to-cart-btn-after-add-item");
    $pizzaBtnAfterAddItem.classList.add("hidden");
    $pizzaItem.appendChild($pizzaBtnAfterAddItem);

    const $pizzaBtnAfterAddItemMoinsIcon = document.createElement("img");
    $pizzaBtnAfterAddItemMoinsIcon.src = "../images/Subtract-Icon.svg";
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemMoinsIcon);

    const $pizzaBtnAfterAddItemText = document.createElement("span");
    $pizzaBtnAfterAddItemText.textContent = 0;
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemText);

    const $pizzaBtnAfterAddItemPlusIcon = document.createElement("img");
    $pizzaBtnAfterAddItemPlusIcon.src = "../images/Add-Icon.svg";
    $pizzaBtnAfterAddItem.appendChild($pizzaBtnAfterAddItemPlusIcon);

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

    //   ----------------------------------------------

    // Create Items basket
    const $basketProductItem = document.createElement("li");
    $basketProductItem.classList.add("basket-product-item");
    $basketProductItem.classList.add("hidden");
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
    $basketProductDetailsQuantity.textContent = 1;
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
      pizza.price * $basketProductDetailsQuantity.textContent + "€";
    $basketProductDetails.appendChild($basketProductDetailstotalPrice);

    const $basketProductRemoveIcon = document.createElement("img");
    $basketProductRemoveIcon.classList.add("basket-product-remove-icon");
    $basketProductRemoveIcon.src = "../images/Remove-Icon.svg";
    $basketProductItem.appendChild($basketProductRemoveIcon);

    //   ----------------------------------------------

    // Première fois qu'on appuie sur ajouter au panier
    function oneClickBtn() {
      $totalQuantity.textContent++;
      $pizzaBtnAfterAddItemText.textContent = 1;
      $basketProductDetailsQuantity.textContent = 1;
    }

    // retire dans le panier
    function reducteBasket() {
      $totalQuantity.textContent--;
      $pizzaBtnAfterAddItemText.textContent--;
      $basketProductDetailsQuantity.textContent--;
    }

    // ajoute dans le panier
    function addBasket() {
      $totalQuantity.textContent++;
      $pizzaBtnAfterAddItemText.textContent++;
      $basketProductDetailsQuantity.textContent++;
    }

    // Calcule le prix total
    function totalPrice() {
      $basketProductDetailstotalPrice.textContent =
        pizza.price * $basketProductDetailsQuantity.textContent + "€";

      let totalPrice = 0;
      setTimeout(() => {
        document.querySelectorAll(".basket-product-item").forEach((item) => {
          if (!item.classList.contains("hidden")) {
            totalPrice += Number(
              item
                .querySelector(".basket-product-details-total-price")
                .textContent.replace("€", "")
            );
          }
        });

        document.querySelector(".total-order-price").textContent =
          totalPrice + "€";
      });
    }

    //   ----------------------------------------------

    const allItems = document.querySelectorAll(".basket-product-item");

    // One click for buy
    $pizzaBtn.addEventListener("click", (e) => {
      oneClickBtn();

      totalPrice();

      $basketProductItem.classList.remove("hidden");

      if ($emptyBasket) {
        $emptyBasket.classList.add("hidden");
      }

      // Si le btn n'a jamais été cliqué, on l'ajoute au tableau
      if ($pizzaBtn) {
        $pizzaBtn.classList.add("hidden");
        $pizzaBtnAfterAddItem.classList.remove("hidden");
        $pizzaPicture.style.border = "2px solid var(--tia-maria)";
        arrayBasketPizza.push(pizza);
      }
    });

    // reducte the quantity of the pizza in the basket
    $pizzaBtnAfterAddItemMoinsIcon.addEventListener("click", (e) => {
      reducteBasket();

      totalPrice();

      if ($pizzaBtnAfterAddItemText.textContent == 0) {
        $pizzaBtn.classList.remove("hidden");
        $pizzaBtnAfterAddItem.classList.add("hidden");
        $pizzaPicture.style.border = "none";
        $basketProductItem.classList.add("hidden");
      }

      arrayBasketPizza.forEach((item) => {
        if (item.classList.contains("hidden")) {
          $emptyBasket.classList.remove("hidden");
        }
      });
    });

    // add the quantity of the pizza in the basket
    $pizzaBtnAfterAddItemPlusIcon.addEventListener("click", (e) => {
      addBasket();

      totalPrice();
    });

    $basketProductRemoveIcon.addEventListener("click", (e) => {
      $basketProductItem.classList.add("hidden");

      allItems.forEach((item) => {
        if (item.classList.contains("hidden")) {
          $emptyBasket.classList.remove("hidden");
        }
      });
    });
  });
}

fetchPizza();
