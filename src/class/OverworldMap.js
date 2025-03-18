import {
  centerGridCameraX,
  centerGridCameraY,
  getNextPosition,
} from "../utils";

export default class OverworldMap {
  constructor(config) {
    this.gameObjs = config.gameObjs;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerImgSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperImgSrc;
    this.walls = config.walls || {};
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
}
