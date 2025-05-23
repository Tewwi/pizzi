import Person from "../class/Person";
import { asGirdWalls, withGrid } from "../utils";

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
    npc2: new Person({
      x: withGrid(10),
      y: withGrid(8),
      src: "../../images/characters/people/npc2.png",
    }),
  },
  walls: {},
};

export const DemoRoomMap = {
  lowerImgSrc: "../../images/maps/DemoLower.png",
  upperImgSrc: "../../images/maps/DemoUpper.png",
  gameObjs: {
    hero: new Person({
      x: withGrid(5),
      y: withGrid(9),
      src: "../../images/characters/people/hero.png",
      isControllAble: true,
    }),
    npc1: new Person({
      x: withGrid(7),
      y: withGrid(5),
      src: "../../images/characters/people/npc1.png",
      behaviorLoop: [
        {
          type: "stand",
          direction: "up",
          time: 2000,
        },
        {
          type: "stand",
          direction: "left",
          time: 200,
        },
        {
          type: "stand",
          direction: "right",
          time: 500,
        },
      ],
      taking: [
        {
          events: [
            {
              type: "textMessage",
              text: "Hello, I'm a NPC",
              who: "npc1",
            },
            {
              type: "textMessage",
              text: "Hehe",
              who: "npc1",
            },
            {
              type: "walk",
              direction: "down",
              who: "hero",
            },
          ],
        },
      ],
    }),
    npc2: new Person({
      x: withGrid(3),
      y: withGrid(7),
      src: "../../images/characters/people/npc2.png",
      behaviorLoop: [
        {
          type: "walk",
          direction: "up",
        },
        {
          type: "walk",
          direction: "left",
        },
        {
          type: "walk",
          direction: "down",
        },
        {
          type: "walk",
          direction: "right",
        },
      ],
    }),
  },
  walls: {
    // Center table
    [asGirdWalls(7, 6)]: true,
    [asGirdWalls(8, 6)]: true,
    [asGirdWalls(7, 7)]: true,
    [asGirdWalls(8, 7)]: true,

    // Left wall
    [asGirdWalls(0, 1)]: true,
    [asGirdWalls(0, 2)]: true,
    [asGirdWalls(0, 3)]: true,
    [asGirdWalls(0, 4)]: true,
    [asGirdWalls(0, 5)]: true,
    [asGirdWalls(0, 6)]: true,
    [asGirdWalls(0, 7)]: true,
    [asGirdWalls(0, 8)]: true,
    [asGirdWalls(0, 9)]: true,
    [asGirdWalls(0, 10)]: true,

    // Top walls (4 lines)
    // First line (top)
    [asGirdWalls(1, 0)]: true,
    [asGirdWalls(2, 0)]: true,
    [asGirdWalls(3, 0)]: true,
    [asGirdWalls(4, 0)]: true,
    [asGirdWalls(5, 0)]: true,
    [asGirdWalls(6, 0)]: true,
    [asGirdWalls(7, 0)]: true,
    [asGirdWalls(8, 0)]: true,
    [asGirdWalls(9, 0)]: true,
    [asGirdWalls(10, 0)]: true,
    [asGirdWalls(11, 0)]: true,

    // Second line
    [asGirdWalls(1, 1)]: true,
    [asGirdWalls(2, 1)]: true,
    [asGirdWalls(3, 1)]: true,
    [asGirdWalls(4, 1)]: true,
    [asGirdWalls(5, 1)]: true,
    [asGirdWalls(6, 1)]: true,
    [asGirdWalls(7, 1)]: true,
    [asGirdWalls(8, 1)]: true,
    [asGirdWalls(9, 1)]: true,
    [asGirdWalls(10, 1)]: true,

    // Third line
    [asGirdWalls(1, 2)]: true,
    [asGirdWalls(2, 2)]: true,
    [asGirdWalls(3, 2)]: true,
    [asGirdWalls(4, 2)]: true,
    [asGirdWalls(5, 2)]: true,
    [asGirdWalls(6, 2)]: true,
    [asGirdWalls(7, 2)]: true,
    [asGirdWalls(8, 2)]: true,
    [asGirdWalls(9, 2)]: true,
    [asGirdWalls(10, 2)]: true,

    // Fourth line
    [asGirdWalls(1, 3)]: true,
    [asGirdWalls(2, 3)]: true,
    [asGirdWalls(3, 3)]: true,
    [asGirdWalls(4, 3)]: true,
    [asGirdWalls(5, 3)]: true,
    [asGirdWalls(6, 3)]: true,
    [asGirdWalls(7, 3)]: true,
    [asGirdWalls(8, 3)]: true,
    [asGirdWalls(9, 3)]: true,
    [asGirdWalls(10, 3)]: true,

    // Right wall
    [asGirdWalls(11, 1)]: true,
    [asGirdWalls(11, 2)]: true,
    [asGirdWalls(11, 3)]: true,
    [asGirdWalls(11, 4)]: true,
    [asGirdWalls(11, 5)]: true,
    [asGirdWalls(11, 6)]: true,
    [asGirdWalls(11, 7)]: true,
    [asGirdWalls(11, 8)]: true,
    [asGirdWalls(11, 9)]: true,
    [asGirdWalls(11, 10)]: true,

    // Bottom wall
    [asGirdWalls(1, 10)]: true,
    [asGirdWalls(2, 10)]: true,
    [asGirdWalls(3, 10)]: true,
    [asGirdWalls(4, 10)]: true,
    [asGirdWalls(6, 10)]: true,
    [asGirdWalls(7, 10)]: true,
    [asGirdWalls(8, 10)]: true,
    [asGirdWalls(9, 10)]: true,
    [asGirdWalls(10, 10)]: true,

    // Bookcase walls
    [asGirdWalls(2, 1)]: true,
    [asGirdWalls(3, 1)]: true,
    [asGirdWalls(4, 1)]: true,

    // Top wall section
    [asGirdWalls(1, 1)]: true,
    [asGirdWalls(5, 1)]: true,
    [asGirdWalls(6, 1)]: true,
    [asGirdWalls(7, 1)]: true,
    [asGirdWalls(8, 1)]: true,
    [asGirdWalls(9, 1)]: true,
    [asGirdWalls(10, 1)]: true,
  },
};
