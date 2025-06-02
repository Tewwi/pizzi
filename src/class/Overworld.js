import { DemoRoomMap } from "../constants/maps/DemoRoom";
import InputDirection from "./InputDirection";
import OverworldMap from "./OverworldMap";

export default class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  bindSceneSpace() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        this.map.isCutSceneSpace();
      }
    });
  }

  startGameLoop() {
    let previousDelta = 0;
    let fpsLimit = 60;
    let updateId;

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
      Object.values(this.map.gameObjs)
        .sort((a, b) => a.y - b.y)
        .forEach((gameObj) => {
          gameObj.sprite.draw(this.ctx, this.cameraPerson);
          if (!gameObj.isControllAble) {
            this.map.walls[`${gameObj.x},${gameObj.y}`] = true;
          }
        });

      this.map.drawUpper(this.ctx, this.cameraPerson);

      requestAnimationFrame((a) => {
        function update(currentDelta) {
          updateId = requestAnimationFrame(update);

          let delta = currentDelta - previousDelta;

          if (fpsLimit && delta < 1000 / fpsLimit - 0.1) {
            return;
          }

          /* your code here */
          step();
          previousDelta = currentDelta;
        }

        update(a);
      });
    };

    step();
  }

  startOverworld(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.mountObjects();
    this.map.overworld = this;
    this.map.bindActionInput();
  }

  init() {
    this.startOverworld(DemoRoomMap);

    this.bindSceneSpace();

    this.inputDirection = new InputDirection();
    this.inputDirection.init();

    this.startGameLoop();
  }
}
