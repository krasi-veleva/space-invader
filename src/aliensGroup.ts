import { Container } from "pixi.js";
import { Alien } from "./alien";

export class AliensGroup extends Container {
    private aliens: Alien[] = [];
    static readonly Y_SPACING = 61;

    constructor() {
        super();
        this.renderAliens();
    }

    private renderAliens(): void {
        console.log();
        for (let i = 0; i < 20; i++) {
            const alien = new Alien();

            alien.x = (i % 5) * alien.width * 2 + alien.width / 2;
            alien.y = Math.floor(i / 5) * AliensGroup.Y_SPACING + alien.height / 2;

            this.aliens.push(alien);
            this.addChild(alien);
        }
    }
}
