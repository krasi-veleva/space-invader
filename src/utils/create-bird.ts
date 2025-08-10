import { AnimatedSprite, Texture } from "pixi.js";

export function createBird(): AnimatedSprite {
    const bird = new AnimatedSprite([Texture.from("ship")]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
