// colours, stolen from 3b1b
const GRID_COLOUR = '#5cc3dba0';
const IHAT_COLOUR = '#81b561';
const JHAT_COLOUR = '#ff6f51';
const YELLOW = '#fff100';

let PIXEL_SCALE = 120; // px - equivalent to 1 unit in the plane
const LINE_WIDTH = 3; // px
let OFFSET = [0, 0]; // real

var gridSpacing = 1;

var planes = [];
var basePlane;
var transPlane;
var ORIGIN, MOUSE;
var testPoints = Array.from({length: 10}, (_, row) => Array.from({length: 10}, (__, col) => ([row-5, col-5]))).flat();
var v;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(25);

    basePlane = new Plane(new Matrix([
        [1, 0],
        [0, 1]
    ]));

    transPlane = new Plane(new Matrix([
        [1, 0],
        [1, 1]
    ]));

    planes = [ basePlane, transPlane ];

    ORIGIN = basePlane.createPoint(0, 0, 'real');

    // console.log(testPoints);
    // testPoints = testPoints.map(([x, y]) => transPlane.createPoint(x, y, 'real'));
    // testPoints.forEach((p, i) => console.log(`${i}, ${p.toString()}`));
    v = transPlane.createPoint(1, 2);
    // console.log(basePlane.getBorder());
}

function draw() {
    background(0);
    MOUSE = transPlane.createPoint(mouseX, mouseY, 'pixel');

    // basePlane.drawGrid('red');
    transPlane.drawGrid();
    ORIGIN.draw();
    // testPoints.forEach(p => p.draw());

    v.drawVector();

    MOUSE.draw();

    fill('white');
    text(MOUSE.toString(), 10, 40);

}

// function mouseDragged(event) {
//     OFFSET = [
//         OFFSET[0] - event.movementX/PIXEL_SCALE,
//         OFFSET[1] + event.movementY/PIXEL_SCALE,
//     ];
    
//     planes.forEach(p => p.update());
// }

// function mouseWheel(event) {
//     PIXEL_SCALE *= (1 + 0.05 * (event.delta > 0 ? -1 : 1));
    
//     planes.forEach(p => p.update());

//     // prevent scrolling
//     return false;
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    planes.forEach(p => p.update());
}