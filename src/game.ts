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
            this.handleBulletShooting(e, stage);
        });

        window.addEventListener("click", (e) => {
            this.handleBulletShooting(e, stage);
        });
    }

    private handleBulletShooting(event: KeyboardEvent | MouseEvent, stage: Container) {
        if (event instanceof KeyboardEvent) {
            if (event.key === " " || event.code === "Space") {
                this.keys.add(event.code);
                console.log("space pressed");
                console.log(this.keys);
                this.initBullet(stage);
            }
        }

        if (event instanceof MouseEvent) {
            if (event.button === 0) {
                console.log("left mouse button was clicked");
                this.initBullet(stage);
            }
        }
    }

    private initBullet(stage: Container) {
        this.bullet = new Bullet(this);

        this.bullet.position.set(this.ship.x, this.ship.y - 65);

        stage.addChild(this.bullet);
    }
}
