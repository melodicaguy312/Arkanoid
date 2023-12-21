import { display, paddle, brick, bricks, ball, gameState, aimbot } from "./game.js";
import { collisionDetection } from "./collision.js";

/**
 * Draws the ball
 */
export function drawBall() {
    display.ctx.beginPath();
    display.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    display.ctx.fillStyle = "#0095DD";
    display.ctx.fill();
    display.ctx.closePath();
}

/**
 * Draws the paddle
 */
export function drawPaddle() {
    display.ctx.beginPath();
    display.ctx.rect(paddle.x, display.canvas.height - paddle.height, paddle.width, paddle.height);
    display.ctx.fillStyle = "#0095DD";
    display.ctx.fill();
    display.ctx.closePath();
}

/**
 * Draws each brick
 */
export function drawBricks() {
    for (let c = 0; c < brick.columns; c++) {
        for (let r = 0; r < brick.rows; r++) {
            // if the brick is still active
            if (bricks[c][r].status == 1 || bricks[c][r].status == 2 || bricks[c][r].status == 3) {
                var brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
                var brickY = r * (brick.height + brick.padding) + brick.offsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                display.ctx.beginPath();
                display.ctx.rect(brickX, brickY, brick.width, brick.height);
                display.ctx.fillStyle = bricks[c][r].color;
                display.ctx.fill();
                display.ctx.closePath();
            }
        }
    }
}

/**
 * Draws the score
 */
export function drawScore() {
    display.ctx.font = "16px Arial";
    display.ctx.fillStyle = "#0095DD";
    display.ctx.fillText("Score: " + gameState.score, 8, 20);
}

/**
 * Draws the lives left
 */
export function drawLives() {
    display.ctx.font = "16px Arial";
    display.ctx.fillStyle = "#0095DD";
    display.ctx.fillText("Lives: " + gameState.lives, display.canvas.width - 65, 20);
}

/**
 * Draws the game
 */
export function draw() {
    // clear canvas
    display.ctx.clearRect(0, 0, display.canvas.width, display.canvas.height);
    // draws everything
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    // make collision detection
    collisionDetection();

    // rebound off walls
    if (ball.x + ball.dx > display.canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    // rebound off ceiling
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    // rebound off paddle
    else if (ball.y + ball.dy > display.canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            gameState.lives--;
            if (!gameState.lives) {
                // restart the game
                let loseAudio = new Audio('./assets/lose.wav');
                loseAudio.play();
                // wait 100ms before reloading the page to allow the audio to play
                setTimeout(function () {
                    alert("PERDISTE!");
                    document.location.reload();
                }, 100);
            } else {
                // pauses the game
                gameState.launch = false;
                ball.dy = -ball.dy;
            }
        }
    }

    if (aimbot == true) {
        paddle.x = ball.x - paddle.width / 2;
    } else {
        // allow movement of paddle
        if (paddle.rightPressed && paddle.x < display.canvas.width - paddle.width) {
            paddle.x += 7;
        } else if (paddle.leftPressed && paddle.x > 0) {
            paddle.x -= 7;
        }
    }

    if (gameState.launch == true) {
        columns.setAttribute("disabled", "");
        // move ball
        ball.x += ball.dx;
        ball.y += ball.dy;
    } else {
        // stick ball to paddle
        ball.x = paddle.x + paddle.width / 2;
        ball.y = display.canvas.height - paddle.height - ball.radius;
    }

    requestAnimationFrame(draw);
}