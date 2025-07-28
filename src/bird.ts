import * as PIXI from "pixi.js";
import { gameWidth, gameHeight } from "./gameSettings";

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
        this.anchor.set(0.5, 0.5);
        this.position.set(gameWidth / 2, gameHeight / 2);

        window.addEventListener("keydown", (e) => {
            this.moveLeftAndRight(e);
        });
    }

    moveLeftAndRight(event: KeyboardEvent): void {
        const key = event.key;
        const bound = this.width / 2;

        if (key === "ArrowLeft") {
            if (this.x <= 0 + bound) {
                return;
            }
            this.x -= 10;
            console.log("left key pressed");
        } else if (key === "ArrowRight") {
            if (this.x >= gameWidth - bound) {
                return;
            }
            this.x += 10;
            console.log("right key pressed");
        }
    }
}
