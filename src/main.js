import Overworld from "./class/Overworld.js";
import "./components/TextBox.css";

(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container"),
  });

  overworld.init();
})();
