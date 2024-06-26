import { CardsList } from "../../components/CardsList";
import products from "../../storage/products.json";
import { ProductCard } from "./Partials/ProductCard";

/**
 * Page de la liste des produits
 * Affichage en grille uniquement
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Products = (element) => {
  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Produits</h1>
    </div>
    <div id="products-list"></div>
  `;

  const productsList = element.querySelector("#products-list");

  // Fonction pour afficher les produits
  const render = () => {
    CardsList(productsList, products, ProductCard, ["id", "name", "price", "description", "image", "category"]);
  };

  // Initialisation de la page
  render();

  // Récupération des boutons "Ajouter au panier"
  let buttonsArray = document.querySelectorAll(".btn-add-cart");
  console.log(buttonsArray);

  // Ajout d'un événement de clic à chaque bouton "Ajouter au panier"
  buttonsArray.forEach(btn => btn.onclick = addProdCart);

  // Fonction pour ajouter un produit au panier
  function addProdCart(e) {
    e.preventDefault(); // Empêche le comportement par défaut du clic
    e.stopPropagation(); // Empêche la propagation de l'événement
    let prodId = this.getAttribute("data-id");

    // Récupération du produit correspondant à l'ID
    let product = products.filter(product => product.id == prodId)[0];

    // Récupération du panier depuis localStorage
    let cart = localStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // Vérifie si le produit est déjà dans le panier
    const index = cart.findIndex(obj => obj.id === product.id);
    if (index === -1) {
      product.quantite = 1; // Ajout du produit avec une quantité initiale de 1
      cart.push(product);
    } else {
      cart[index].quantite++; // Augmentation de la quantité si le produit est déjà dans le panier
    }

    // Sauvegarde du panier mis à jour dans localStorage
    cart = JSON.stringify(cart);
    localStorage.setItem('cart', cart);

    // Déclenchement d'un événement personnalisé pour indiquer l'ajout au panier
    let event = new Event("add", { bubbles: true });
    document.dispatchEvent(event);
  }

  // Récupération des boutons "Ajouter à la liste de souhaits"
  let buttonsArrayWish = document.querySelectorAll(".btn-add-wish");

  // Ajout d'un événement de clic à chaque bouton "Ajouter à la liste de souhaits"
  buttonsArrayWish.forEach(btn => btn.onclick = addProdWish);

  // Fonction pour ajouter un produit à la liste de souhaits
  function addProdWish(e) {
    e.preventDefault(); // Empêche le comportement par défaut du clic
    e.stopPropagation(); // Empêche la propagation de l'événement
    let prodId = this.getAttribute("data-id");

    // Récupération du produit correspondant à l'ID
    let product = products.filter(product => product.id == prodId)[0];

    // Récupération de la liste de souhaits depuis localStorage
    let wish = localStorage.getItem('wish');
    if (wish) {
      wish = JSON.parse(wish);
    } else {
      wish = [];
    }

    // Vérifie si le produit est déjà dans la liste de souhaits
    const index = wish.findIndex(obj => obj.id === product.id);
    if (index === -1) {
      wish.push(product); // Ajout du produit à la liste de souhaits
    }

    // Sauvegarde de la liste de souhaits mise à jour dans localStorage
    wish = JSON.stringify(wish);
    localStorage.setItem('wish', wish);

    // Déclenchement d'un événement personnalisé pour indiquer l'ajout à la liste de souhaits
    let event = new Event("addWish", { bubbles: true });
    document.dispatchEvent(event);
  }
};

