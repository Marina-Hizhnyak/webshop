/**
 * Layout
 * @returns {string} HTML string
 */
export const Layout = () => {
  const year = new Date().getFullYear();
  const developerName = "Khyzhniak Maryna";

  return `
<div class="wrapper d-flex flex-column min-vh-100">
  <header class="custom-header">
  </header>
  <main class="content container-fluid mt-5 flex-grow-1">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <!-- Content -->
      </div>
    </div>
  </main>
  <footer class="footer text-center mt-auto">
    <p>&copy; ${year} - Tous droits réservés | Développé par ${developerName}</p>
  </footer>
</div>
  `;
};
