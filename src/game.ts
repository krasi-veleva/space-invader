import { Container, FederatedPointerEvent, Rectangle, Ticker } from "pixi.js";
import { Ship } from "./ship";
import { Bullet } from "./bullet";
import { AliensGroup } from "./aliensGroup";
import { AlienBullet } from "./alienBullet";
import { gameHeight, gameWidth } from "./gameSettings";

export class Game extends Container {
    private keys = new Set<string>();
    private ticker: Ticker = Ticker.shared;
    private onKeyDown = (e: KeyboardEvent) => {
        this.handleShipShooting(e, this);
    };
    private onPointerDown = (e: FederatedPointerEvent) => {
        this.handleShipShooting(e, this);
    };
    public ship: Ship | null;
    public aliens: AliensGroup;
    public bullet?: Bullet;
    public alienBullet?: AlienBullet;
    public shipBullets: Bullet[] = [];
    public aliensBullets: AlienBullet[] = [];

    constructor() {
        super();

        this.interactive = true;
        this.hitArea = new Rectangle(0, 0, gameWidth, gameHeight);

        this.ship = new Ship(this);
        this.aliens = new AliensGroup(this);

        this.addChild(this.ship);
        this.addChild(this.aliens);

        window.addEventListener("keydown", this.onKeyDown);

        this.on("pointerdown", this.onPointerDown);

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

    private handleShipShooting(event: KeyboardEvent | FederatedPointerEvent, stage: Container) {
        if (!this.ship) {
            return;
        }

        if (event instanceof KeyboardEvent) {
            if (event.key === " " || event.code === "Space") {
                this.keys.add(event.code);
                console.log("space pressed");
                console.log(this.keys);
                this.initBullet(stage);
            }
        } else if (event.button === 0) {
            console.log("left mouse button was clicked");
            this.initBullet(stage);
        }
    }

    private initBullet(stage: Container) {
        if (!this.ship) {
            return;
        }

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

        this.addChild(this.alienBullet);
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

        if (aliens.length === 0) {
            this.aliensDestroyed();
        }
    }

    private aliensGroupAndShipCollision() {
        if (!this.ship) {
            return;
        }

        const aliens = this.aliens.children;

        for (let i = 0; i < aliens.length; i++) {
            if (this.isCollisionSuccessful(this.ship, aliens[i])) {
                this.ship.destroyShip();
                this.shipDestroyed();
                console.log("ship and aliens collided");
            }
        }
    }

    private aliensBulletAndShipCollision() {
        for (let i = 0; i < this.aliensBullets.length; i++) {
            if (!this.ship) {
                return;
            }

            if (this.isCollisionSuccessful(this.aliensBullets[i], this.ship)) {
                console.log("alines bullet and ship collided");
                this.shipDestroyed();
                this.ship.destroyShip();
                this.ship = null;
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

    private shipDestroyed() {
        this.emit("ship_destroyed", "gameOver");
    }

    private aliensDestroyed() {
        this.emit("aliens_destroyed", "winner");
    }
}
