import Person from "../../class/Person";
import { asGirdWalls, withGrid } from "../../utils";
import { DemoRoomMap } from "./DemoRoom";

export const KitchenMap = {
  lowerImgSrc: "../../images/maps/KitchenLower.png",
  upperImgSrc: "../../images/maps/KitchenUpper.png",
  gameObjs: {
    hero: new Person({
      x: withGrid(5),
      y: withGrid(6),
      src: "../../images/characters/people/hero.png",
      isControllAble: true,
    }),
    npc4: new Person({
      x: withGrid(10),
      y: withGrid(8),
      src: "../../images/characters/people/npc4.png",
      taking: [
        {
          events: [
            {
              type: "textMessage",
              text: "You made it!",
              who: "npc4",
            },
            {
              type: "textMessage",
              text: "You're welcome",
              who: "npc4",
            },
          ],
        },
      ],
    }),
  },
  // cutSceneSpace: {
  //   [asGirdWalls(5, 10)]: {
  //     events: [
  //       {
  //         who: "hero",
  //         type: "changeMap",
  //         map: DemoRoomMap,
  //       },
  //     ],
  //   },
  // },
  walls: {},
};
