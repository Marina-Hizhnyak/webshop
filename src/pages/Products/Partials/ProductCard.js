
/**
 * @typedef {Object} Product
 * @property {number} id - L'identifiant de product.
 * @property {string} name - Le nom de product.
 * @property {string} price - 
 * @property {string} description - 
 * @property {string} image - 
 * @property {string} category - 
 */

/**
 * Affiche une carte de product
 *
 * @param {Product} product
 * @returns {string} HTML string
 */
export const ProductCard = (product) => {


  return `
      <div class="col p-2">
        <a class="card user-link d-flex flex-column h-100" href="/product?id=${product.id}">
         <div class="card-body px-2 py-2">
            <img class="card-img-top" src=${product.image} alt="${product.name}">
            <h5 class="card-title text-center p-3 text-truncate">${product.name}</h5>
            <p class="card-text price">Price: <span>${product.price}$</span></p>
            <p class="card-text">Categorie: ${product.category}</p>
            <div class="mt-auto">
                  <button class="btn btn-primary btn-lg mr-3 btn-add-cart" data-id="${product.id}">Add in cart</button>
                  <button class="btn btn-outline-secondary btn-lg btn-add-wish" data-id="${product.id}">Add in dreams</button>
            </div>
          </div>
        </a>
      </div>
    `;


};

