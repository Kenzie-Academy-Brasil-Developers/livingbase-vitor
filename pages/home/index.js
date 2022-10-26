import { ToViewButton } from "../../scripts/activeButtons.js";
import { ScrollCategories } from "../../scripts/categoriesBar.js";
import { Render } from "../../scripts/renders.js";

Render.showCategories();
Render.showPosts();

ScrollCategories.checkUlLength();

ToViewButton.categoriesButton();