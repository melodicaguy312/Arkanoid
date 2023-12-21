import { display, paddle, aimbot, gameState } from './game.js';

export function keyDownHandler(e) {
    // if the right arrow key is pressed
    if (e.keyCode == 39) {
        paddle.rightPressed = true;
    }
    // if the left arrow key is pressed 
    else if (e.keyCode == 37) {
        paddle.leftPressed = true;
    }
    // if the spacebar is pressed 
    else if (e.keyCode == 32) {
        gameState.launch = true;
    }
}

export function keyUpHandler(e) {
    // if the right arrow key is released
    if (e.keyCode == 39) {
        paddle.rightPressed = false;
    }
    // if the left arrow key is released 
    else if (e.keyCode == 37) {
        paddle.leftPressed = false;
    }
}

// move paddle with mouse
export function mouseMoveHandler(e) {
    var relativeX = e.clientX - display.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < display.canvas.width && aimbot == false) {
        paddle.x = relativeX - paddle.width / 2;
    }
}