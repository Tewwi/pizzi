export class KeyPressListener {
  constructor(keyCode, callback) {
    this.keySafe = true;
    this.callback = callback;
    this.keyCode = keyCode;

    this.keydownFunction = (event) => {
      if (event.code === this.keyCode) {
        if (this.keySafe) {
          this.keySafe = false;
          this.callback();
        }
      }
    };

    this.keyupFunction = (event) => {
      if (event.code === this.keyCode) {
        this.keySafe = true;
      }
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
