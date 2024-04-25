import { gridCells } from "../helpers/grid.js";


export const walls = new Set();

walls.add(`${gridCells(4)}, ${gridCells(3)}`);

walls.add(`${gridCells(4)}, ${gridCells(4)}`);

// walls.add(`64,48`); // tree

// walls.add(`64,64`); // squares
// walls.add(`64,80`);
// walls.add(`80,64`);
// walls.add(`80,80`);


// walls.add(`112,80`); // water
// walls.add(`128,80`);
// walls.add(`144,80`);
// walls.add(`160,80`);

// walls.add(`32, 48`);