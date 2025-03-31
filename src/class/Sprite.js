import { SpriteAnimation } from "../constants/SpriteAnimation";
import { centerGridCameraX, centerGridCameraY } from "../utils";

export default class Sprite {
  constructor(config) {
    //setup image sprite
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };

    //setup shadow
    this.shadow = new Image();
    this.useShadow = config.useShadow || true;
    if (this.useShadow) {
      this.shadow.src = "../../images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //setup animation
    this.animation = config.animation || SpriteAnimation;
    this.currAnimation = "idle-down";
    this.currAnimationFrame = 0;
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProcess = config.animationFrameLimit;

    //ref game obj
    this.gameObj = config.gameObj;
  }

  get frame() {
    return this.animation[this.currAnimation][this.currAnimationFrame];
  }

  updateAnimationProcess() {
    if (this.animationFrameProcess > 0) {
      this.animationFrameProcess -= 1;
      return;
    }

    this.animationFrameProcess = this.animationFrameLimit;
    //Every animation frame run in 16 frame process
    this.currAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currAnimationFrame = 0;
    }
  }

  setAnimation(key) {
    if (this.currAnimation !== key) {
      this.currAnimation = key;
      this.animationFrameProcess = this.animationFrameLimit;
      this.currAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObj.x - 8 + centerGridCameraX(cameraPerson.x);
    const y = this.gameObj.y - 18 + centerGridCameraY(cameraPerson.y);

    const [frameX, frameY] = this.frame;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isImageLoaded &&
      ctx.drawImage(
        this.image,
        32 * frameX, //left cut
        32 * frameY, //top cut,
        32, //width of cut
        32, //height of cut
        x, //position x
        y, //position y
        32, //size image to draw
        32 //size image to draw
      );

    this.updateAnimationProcess();
  }
}
