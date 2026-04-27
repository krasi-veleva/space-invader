import { Sprite, Texture, Ticker } from "pixi.js";
import { Game } from "./game";

export class Bullet extends Sprite {
    private ticker = Ticker.shared;
    private onTick: () => void;
    private speed = 10;

    constructor(private game: Game) {
        super(Texture.from("bullet"));

        this.init();

        this.onTick = this.bulletMovement.bind(this);

        this.start();
    }

    private init() {
        this.scale.set(0.1);
        this.anchor.set(0.5, 0.5);
    }

    private bulletMovement() {
        const gameBounder = this.height - 15;

        this.y -= this.speed;

        if (this.game.bullet && this.y <= gameBounder) {
            console.log("destroying because out of screen");
            this.destroyBullet();
        }
    }

    private start() {
        this.ticker.add(this.onTick);
    }

    public destroyBullet() {
        this.ticker.remove(this.onTick);

        this.destroy();
        console.log("bullet is destroyed");
    }
}
