import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Categorie } from "./pages/Categories/Categorie";
import { Categories } from "./pages/Categories/Categories";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products/Products";
import { Product } from "./pages/Products/Product";
import { Dream } from "./pages/Dreams/Dream";
import { Cart } from "./pages/Cart/Cart";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/product": Product,
  "/products": Products,
  "/categorie": Categorie,
  "/categories": Categories,
  "/dreams": Dream,
  "/cart": Cart,
};

app("#app", routes);
