import { CardsList } from "../../components/CardsList";
// import products from "../../storage/products.json";
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
    <div class="d-flex justify-content-between">
      <h1>Cart</h1>
      <button class="btn btn-primary btn-lg mr-3 btn-clear-cart">Clear cart</button>
    </div>
    <div id="products-list"></div>
  `;

  const productsList = element.querySelector("#products-list");
  const clearCartButton = element.querySelector(".btn-clear-cart");

  let cart = localStorage.getItem('cart');
  let products = JSON.parse(cart) || [];
  console.log(products.length);
  // Fonction pour afficher le cart
  const render = () => {
    CardsList(productsList, products, CartCard, ["id", "name", "price", "description", "image", "category"]);
  };

  // Event listener pour le bouton de vidage de panier
  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    products = [];
    let event = new Event("clear", { bubbles: true }); // (2)
    document.dispatchEvent(event);
    render();
  });

  // Fonction pour supprimer un produit du panier
  window.deleteProduct = (productId) => {
    products = products.filter(product => product.id != productId);
    localStorage.setItem('cart', JSON.stringify(products));
    let event = new Event("delete", { bubbles: true }); // (2)
    document.dispatchEvent(event);

    render();
  };

  // Initialisation de la page
  render();
};
