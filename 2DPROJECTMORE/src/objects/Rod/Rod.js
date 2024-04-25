import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Rod extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        });
        const sprite = new Sprite({
            resource: resources.images.littleDuck,
            position: new Vector2(0, -5)
        })

        this.addChild(sprite);


        events.on("HERO_POSITION", this, pos =>{
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);

            if(roundedHeroX === this.position.x && roundedHeroY === this.position.y){
                this.onCollideWithHero();
            }
        })
    }
    onCollideWithHero(){
        // remove this instance from the scene
        this.destroy();
        
    
    
        // alert other things that we picked up rod
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.littleDuck,
            position: this.position
        })
    
    }
}
