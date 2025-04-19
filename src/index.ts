import "./style.css";
import { Application, Assets, AssetsManifest } from "pixi.js";

import { createBird } from "./utils/create-bird";

const gameWidth = 1280;
const gameHeight = 720;

(async () => {
    const app = new Application();

    // wait for the page to load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: 0xd3d3d3, width: gameWidth, height: gameHeight });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [{ name: "bird", assets: [{ alias: "bird", src: "./assets/simpleSpriteSheet.json" }] }],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["bird"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const birdFromSprite = createBird();

        // birdFromSprite.anchor.set(0.5, 0.5);
        // birdFromSprite.position.set(gameWidth / 2, gameHeight / 4);

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
