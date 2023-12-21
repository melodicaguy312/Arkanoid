import { ball, gameState, brick, bricks } from "./game.js";

/**
 * Detects collisions between the ball and each brick
 */
export function collisionDetection() {
    for (let c = 0; c < brick.columns; c++) {
        for (let r = 0; r < brick.rows; r++) {
            var b = bricks[c][r];
            // if the brick is still visible
            if (b.status == 1 || b.status == 2 || b.status == 3) {
                // if the ball hits a brick
                if (
                    ball.x > b.x &&
                    ball.x < b.x + brick.width &&
                    ball.y > b.y &&
                    ball.y < b.y + brick.height
                ) {
                    var audio = new Audio('./assets/tap.wav');
                    audio.play();
                    // if it hits a brick on the side, reverse dx
                    if (ball.y > (b.y + 1) && ball.y < (b.y + brick.height - 1)) {
                        ball.dx = -ball.dx;
                    }
                    // if it hits a brick on the top or bottom, reverse dy
                    else {
                        ball.dy = -ball.dy;
                    }
                    damageBrick(b);
                }
            }
        }
    }
}

/**
 * Damages a brick. If the brick has no more lives, it is removed.
 * @param {object} b - a brick
 */
export function damageBrick(b) {
    b.status--;
    if (b.status == 2) {
        b.color = "#0862d9";
    } else if (b.status == 1) {
        b.color = "#66a4ff";
    } else if (b.status == 0) {
        gameState.score++;
        // check if the player won
        if (gameState.score == brick.columns * brick.rows) {
            var winSound = new Audio('./assets/win.wav');
            winSound.play();
            // wait 100ms before reloading the page to allow the audio to play
            setTimeout(function () {
                alert("GANASTE!");
                document.location.reload();
            }, 100);
        }
    }
}