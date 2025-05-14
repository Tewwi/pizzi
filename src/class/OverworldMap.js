import {
  centerGridCameraX,
  centerGridCameraY,
  getNextPosition,
} from "../utils";
import OverWorldEvent from "./OverWorldEvent";

export default class OverworldMap {
  constructor(config) {
    this.gameObjs = config.gameObjs;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerImgSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperImgSrc;
    this.walls = config.walls || {};
    this.isCutScenePlaying = config.isCutScenePlaying || false;
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
    this.mountObjects();
  }
}
