//22 square total
const centerScreenX = 10.5;
//12 square total
const centerScreenY = 6;

export const withGrid = (number) => number * 16;

export const centerGridCameraX = (x) => {
  return withGrid(centerScreenX) - x;
};

export const centerGridCameraY = (y) => {
  return withGrid(centerScreenY) - y;
};

export const asGirdWalls = (x, y) => {
  return `${x * 16},${y * 16}`;
};

export const getNextPosition = (x, y, direction) => {
  let nextX = x;
  let nextY = y;
  const size = 16;

  switch (direction) {
    case "up":
      nextY -= size;
      break;
    case "left":
      nextX -= size;
      break;
    case "right":
      nextX += size;
      break;
    default:
      nextY += size;
      break;
  }

  // console.log("current", x, y);
  // console.log("next", nextX, nextY);

  return { nextX, nextY };
};

export const emitEvent = (name, detail) => {
  const event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
};
