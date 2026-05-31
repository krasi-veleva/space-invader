import { Container, Ticker } from "pixi.js";
import { Ship } from "./ship";
import { Bullet } from "./bullet";
import { AliensGroup } from "./aliensGroup";
import { AlienBullet } from "./alienBullet";

export class Game extends Container {
    private keys = new Set<string>();
    private ticker: Ticker = Ticker.shared;
    private stage: Container;
    public ship: Ship;
    public aliens: AliensGroup;
    public bullet?: Bullet;
    public alienBullet?: AlienBullet;
    public shipBullets: Bullet[] = [];
    public aliensBullets: AlienBullet[] = [];

    constructor(stage: Container) {
        super();
        this.stage = stage;

        this.ship = new Ship(stage);
        this.aliens = new AliensGroup(stage);

        stage.addChild(this.ship);
        stage.addChild(this.aliens);

        window.addEventListener("keydown", (e) => {
            this.handleShipShooting(e, stage);
        });

        window.addEventListener("click", (e) => {
            this.handleShipShooting(e, stage);
        });

        this.ticker.add(() => {
            this.shipBulletAndAliensCollision();
        });

        this.ticker.add(() => {
            this.aliensGroupAndShipCollision();
        });

        this.ticker.add(() => {
            this.aliensBulletAndShipCollision();
        });

        this.aliensShooting();
    }

    private handleShipShooting(event: KeyboardEvent | MouseEvent, stage: Container) {
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
        this.bullet = new Bullet(this, this.shipBullets);

        this.shipBullets.push(this.bullet);

        this.bullet.position.set(this.ship.x, this.ship.y - 65);

        stage.addChild(this.bullet);
    }

    private aliensShooting(): void {
        setInterval(() => {
            this.createAlienBullet();
        }, 2000);
    }

    private createAlienBullet() {
        const randomIndex = Math.floor(Math.random() * this.aliens.children.length);
        const alien = this.aliens.children[randomIndex];

        if (!alien) {
            return;
        }

        this.alienBullet = new AlienBullet(this.aliensBullets);

        const alienPositionX = this.aliens.x + alien.x;
        const alienPositionY = this.aliens.y + alien.y + alien.height;

        this.alienBullet.position.set(alienPositionX, alienPositionY);

        this.aliensBullets.push(this.alienBullet);

        this.stage.addChild(this.alienBullet);
    }

    private shipBulletAndAliensCollision() {
        const aliens = this.aliens.children;

        if (!this.bullet || aliens === null) {
            return;
        }

        for (let i = 0; i < this.shipBullets.length; i++) {
            for (let j = 0; j < aliens.length; j++) {
                if (this.isCollisionSuccessful(this.shipBullets[i], aliens[j])) {
                    console.log("ship bullet and aliens collided", i);
                    aliens[j].destroy();
                    this.shipBullets[i].destroyBullet();
                }
            }
        }
    }

    private aliensGroupAndShipCollision() {
        const aliens = this.aliens.children;

        for (let i = 0; i < aliens.length; i++) {
            if (this.isCollisionSuccessful(this.ship, aliens[i])) {
                this.ship.destroyShip();
                console.log("ship and aliens collided");
            }
        }
    }

    private aliensBulletAndShipCollision() {
        for (let i = 0; i < this.aliensBullets.length; i++) {
            if (this.isCollisionSuccessful(this.aliensBullets[i], this.ship)) {
                console.log("alines bullet and ship collided");
                this.ship.destroyShip();
                this.aliensBullets[i].destroyAlienBullet();
            }
        }
    }

    private isCollisionSuccessful(obj1: Container, obj2: Container) {
        if (!obj1 || !obj2 || obj1.destroyed || obj2.destroyed) {
            return;
        }

        const bounds1 = obj1.getBounds();
        const bounds2 = obj2.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    }
}
