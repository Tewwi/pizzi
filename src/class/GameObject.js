import OverWorldEvent from "./OverWorldEvent";
import Sprite from "./Sprite";

export default class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.id = config.id || null;
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.sprite = new Sprite({
      src: config.src,
      gameObj: this,
    });
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(() => {
      this.doBehavior(map);
    }, 100);
  }

  async doBehavior(map) {
    if (this.behaviorLoop.length === 0 || map.isCutScenePlaying) return;

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const event = new OverWorldEvent({ map, event: eventConfig });
    await event.init();

    this.behaviorLoopIndex++;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehavior(map);
  }

  update() {}
}
