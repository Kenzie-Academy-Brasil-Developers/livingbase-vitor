import { ScrollCategories } from "../../scripts/categoriesBar.js";
import { Render } from "../../scripts/renders.js";

Render.postPage();
Render.showCategories(false);

ScrollCategories.checkUlLength();