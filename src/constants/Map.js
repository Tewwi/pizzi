import Person from "../class/Person";
import { asGirdWalls, withGrid } from "../utils";

export const KitchenMap = {
  lowerImgSrc: "../../public/images/maps/KitchenLower.png",
  upperImgSrc: "../../public/images/maps/KitchenUpper.png",
  gameObjs: {
    hero: new Person({
      x: withGrid(5),
      y: withGrid(6),
      src: "../../public/images/characters/people/hero.png",
      isControllAble: true,
    }),
    npc2: new Person({
      x: withGrid(10),
      y: withGrid(8),
      src: "../../public/images/characters/people/npc2.png",
    }),
  },
  walls: {},
};

export const DemoRoomMap = {
  lowerImgSrc: "../../public/images/maps/DemoLower.png",
  upperImgSrc: "../../public/images/maps/DemoUpper.png",
  gameObjs: {
    hero: new Person({
      x: withGrid(5),
      y: withGrid(9),
      src: "../../public/images/characters/people/hero.png",
      isControllAble: true,
    }),
    npc1: new Person({
      x: withGrid(5),
      y: withGrid(6),
      src: "../../public/images/characters/people/npc1.png",
    }),
  },
  walls: {
    [asGirdWalls(7, 6)]: true,
    [asGirdWalls(8, 6)]: true,
    [asGirdWalls(7, 7)]: true,
    [asGirdWalls(8, 7)]: true,
  },
};
