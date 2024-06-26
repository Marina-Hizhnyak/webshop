import products from "../../storage/products.json";

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Product = (element) => {
  // On récupère l'identifiant du produit depuis l'URL
  const url = new URL(window.location.href);
  const productId = parseInt(url.searchParams.get("id"));

  // On récupère le produit correspondant à l'identifiant
  const product = products.find((product) => product.id === productId);

  // Si le produit n'existe pas, on affiche un message d'erreur
  if (!product) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>Le produit avec l'identifiant ${productId} n'existe pas.</p>
      `;
    return;
  }

  // Affichage des détails du produit
  element.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="${product.image}" class="img-fluid rounded" alt="Image du produit">
        </div>
        <div class="col-md-6">
          <h2 class="mb-4">${product.name}</h2>
          <p class="lead">${product.description}</p>
          <p class="text-muted">Prix: <strong>${product.price}$</strong></p>
          <button class="btn btn-primary btn-lg mr-3 btn-add-cart">Add in cart</button>
          <button class="btn btn-outline-secondary btn-lg btn-add-wish">Add in dreams</button>
        </div>
      </div>
    </div>
  `;

  // Sélection des boutons d'ajout au panier et à la liste de souhaits
  const btnAdd = document.querySelector(".btn-add-cart");
  const btnAddWish = document.querySelector(".btn-add-wish");

  // Ajout des événements de clic aux boutons
  btnAdd.addEventListener("click", addToCart);
  btnAddWish.addEventListener("click", addToWish);

  // Fonction pour ajouter le produit au panier
  function addToCart() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    const index = cart.findIndex(obj => obj.id === product.id);
    if (index === -1) {
      product.quantite = 1;
      cart.push(product);
    } else {
      cart[index].quantite++;
    }

    // Sauvegarde du panier mis à jour dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Déclenchement d'un événement personnalisé pour indiquer l'ajout au panier
    let event = new Event("add", { bubbles: true });
    document.dispatchEvent(event);
  }

  // Fonction pour ajouter le produit à la liste de souhaits
  function addToWish() {
    let wish = localStorage.getItem('wish');
    if (wish) {
      wish = JSON.parse(wish);
    } else {
      wish = [];
    }

    const index = wish.findIndex(obj => obj.id === product.id);
    if (index === -1) {
      wish.push(product);
    } // Si le produit est déjà dans la liste de souhaits, ne rien faire.

    // Sauvegarde de la liste de souhaits mise à jour dans localStorage
    localStorage.setItem('wish', JSON.stringify(wish));

    // Déclenchement d'un événement personnalisé pour indiquer l'ajout à la liste de souhaits
    let event = new Event("addWish", { bubbles: true });
    document.dispatchEvent(event);
  }
};

