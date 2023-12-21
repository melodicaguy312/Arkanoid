import { brick, bricks } from "./game.js";

/**
 * Creates an array of bricks
 */
export function createBricks() {
    for (let c = 0; c < brick.columns; c++) {
        bricks[c] = [];
        for (let r = 0; r < brick.rows; r++) {
            let randomColor = getRandomColor();
            // set the status of the brick depending on the color
            let brickStatus = () => {
                if (randomColor == "#00288f") {
                    return 3;
                } else if (randomColor == "#0862d9") {
                    return 2;
                } else if (randomColor == "#66a4ff") {
                    return 1;
                }
            };
            bricks[c][r] = { x: 0, y: 0, status: brickStatus(), color: randomColor };
        }
    }
}

/**
 * Returns a random color
 * 
 * @returns color
 */
export function getRandomColor() {
    let colores = ["#00288f", "#0862d9", "#66a4ff"];
    let color = colores[Math.floor(Math.random() * colores.length)];
    return color;
}