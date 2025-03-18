import Overworld from "./class/Overworld.js";

(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container"),
  });

  overworld.init();
})();
