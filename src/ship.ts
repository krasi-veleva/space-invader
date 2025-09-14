import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { gameHeight, gameWidth } from "./gameSettings";

export class Ship extends Sprite {
    private keys = new Set<string>();
    private ticker = Ticker.shared;

    constructor(stage: Container) {
        super(Texture.from("ship"));

        this.init();

        window.addEventListener("keydown", (e) => {
            this.onKeyDown(e);
        });

        window.addEventListener("keyup", (e) => {
            this.onKeyUp(e);
        });

        this.ticker.add(this.moveRightOrLeft.bind(this));

        stage.on("globalmousemove", (event) => {
            const { x } = event.getLocalPosition(stage);
            const bound = this.width / 2;

            this.x = Math.max(bound, Math.min(gameWidth - bound, x));
        });
    }

    private init() {
        this.scale.set(0.2);
        this.anchor.set(0.5, 0.5);
        this.position.set(gameWidth / 2, gameHeight - this.height / 2);
    }

    private onKeyDown(event: KeyboardEvent) {
        const key = event.key;

        if (key === "ArrowLeft" || key === "ArrowRight") {
            this.keys.add(key);
            console.log(this.keys);
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        const key = event.key;

        if (key === "ArrowLeft" || key === "ArrowRight") {
            this.keys.delete(key);
        }
    }

    private moveRightOrLeft() {
        const bound = this.width / 2;

        if (this.keys.has("ArrowLeft")) {
            if (this.x <= 0 + bound) {
                return;
            }

            this.x -= 10;
        }

        if (this.keys.has("ArrowRight")) {
            if (this.x >= gameWidth - bound) {
                return;
            }

            this.x += 10;
        }
    }
}
