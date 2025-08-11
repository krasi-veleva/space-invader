import "./style.css";
import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { gameHeight, gameWidth } from "./gameSettings";
import { Ship } from "./ship";
import { Bullet } from "./bullet";

(async () => {
    const app = new Application();

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: 0xd3d3d3, width: gameWidth, height: gameHeight });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [{ name: "ship", assets: [{ alias: "ship", src: "./assets/ship.png" }] }],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["ship"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const shipFromSprite = new Ship();
        const bullet = new Bullet();

        app.stage.addChild(shipFromSprite);
        app.stage.addChild(bullet);
    }

    function resizeCanvas(): void {
        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.stage.scale.x = window.innerWidth / gameWidth;
            app.stage.scale.y = window.innerHeight / gameHeight;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
