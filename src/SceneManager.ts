import { Container } from "pixi.js";
import { StartScene } from "./startScene";
import { Game } from "./game";
import { GameOver } from "./gameOver";

export class SceneManager extends Container {
    private startScene: StartScene;
    private gameScene!: Game;
    private gameOverScene!: GameOver;

    constructor() {
        super();

        this.interactive = true;

        this.startScene = new StartScene();
        this.addChild(this.startScene);

        this.startScene.on("startClicked", (sceneName: string) => {
            if (sceneName === "game") {
                this.removeChild(this.startScene);
                this.startScene.destroy();

                this.startGame();
            }
        });
    }

    private startGame() {
        this.gameScene = new Game();
        this.addChild(this.gameScene);

        this.gameScene.on("ship_destroyed", (sceneName: string) => {
            if (sceneName === "gameOver") {
                this.removeChild(this.gameScene);
                this.gameScene.destroy();

                this.showGameOver();
            }
        });
    }

    private showGameOver() {
        this.gameOverScene = new GameOver();
        this.addChild(this.gameOverScene);

        this.gameOverScene.on("playAgainClicked", (sceneName: string) => {
            if (sceneName === "game1") {
                this.removeChild(this.gameOverScene);
                this.gameOverScene.destroy();

                this.startGame();
            }
        });
    }
}
