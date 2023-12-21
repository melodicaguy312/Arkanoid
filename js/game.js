"use strict";

import { createBricks } from './bricks.js';
import { keyDownHandler, keyUpHandler, mouseMoveHandler } from './controls.js';
import { draw } from './draw.js';

let canvas = document.getElementById("myCanvas")
export var display = {
    canvas: canvas,
    ctx: canvas.getContext("2d")
}

export var ball = {
    x: display.canvas.width / 2,
    y: display.canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 5,
}

export var paddle = {
    width: 75,
    height: 10,
    x: (display.canvas.width - 75) / 2,
    rightPressed: false,
    leftPressed: false,
}

var columns = document.getElementById("columns");
var brickColumnCount = columns.value;
var brickPadding = 10;
var brickOffsetLeft = 30;
var brickWidth =
    (display.canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) /
    brickColumnCount;

export var brick = {
    rows: 4,
    columns: columns.value,
    padding: 10,
    offsetTop: 50,
    offsetLeft: 30,
    width: (display.canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) / brickColumnCount,
    height: 20,
}

export var gameState = {
    score: 0,
    lives: 3,
    launch: false,
}

export var aimbot = document.getElementById("aimbot").checked;
export var bricks = [];



createBricks();

// create event listeners
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.getElementById("aimbot").addEventListener("change", function () {
    if (this.checked) {
        aimbot = true;
    } else {
        aimbot = false;
    }
});

// if the number of columns changes, update the brick width and redraw
columns.addEventListener("change", function () {
    brick.columns = columns.value;
    brick.width =
        (display.canvas.width -
            brick.offsetLeft * 2 -
            brick.padding * (brick.columns - 1)) /
        brick.columns;
    createBricks();
});


draw();