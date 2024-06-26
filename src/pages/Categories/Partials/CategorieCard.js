
/**
 * @typedef {Object} Categorie
 * @property {number} id - L'identifiant de categorie
 * @property {string} name - Le nom de categorie
 * @property {string} description - 
 * @property {string} image - 
 */

/**
 * Affiche une categorie
 *
 * @param {Categorie} categorie
 * @returns {string} HTML string
 */
export const CategorieCard = (categorie) => {
  return `
    <div class="col p-2">
      <a class="card user-link" href="/categorie?id=${categorie.id}">
        <div class="card-body px-2 py-2">
          <img class="card-img-top" src=${categorie.image} alt="${categorie.name}">
          <h5 class="card-title text-center p-3">${categorie.name}</h5>
          <p class="card-text">${categorie.description}</p>
        </div>
      </a>
    </div>
    `;
};
