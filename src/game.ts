import { Container } from "pixi.js";
import { Ship } from "./ship";
import { Bullet } from "./bullet";
import { AliensGroup } from "./aliensGroup";

export class Game extends Container {
    private keys = new Set<string>();
    public ship: Ship;
    public bullet?: Bullet;

    constructor(stage: Container) {
        super();

        this.ship = new Ship(stage);
        const aliens = new AliensGroup();

        stage.addChild(this.ship);
        stage.addChild(aliens);

        window.addEventListener("keydown", (e) => {
            this.onSpacePressed(e, stage);
        });
    }

    private onSpacePressed(event: KeyboardEvent, stage: Container) {
        if (event.key === " " || event.code === "Space") {
            this.keys.add(event.code);
            console.log("space pressed");
            console.log(this.keys);

            this.bullet = new Bullet(this);

            this.bullet.position.set(this.ship.x, this.ship.y - 65);

            stage.addChild(this.bullet);
        }
    }
}
