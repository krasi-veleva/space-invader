import { Container, ObservablePoint, Ticker } from "pixi.js";
import { Alien } from "./alien";
import { gameWidth } from "./gameSettings";
import { AlienBullet } from "./alienBullet";

export class AliensGroup extends Container {
    private aliens: Alien[] = [];
    private ticker: Ticker = Ticker.shared;
    private stage: Container;
    static readonly Y_SPACING = 61;
    private speed = 2;
    private direction: 1 | -1 = 1;
    private alienPosition: ObservablePoint | null = null;

    constructor(stage: Container) {
        super();
        this.stage = stage;
        this.createAliensGroup();
        this.aliensShooting();

        this.ticker.add(this.aliensMovement.bind(this));
        this.ticker.add(this.aliensRotation.bind(this));
    }

    private createAliensGroup(): void {
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

    private aliensShooting(): void {
        setInterval(() => {
            this.createAlienBullet();
        }, 2000);
    }

    private createAlienBullet() {
        const randomIndex = Math.floor(Math.random() * this.aliens.length);
        const alien = this.aliens[randomIndex];

        if (!alien) {
            return;
        }

        const bullet = new AlienBullet();

        const alienPositionX = this.x + alien.x;
        const alienPositionY = this.y + alien.y + alien.height;

        bullet.position.set(alienPositionX, alienPositionY);

        this.stage.addChild(bullet);
    }
}
