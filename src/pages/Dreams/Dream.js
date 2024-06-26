
import { CardsList } from "../../components/CardsList";
// import products from "../../storage/products.json";
import { DreamCard } from "../Dreams/Partials/DreamCard";

/**
 * Page de la liste des produits
 * Affichage en grille uniquement
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Dream = (element) => {
  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Wish-List</h1>
      <button class="btn btn-primary btn-lg mr-3 btn-clear-wishs">Clear wish-list</button>
    </div>
    <div id="dreams-list"></div>
  `;

  const productsList = element.querySelector("#dreams-list");
  const clearWishsButton = element.querySelector(".btn-clear-wishs");

  let wish = localStorage.getItem('wish');
  let products = JSON.parse(wish) || [];
  
  // Fonction pour afficher le cart
  const render = () => {
    CardsList(productsList, products, DreamCard, ["id", "name", "price", "description", "image", "category"]);
  };

  // Event listener pour le bouton de vidage de panier
  clearWishsButton.addEventListener('click', () => {
    localStorage.removeItem('wish');
    products = [];
    let event = new Event("clearWish", { bubbles: true }); // (2)
    document.dispatchEvent(event);
    render();
  });

  // Fonction pour supprimer un produit du panier
  window.deleteProduct = (productId) => {
    products = products.filter(product => product.id != productId);
    localStorage.setItem('wish', JSON.stringify(products));
    let event = new Event("deleteWish", { bubbles: true }); // (2)
    document.dispatchEvent(event);

    render();
  };

  // Initialisation de la page
  render();
};
