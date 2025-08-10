import "./style.css";
import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

import { gameHeight, gameWidth } from "./gameSettings";
import { createBird } from "./utils/create-bird";

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

        const birdFromSprite = createBird();

        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(gameWidth / 2, gameHeight / 4);

        app.stage.addChild(birdFromSprite);
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
