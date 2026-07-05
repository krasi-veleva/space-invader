import { Container } from "pixi.js";
import { StartScene } from "./startScene";
import { Game } from "./game";

export class SceneManager extends Container {
    private startScene: StartScene;
    private gameScene!: Game;

    constructor() {
        super();

        this.interactive = true;

        this.startScene = new StartScene();
        this.addChild(this.startScene);

        this.startScene.on("startClicked", (sceneName: string) => {
            console.log("start");
            if (sceneName === "game") {
                this.removeChild(this.startScene);
                this.startScene.destroy();

                this.gameScene = new Game();
                this.addChild(this.gameScene);
            }
        });
    }
}
