export default class InputDirection {
  constructor(config) {
    this.heldDirections = [];

    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const index = this.heldDirections.indexOf(this.map[e.code]);
      if (this.map[e.code] && index === -1) {
        this.heldDirections.unshift(this.map[e.code]);
      }
    });

    document.addEventListener("keyup", (e) => {
      const index = this.heldDirections.indexOf(this.map[e.code]);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
