class Resources {
    constructor(){
        this.toLoad = {
            //everything we want to download
            sky: "../public/sprites/sky.png",
            ground: "../public/sprites/ground.png",
            hero: "../public/sprites/hero-sheet.png",
            shadow: "../public/sprites/shadow.png",
            rod: "../public/sprites/rod.png",
            littleDuck: "../public/sprites/littleDuck.png",
        };

        // bucket for all our images
        this.images= {};

        // load each image
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }

            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();