import GameObject from "./GameObject";

export default class Person extends GameObject {
  constructor(config) {
    super(config);
    this.momentRemaining = 0;
    this.isControllAble = config.isControllAble || false;

    this.actionDirection = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.momentRemaining > 0) {
      this.updateDirection();
    } else {
      if (state.arrow && this.isControllAble) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }

      this.updateAnimation(state.arrow);
    }
  }

  startBehavior(state, behavior) {
    if (behavior.type === "walk") {
      this.direction = behavior.direction;
      if (!state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        this.momentRemaining = 16;
      }
    }
  }

  updateDirection() {
    if (!this.isControllAble) return;
    if (this.momentRemaining > 0) {
      const [dir, value] = this.actionDirection[this.direction];

      this[dir] += value;
      this.momentRemaining -= 1;
    }
  }

  updateAnimation() {
    if (this.momentRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }

    this.sprite.setAnimation(`idle-${this.direction}`);
  }
}
