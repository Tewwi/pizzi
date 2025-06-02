import { DemoRoomMap } from "../constants/Map";
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
      console.log(e.detail.whoId, "event");
      if (e.detail.whoId === "hero") {
        this.map.isCutSceneSpace();
        // this.playCutScene(this.cutSceneSpace[`${x},${y}`].events);
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

  init() {
    this.map = new OverworldMap(DemoRoomMap);
    this.map.mountObjects();
    this.map.bindActionInput();
    this.bindSceneSpace();

    this.inputDirection = new InputDirection();
    this.inputDirection.init();

    // this.map.playCutScene([
    //   {
    //     type: "walk",
    //     direction: "up",
    //     who: "hero",
    //   },
    //   {
    //     type: "textMessage",
    //     text: "Hello there",
    //     who: "npc1",
    //   },
    //   {
    //     type: "walk",
    //     direction: "up",
    //     who: "hero",
    //   },
    //   {
    //     type: "walk",
    //     direction: "left",
    //     who: "npc1",
    //   },
    //   {
    //     type: "walk",
    //     direction: "down",
    //     who: "npc1",
    //   },
    // ]);

    this.startGameLoop();
  }
}
