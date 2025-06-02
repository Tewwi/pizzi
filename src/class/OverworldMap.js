import {
  centerGridCameraX,
  centerGridCameraY,
  getNextPosition,
  getOppositeDirection,
} from "../utils";
import { KeyPressListener } from "./KeyPressListener";
import OverWorldEvent from "./OverWorldEvent";

export default class OverworldMap {
  constructor(config) {
    this.gameObjs = config.gameObjs;
    this.overworld = null;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerImgSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperImgSrc;

    this.walls = config.walls || {};
    this.isCutScenePlaying = config.isCutScenePlaying || false;
    this.cutSceneSpace = config.cutSceneSpace || {};
  }

  mountObjects() {
    Object.keys(this.gameObjs).forEach((key) => {
      const gameObj = this.gameObjs[key];
      gameObj.id = key;

      gameObj.mount(this);
    });
  }

  drawLower(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImg,
      centerGridCameraX(cameraPerson.x),
      centerGridCameraY(cameraPerson.y)
    );
  }

  drawUpper(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImg,
      centerGridCameraX(cameraPerson.x),
      centerGridCameraY(cameraPerson.y)
    );
  }

  isSpaceTaken(x, y, direction) {
    const { nextX, nextY } = getNextPosition(x, y, direction);
    return this.walls[`${nextX},${nextY}`] || false;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { nextX, nextY } = getNextPosition(wasX, wasY, direction);
    this.addWall(nextX, nextY);
  }

  bindActionInput() {
    this.actionInput = new KeyPressListener("Space", () => {
      const hero = this.gameObjs.hero;
      const { nextX, nextY } = getNextPosition(hero.x, hero.y, hero.direction);
      const nextObj = Object.values(this.gameObjs).find(
        (obj) => obj.x === nextX && obj.y === nextY
      );

      if (nextObj && nextObj.taking.length > 0) {
        const newDirection = getOppositeDirection(hero.direction);
        nextObj.direction = newDirection;
        this.playCutScene(nextObj.taking[0].events);
      }
    });
  }

  isCutSceneSpace() {
    const hero = this.gameObjs.hero;
    if (this.cutSceneSpace[`${hero.x},${hero.y}`] && !this.isCutScenePlaying) {
      this.playCutScene(this.cutSceneSpace[`${hero.x},${hero.y}`].events);
    }
  }

  /**
   * Play a cut scene
   * @param {Array<{type: string, direction: string, who: string, time?: number}>} events - The events to play
   */
  async playCutScene(events) {
    this.isCutScenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventHandler = new OverWorldEvent({ map: this, event });
      await eventHandler.init();
    }

    this.isCutScenePlaying = false;
    //Continue the behavior of the objects
    for (const obj of Object.values(this.gameObjs)) {
      obj.doBehavior(this);
    }
  }
}
