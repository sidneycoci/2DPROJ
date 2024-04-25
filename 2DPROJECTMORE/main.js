import { Animations } from "./src/Animations.js";
import { Camera } from "./src/Camera.js";
import { events } from "./src/Events.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { GameLoop } from "./src/GameLoop.js";
import { GameObject } from "./src/GameObject.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level1.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/objects/Hero/heroAnimations.js";
import { Inventory } from "./src/objects/Inventory/Inventory.js";
import { Rod } from "./src/objects/Rod/Rod.js";

// grabbing canvas
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");


//establish the root scence
const mainScene = new GameObject({
    position: new Vector2(0,0)
})


// build up scene by adding children
const skySprite = new Sprite ({
    resource: resources.images.sky,
    frameSize: new Vector2(320,180),
})

// for ground
const groundSprite = new Sprite ({
    resource: resources.images.ground,
    frameSize: new Vector2(320,180),
})
mainScene.addChild(groundSprite);
// creating the hero sprite!
const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);



// add an input
mainScene.input = new Input();


//const camera = new Camera();
//mainScene.addChild(camera);


// const rod = new Rod(gridCells(7), gridCells(6));
// mainScene.addChild(rod);
// const rod2 = new Rod(gridCells(10), gridCells(2));
// mainScene.addChild(rod2);

// const getRand = (min, max, excludedNumbers = []) => {
//     const range = Array.from({ length: max - min + 1}, (_, i) => i + min );
//     const goodNums = range.filter(num => !excludedNumbers.includes(num));
//     return goodNums[Math.floor(Math.random() * goodNums.length)];
// }

const notAllowPos = [
    {x: 4, y: 3},
    {x: 4, y: 4},
    {x: 4, y: 5},
    {x: 5, y: 5},
    {x: 5, y: 4},
    {x: 8, y: 3},
    {x: 9, y: 3},
    {x: 7, y: 5},
    {x: 8, y: 5},
    {x: 9, y: 5},
    {x: 10, y: 5},
    {x: 6, y: 5}
]

function getRand(min, max){
    return (Math.floor(Math.random() * (max - min + 1))) + min;
}

function checkSpawn(x, y){
    return notAllowPos.some(position => position.x === x && position.y === y );

}

for(let i = 0; i < 5; i++){
    let spawnX, spawnY;
    do{
        spawnX = getRand(3,15);
        spawnY = getRand(3, 6);
    } while (checkSpawn(spawnX, spawnY));
    const rod = new Rod(gridCells(spawnX), gridCells(spawnY));
    mainScene.addChild(rod);

}



const inventory = new Inventory();





// establish update & draw loops
const update = (delta) => {

    mainScene.stepEntry(delta, mainScene);
    
};

// for drawing
const draw = () => {

    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);

    skySprite.drawImage(ctx, 0,0);

    //save current state
    ctx.save();

    //offset by camera position
    //ctx.translate(camera.position.x, camera.position.y);



    mainScene.draw(ctx, 0, 0);

    //restore state
    ctx.restore();

    // draw anything above the game
    inventory.draw(ctx, 0, 0);
}


// start game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();