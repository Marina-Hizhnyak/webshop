import categories from "../../storage/categories.json";
import products from "../../storage/products.json";
import { CardsList } from "../../components/CardsList";
import { ProductCard } from "../Products/Partials/ProductCard";

/**
 * Page des détails d'une catégorie
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Categorie = (element) => {
  // On récupère l'identifiant de la catégorie depuis l'URL
  const url = new URL(window.location.href);
  const categorieId = parseInt(url.searchParams.get("id"));

  // Si la catégorie n'existe pas, on affiche un message d'erreur
  if (!categorieId) {
    element.innerHTML = `
      <h1>Catégorie non trouvée</h1>
      <p>La catégorie avec l'identifiant ${categorieId} n'existe pas.</p>
      `;
    return;
  }

  // On récupère la catégorie correspondante à l'identifiant
  const productCat = categories.find((categorie) => categorie.id === categorieId);

  // On filtre les produits appartenant à cette catégorie
  const productsCategorie = products.filter((product) => product.category === productCat.name);

  // On affiche les produits de la catégorie
  element.innerHTML = `
   <div class="d-flex justify-content-between"></div>
 
  <h1>Produits de la catégorie ${productCat.name}</h1>
  <div id="products-list">
   ${productsCategorie.map(product => `
         <div class="col p-2">
        <a class="card user-link d-flex flex-column h-100" href="/product?id=${product.id}">
         <div class="card-body px-2 py-2">
            <img class="card-img-top" src=${product.image} alt="${product.name}">
            <h5 class="card-title text-center p-3 text-truncate">${product.name}</h5>
            <p class="card-text price">Prix: <span>${product.price}$</span></p>
            <p class="card-text">Catégorie: ${product.category}</p>
            <div class="mt-auto">
                  <button class="btn btn-primary btn-lg mr-3 btn-add-cart" data-id="${product.id}">Add in cart</button>
                  <button class="btn btn-outline-secondary btn-lg">Add in dreams</button>
            </div>
          </div>
        </a>
      </div>
   `).join('')}
   </div>`;

  const productsList = element.querySelector("#products-list");

  // Fonction pour afficher les produits
  const render = () => {
    CardsList(productsList, productsCategorie, ProductCard, ["id", "name", "price", "description", "image", "category"]);
  };

  // Initialisation de la page
  render();
}


