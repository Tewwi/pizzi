import { TextBox } from "../components/TextBox";

export default class OverWorldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  walk(resolve) {
    const who = this.map.gameObjs[this.event.who];
    who.startBehavior(
      { map: this.map },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );

    //wait for walking complete
    const handleWalkingComplete = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonWalkingComplete",
          handleWalkingComplete
        );
        resolve();
      }
    };

    document.addEventListener("PersonWalkingComplete", handleWalkingComplete);
  }

  stand(resolve) {
    const who = this.map.gameObjs[this.event.who];
    who.startBehavior(
      { map: this.map },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );

    //wait for standing complete
    const handleStandingComplete = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonStandComplete",
          handleStandingComplete
        );
        resolve();
      }
    };

    document.addEventListener("PersonStandComplete", handleStandingComplete);
  }

  textMessage(resolve) {
    const textBox = new TextBox(
      `${this.event.who}:</br> ${this.event.text}`,
      () => {
        resolve();
      }
    );
    textBox.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    this.map.overworld.startOverworld(this.event.map);
    resolve();
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}
