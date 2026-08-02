import { Container, Graphics, Text } from "pixi.js";
import { gameHeight, gameWidth } from "./gameSettings";

export class StartScene extends Container {
    private startButton?: Graphics;
    private buttonContainer?: Container;

    constructor() {
        super();

        this.init();
    }

    private init() {
        this.drawText();
        this.createStartButton();
        this.buttonContainer?.on("pointerdown", this.onStartClick.bind(this));
    }

    private drawText() {
        const text = new Text({
            text: "Space Invaders",
            style: {
                fontFamily: "Grandstander ExtraBold",
                fontSize: 70,
                fill: 0xff9ff3,
                stroke: { color: 0x000000, width: 6, join: "round" },
                padding: 0,
                fontWeight: "800",
            },
            x: gameWidth / 2,
            y: gameHeight / 2 - 150,
            anchor: 0.5,
        });

        this.addChild(text);
    }

    private createStartButton() {
        this.startButton = new Graphics();
        this.buttonContainer = new Container();
        this.buttonContainer.interactive = true;

        const buttonWidth = 220;
        const buttonHeight = 70;
        const radius = 20;
        const positionX = gameWidth / 2 - buttonWidth / 2;
        const positionY = gameHeight / 2 - buttonHeight / 2;

        this.startButton
            .roundRect(0, 0, buttonWidth, buttonHeight, radius)
            .fill({ color: 0xff9ff3 })
            .stroke({ width: 4, color: 0x000000 });

        const startText = new Text({
            text: "START",
            style: {
                fontFamily: "Grandstander ExtraBold",
                fontSize: 32,
                fill: 0xffffff,
                stroke: { color: 0x000000, width: 6, join: "round" },
                fontWeight: "bold",
            },
        });

        startText.anchor.set(0.5);
        startText.position.set(0 + buttonWidth / 2, 0 + buttonHeight / 2);

        this.buttonContainer.addChild(this.startButton);
        this.buttonContainer.addChild(startText);
        this.addChild(this.buttonContainer);
        this.buttonContainer.position.set(positionX, positionY + 100);
    }

    private onStartClick() {
        this.emit("startClicked", "game");
    }
}
