// colours, stolen from 3b1b
const GRID_COLOUR = '#5cc3dba0';
const IHAT_COLOUR = '#81b561';
const JHAT_COLOUR = '#ff6f51';
const YELLOW = '#fff100';

const PIXEL_SCALE = 120; // px - equivalent to 1 unit in the plane
const LINE_WIDTH = 3; // px
let OFFSET = [0, 0]; // real

var gridSpacing = 1;

var basePlane;
var ORIGIN, MOUSE;
var testPoints = Array.from({length: 10}, (_, row) => Array.from({length: 10}, (__, col) => ([row-5, col-5]))).flat();

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(25);

    basePlane = new Plane(new Matrix([
        [1, 0],
        [0, 1]
    ]));

    ORIGIN = basePlane.createPoint(0, 0, 'real');

    console.log(testPoints);
    testPoints = testPoints.map(([x, y]) => basePlane.createPoint(x, y, 'real'));
    testPoints.forEach((p, i) => console.log(`${i}, ${p.toString()}`));

    console.log(basePlane.getBorder());
}

function draw() {
    background(0);
    MOUSE = basePlane.createPoint(mouseX, mouseY, 'pixel');

    basePlane.drawGrid();
    ORIGIN.draw();
    testPoints.forEach(p => p.draw());

    MOUSE.draw();

    fill('white');
    text(MOUSE.toString(), 10, 40);

    // let mousePoint = new PixelPoint(mouseX, mouseY);

    // IHAT = mousePoint.toRealPoint();

    // drawGrid(transform);

    // ORIGIN.draw();

    // draw basis vectors
    // IHAT.drawVector(ORIGIN, IHAT_COLOUR);
    // JHAT.drawVector(ORIGIN, JHAT_COLOUR);
}

// function drawMouse() {
//     if(mousePoint.x != 0 || mousePoint.y != 0) mousePoint.drawVector(undefined, YELLOW);

//     text(mousePoint.toRealPoint().toString(), 10, 40);
//     text(mousePoint.toString(), 10, 70);
// }

// /**
//  * 
//  * returns [ top, right, down, left ]
//  */
// function getBorderReal(transform) {
//     // const [ [top, left], ]

//     return [
//         PixelPoint.toRealY(0),
//         PixelPoint.toRealX(width),
//         PixelPoint.toRealY(height),
//         PixelPoint.toRealX(0)
//     ]
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}