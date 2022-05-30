const POINT_SIZE = 10;

class Point {

    constructor(plane, x, y, type='real') {
        this.plane = plane;

        if (type === 'real') {
            this.real = this.plane.transform([x, y]);
            // this.inv = this.plane.inverseTransform(this.real);
            // console.log(this.real);
            this.inv = [x, y];
            this.pixel = this._toPixel(this.real);
        } else if(type === 'pixel') {
            this.pixel = [x, y];
            this.real = this._toReal(this.pixel);
            this.inv = this.plane.inverseTransform(this.real);
        }
    }

    draw() {
        circle(this.pixel[0], this.pixel[1], POINT_SIZE);
    }

    drawVector(base=ORIGIN, color='white') {
        let baseVec = createVector(base.pixel[0], base.pixel[1]); 
        let thisVec = createVector(this.pixel[0], this.pixel[1]).sub(baseVec);

        // https://p5js.org/reference/#/p5.Vector/magSq
        push();
        stroke(color);
        strokeWeight(LINE_WIDTH);
        fill(color);

        translate(baseVec.x, baseVec.y);
        line(0, 0, thisVec.x, thisVec.y);
        
        // draw arrow
        let arrowSize = 2*3;
        rotate(thisVec.heading());
        translate(thisVec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    update() {
        this.pixel = this._toPixel(this.real);
    }

    _toPixel(real) {
        const [ offX, offY ] = OFFSET;
        const [ invX, invY ] = this.inv;

        return [
            (invX - offX) * PIXEL_SCALE + width / 2,
            -(invY - offY) * PIXEL_SCALE + height / 2
        ];
    }

    _toReal(pixel) {
        const [ pixelX, pixelY ] = pixel;
        const [ offX, offY ] = OFFSET;

        return this.plane.transform([
            (pixelX - (width  / 2)) / PIXEL_SCALE + offX,
            -(pixelY - (height / 2)) / PIXEL_SCALE + offY,
        ]);
    }

    realToString() {
        return `(${+this.real[0].toFixed(2)}, ${+this.real[1].toFixed(2)})`
    }

    pixelToString() {
        return `(${this.pixel[0]}, ${this.pixel[1]})`
    }

    toString() {
        return `Real: ${this.realToString()}, Pixel: ${this.pixelToString()}`;
    }
}

// class PixelPoint {

//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     toRealPoint() {
//         return new RealPoint(
//             PixelPoint.toRealX(this.x),
//             PixelPoint.toRealY(this.y)
//         );
//     }

//     draw(color='white') {
//         fill(color);
//         // console.log(this.toString());
//         circle(this.x, this.y, POINT_SIZE);
//     }

//     drawVector(base, color='white') {
//         if(!base) base = ORIGIN.toPixelPoint();

//         let baseVec = createVector(base.x, base.y); 
//         let thisVec = createVector(this.x, this.y).sub(baseVec);

//         // https://p5js.org/reference/#/p5.Vector/magSq
//         push();
//         stroke(color);
//         strokeWeight(LINE_WIDTH);
//         fill(color);

//         this.drawLine(base, color);
//         translate(baseVec.x, baseVec.y);
        
//         // draw arrow
//         let arrowSize = LINE_WIDTH*3;
//         rotate(thisVec.heading());
//         translate(thisVec.mag() - arrowSize, 0);
//         triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//         pop();
//     }

//     drawLine(base, color='white') {
//         if(!base) base = ORIGIN.toPixelPoint();

//         let baseVec = createVector(base.x, base.y); 
//         let thisVec = createVector(this.x, this.y).sub(baseVec);

//         // https://p5js.org/reference/#/p5.Vector/magSq
//         push();
//         stroke(color);
//         strokeWeight(LINE_WIDTH);
//         fill(color);

//         translate(baseVec.x, baseVec.y);
//         line(0, 0, thisVec.x, thisVec.y);
//         pop();
//     }

//     toString() { return `(${+this.x.toFixed(2)}, ${+this.y.toFixed(2)})`; }

//     static toRealX(x) { return (x - width  / 2) / PIXEL_SCALE; }
//     static toRealY(y) { return -(y - height / 2) / PIXEL_SCALE; }
// }

// class RealPoint {

//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     toPixelPoint() {
//         return new PixelPoint(
//             RealPoint.toPixelX(this.x),
//             RealPoint.toPixelY(this.y)
//         );
//     }

//     draw() {
//         this.toPixelPoint().draw();
//     }

//     /**
//      * Draws the vector represented by the point.
//      * 
//      * @param {RealPoint} base Where to draw the vector from. Defaults to the origin.
//      */
//     drawVector(base, color='white') {
//         if(!base) base = ORIGIN;

//         this.toPixelPoint().drawVector(base.toPixelPoint(), color);
//     }

//     drawLine(base, color='white') {
//         if(!base) base = ORIGIN;

//         this.toPixelPoint().drawLine(base.toPixelPoint(), color);
//     }

//     transform(ihat, jhat) {
//         return new RealPoint(
//             this.x * ihat.x + this.y * jhat.x,
//             this.x * ihat.y + this.y * jhat.y
//         );
//     }

//     toString() { return `(${+this.x.toFixed(2)}, ${+this.y.toFixed(2)})`; }

//     static toPixelX(x) { return width / 2  + x * PIXEL_SCALE; }
//     static toPixelY(y) { return (height / 2 - y * PIXEL_SCALE); }
// }