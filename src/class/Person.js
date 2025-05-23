import { emitEvent } from "../utils";
import GameObject from "./GameObject";

export default class Person extends GameObject {
  constructor(config) {
    super(config);
    this.momentRemaining = 0;
    this.isControllAble = config.isControllAble || false;
    this.isStanding = false;

    this.actionDirection = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.momentRemaining > 0) {
      this.updatePosition();
    } else {
      if (state.arrow && this.isControllAble && !state.map.isCutScenePlaying) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }

      this.updateAnimation(state.arrow);
    }
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      //Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        if (behavior.retry) {
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 50);
        }

        return;
      }

      //Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.momentRemaining = 16;
      this.updateAnimation();
    }

    if (behavior.type === "stand") {
      this.isStanding = true;

      setTimeout(() => {
        emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
      }, behavior.time);

      this.isStanding = false;
    }
  }

  updatePosition() {
    // if (!this.isControllAble) return;
    const [property, change] = this.actionDirection[this.direction];
    this[property] += change;
    this.momentRemaining -= 1;

    //emit event when walking complete
    if (this.momentRemaining === 0) {
      emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
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
