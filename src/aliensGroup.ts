import { Container, Ticker } from "pixi.js";
import { Alien } from "./alien";
import { gameWidth } from "./gameSettings";

export class AliensGroup extends Container {
    private aliens: Alien[] = [];
    static readonly Y_SPACING = 61;

    private speed = 2;
    private direction: 1 | -1 = 1;
    private ticker: Ticker = Ticker.shared;

    constructor() {
        super();
        this.renderAliens();
        this.ticker.add(this.aliensMovement.bind(this));
        this.ticker.add(this.aliensRotation.bind(this));
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

    private aliensMovement(): void {
        if (this.x >= gameWidth - this.width) {
            this.direction = -1;
            this.y += 20;
        }

        if (this.x <= 0) {
            this.direction = 1;
            this.y += 20;
        }

        this.x += this.speed * this.direction * this.ticker.deltaTime;
    }

    private aliensRotation(): void {
        for (let i = 0; i < this.aliens.length; i++) {
            const alien = this.aliens[i];

            alien.rotation -= 0.01 * this.ticker.deltaTime;
        }
    }
}
