export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, gridX, gridY) => {

    const x = gridCells(gridX);
    const y = gridCells(gridY);


    const str = `${x},${y}`;
    const isWallPresent = walls.has(str);


    return !isWallPresent;
}