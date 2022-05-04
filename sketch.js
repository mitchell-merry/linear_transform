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
var v;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(25);

    basePlane = new Plane(new Matrix([
        [1, 1],
        [0, 1]
    ]));

    ORIGIN = basePlane.createPoint(0, 0, 'real');

    console.log(testPoints);
    testPoints = testPoints.map(([x, y]) => basePlane.createPoint(x, y, 'real'));
    testPoints.forEach((p, i) => console.log(`${i}, ${p.toString()}`));
    v = basePlane.createPoint(1, 1.5);
    // console.log(basePlane.getBorder());
}

function draw() {
    background(0);
    MOUSE = basePlane.createPoint(mouseX, mouseY, 'pixel');

    basePlane.drawGrid();
    ORIGIN.draw();
    testPoints.forEach(p => p.draw());

    v.drawVector();

    MOUSE.draw();

    fill('white');
    text(MOUSE.toString(), 10, 40);

}

function mouseDragged(event) {
    OFFSET = [
        OFFSET[0] - event.movementX/PIXEL_SCALE,
        OFFSET[1] + event.movementY/PIXEL_SCALE,
    ];
    basePlane.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    basePlane.update();
}