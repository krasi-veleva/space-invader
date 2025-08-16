import { AnimatedSprite, Texture } from "pixi.js";
import gsap from "gsap";
import { gameHeight, gameWidth } from "./gameSettings";

export class Ship extends AnimatedSprite {
    constructor() {
        super([Texture.from("ship")]);

        this.loop = true;
        this.animationSpeed = 0.1;
        this.play();
        this.scale.set(0.2);
        this.anchor.set(0.5, 0.5);
        this.position.set(gameWidth / 2, gameHeight - this.height / 2);

        window.addEventListener("keydown", (e) => {
            this.moveLeftAndRight(e);
        });
    }

    public moveLeftAndRight(event: KeyboardEvent): void {
        const key = event.key;
        const bound = this.width / 2;
        const shipX: number = this.x;

        if (key === "ArrowLeft") {
            if (this.x <= 0 + bound) {
                return;
            }

            gsap.to(this, {
                x: shipX - 45,
                duration: 0.1,
                ease: "none",
            });
            console.log("left key pressed");
        } else if (key === "ArrowRight") {
            if (this.x >= gameWidth - bound) {
                return;
            }

            gsap.to(this, {
                x: shipX + 45,
                duration: 0.1,
                ease: "none",
            });
            console.log("right key pressed");
        }
    }
}
