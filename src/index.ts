import "./style.css";
import { Application, Assets, AssetsManifest, Graphics } from "pixi.js";
import { Game } from "./game";
import "@esotericsoftware/spine-pixi-v8";

import { gameHeight, gameWidth } from "./gameSettings";

(async () => {
    const app = new Application();

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: 0, width: gameWidth, height: gameHeight });
    app.stage.eventMode = "dynamic";
    app.stage.interactive = true;

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [
                { name: "ship", assets: [{ alias: "ship", src: "./assets/ship.png" }] },
                { name: "alien", assets: [{ alias: "alien", src: "./assets/alien.png" }] },
                { name: "bullet", assets: [{ alias: "bullet", src: "./assets/bullet.png" }] },
                { name: "alienBullet", assets: [{ alias: "alienBullet", src: "./assets/alienBullet.png" }] },
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["ship", "alien", "bullet", "alienBullet"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const background = new Graphics();

        background.rect(0, 0, gameWidth, gameHeight).fill(0xd3d3d3);

        app.stage.addChild(background);

        const game = new Game(app.stage);

        app.stage.addChild(game);
    }

    function resizeCanvas(): void {
        const resize = () => {
            const scaleX = window.innerWidth / gameWidth;
            const scaleY = window.innerHeight / gameHeight;
            const scale = Math.min(scaleX, scaleY);

            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.stage.scale.set(scale);
            app.stage.x = (window.innerWidth - gameWidth * scale) / 2;
            app.stage.y = (window.innerHeight - gameHeight * scale) / 2;
        };

        resize();
        window.addEventListener("resize", resize);
    }
})();
