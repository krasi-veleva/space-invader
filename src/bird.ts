import * as PIXI from "pixi.js";
import { setInterval } from "timers";

export class Bird extends PIXI.AnimatedSprite {
    constructor() {
        super([
            PIXI.Texture.from("birdUp.png"),
            PIXI.Texture.from("birdMiddle.png"),
            PIXI.Texture.from("birdDown.png"),
        ]);
        this.loop = true;
        this.animationSpeed = 0.1;
        this.play();
        this.scale.set(3);
    }

    moveLeft(): void {
        setInterval(() => {
            console.log("bird move left", this.x);
            this.x -= 1;
        }, 1000);
    }
}

// function getBird(): PIXI.AnimatedSprite {
//     const animSprite = new PIXI.AnimatedSprite([
//         PIXI.Texture.from("birdUp.png"),
//         PIXI.Texture.from("birdMiddle.png"),
//         PIXI.Texture.from("birdDown.png"),
//     ]);

//     animSprite.loop = true;
//     animSprite.animationSpeed = 0.1;
//     animSprite.play();
//     animSprite.scale.set(3);

//     return animSprite;
// }
