import { DemoRoomMap, KitchenMap } from "../constants/Map";
import InputDirection from "./InputDirection";
import OverworldMap from "./OverworldMap";

export default class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      //Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.cameraPerson = this.map.gameObjs.hero;

      //update state
      Object.values(this.map.gameObjs).forEach((gameObj) => {
        gameObj.update({
          arrow: this.inputDirection.direction,
          map: this.map,
        });
      });

      this.map.drawLower(this.ctx, this.cameraPerson);

      //draw to obj screen
      Object.values(this.map.gameObjs).forEach((gameObj) => {
        gameObj.sprite.draw(this.ctx, this.cameraPerson);
        if (!gameObj.isControllAble) {
          this.map.walls[`${gameObj.x},${gameObj.y}`] = true;
        }
      });

      this.map.drawUpper(this.ctx, this.cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }

  init() {
    this.map = new OverworldMap(DemoRoomMap);
    this.inputDirection = new InputDirection();

    this.inputDirection.init();
    this.startGameLoop();
  }
}
