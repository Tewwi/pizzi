import Sprite from "./Sprite";

export default class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    this.sprite = new Sprite({
      src: config.src,
      gameObj: this,
    });
  }

  update() {}
}
