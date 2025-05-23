import { KeyPressListener } from "../class/KeyPressListener";

export class TextBox {
  constructor(text, onComplete) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("text-box");
    this.element.innerHTML = `<p class="text-box-p">${this.text}</p><button class="text-box-button">Next >></button>`;
  }

  done() {
    this.element.remove();
    this.onComplete();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.keyListener = new KeyPressListener("Enter", () => {
      this.keyListener.unbind();
      this.done();
    });

    document
      .querySelector(".text-box-button")
      .addEventListener("click", () => this.done(), { once: true });
  }
}
