import { CardsList } from "../../components/CardsList";
import { CartCard } from "../Cart/Partials/CartCard";

/**
 * Page de la liste des produits
 * Affichage en grille uniquement
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Cart = (element) => {
  element.innerHTML = `
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-between">
      <h1>Cart</h1>
      <button class="btn btn-primary btn-lg mr-3 btn-clear-cart">Clear cart</button>
    </div>
    <div id="products-list"></div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <h3 id="total-price">Total: $0</h3>
      <button class="btn btn-success btn-lg btn-checkout">Checkout</button>
    </div>
  </div>
  `;

  const productsList = element.querySelector("#products-list");
  const clearCartButton = element.querySelector(".btn-clear-cart");
  const checkoutButton = element.querySelector(".btn-checkout");
  const totalPriceElement = element.querySelector("#total-price");

  let cart = localStorage.getItem('cart');
  let products = JSON.parse(cart) || [];

  // Fonction pour afficher le cart
  const render = () => {
    productsList.innerHTML = products.map(product => `
      <div class="card mb-3" style="height: 300px;">
        <div class="row no-gutters d-flex flex-shrink-1">
          <div class="col-md-4">
            <img src="${product.image}" class="card-img h-50" alt="${product.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><small class="text-muted">Price: $${product.price}</small></p>
              <div class="d-flex align-items-center">
                <button class="btn btn-outline-secondary btn-sm btn-decrease" data-id="${product.id}">-</button>
                <span class="mx-2">${product.quantite}</span>
                <button class="btn btn-outline-secondary btn-sm btn-increase" data-id="${product.id}">+</button>
              </div>
              <button class="btn btn-danger btn-sm mt-2 btn-delete" data-id="${product.id}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-increase').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        updateQuantity(productId, 1);
      });
    });

    document.querySelectorAll('.btn-decrease').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        updateQuantity(productId, -1);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        console.log(productId);
        deleteProduct(productId);
      });
    });

    updateTotalPrice();
  };

  // Fonction pour mettre à jour le prix total
  const updateTotalPrice = () => {
    const totalPrice = products.reduce((total, product) => total + (product.price * product.quantite), 0);
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  };


  const updateQuantity = (productId, change) => {
    const product = products.find(product => product.id == productId);
    if (product) {
      if (change > 0) {
        // Увеличение количества
        product.quantite += change;
        localStorage.setItem('cart', JSON.stringify(products));
        let event = new CustomEvent("addQuantity", {
          detail: { productId: productId, change: change }
        });
        document.dispatchEvent(event);

      } else if (change < 0) {

        product.quantite += change;
        if (product.quantite <= 0) {
          product.quantite = 0;
          deleteProduct(productId);
          let event = new CustomEvent("deleteQuantity", {
            detail: { productId: productId, change: change }
          });
          document.dispatchEvent(event);
          return;
        }
        localStorage.setItem('cart', JSON.stringify(products));

      }
      render();
    }
  };



  const deleteProduct = (productId) => {
    let deletedProducts = products.filter(product => product.id == productId);
    products = products.filter(product => product.id != productId);
    localStorage.setItem('cart', JSON.stringify(products));
    let event = new CustomEvent("delete", {
      detail: {
        productId: productId,
        deletedCount: deletedProducts.reduce((sum, product) => sum + product.quantite, 0)
      }
    });
    document.dispatchEvent(event);
    console.log(products);
    render();
  };

  // Event listener pour le bouton de vidage de panier
  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    products = [];
    let event = new Event("clear", { bubbles: true });
    document.dispatchEvent(event);
    render();
  });

  // Event listener pour le bouton d'achat
  checkoutButton.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    products = [];
    render();
  });

  // Initialisation de la page
  render();
};
