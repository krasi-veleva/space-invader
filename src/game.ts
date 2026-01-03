import { Container } from "pixi.js";
import { Ship } from "./ship";
import { Bullet } from "./bullet";
import { AliensGroup } from "./aliensGroup";

export class Game extends Container {
    constructor(stage: Container) {
        super();
        const shipFromSprite = new Ship(stage);

        const bullet = new Bullet();

        const aliens = new AliensGroup();

        stage.addChild(shipFromSprite);
        stage.addChild(bullet);
        stage.addChild(aliens);
    }
}
