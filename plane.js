class Plane {
    
    /**
     * 
     * @param {*} transformMatrix Matrix defining the linear transformation of the plane 
     */
    constructor(transformMatrix) {
        this.transformMatrix = transformMatrix;
        this.inverseTransformMatrix = transformMatrix.inverse2by2();

        this.points = []
    }

    createPoint(x, y, type='real') {
        const p = new Point(this, x, y, type);
        this.points.push(p);

        return p;
    }

    transform(v) {
        return this.transformMatrix.transformVector(v);
    }

    inverseTransform(v) {
        return this.inverseTransformMatrix.transformVector(v);
    }

    drawGrid() {
        stroke(GRID_COLOUR);
        strokeWeight(1);

        for(let x = -5; x <= 5; x++) {
            const top = this.createPoint(x, -5).pixel;
            const bot = this.createPoint(x, 5).pixel;

            linePVecs(top, bot);

            
            const left = this.createPoint(-5, x).pixel;
            const right = this.createPoint(5, x).pixel;

            linePVecs(left, right);
        }
    }

    update() {
        this.points.forEach(point => {
            point.update();
        });
    }

    // drawGrid() {
        // const [ rTop, rRight, rDown, rLeft ] = getBorderReal(this.transform);
    
        // console.log(getBorderReal());
    
        // for(let pixelY = )
        // for(let x = 0; RealPoint.toPixelX(x) <= width; x += gridSpacing)
        // {
        //     let posTopPoint = new RealPoint(x, rTop).transform(IHAT, JHAT);
        //     let posDownPoint = new RealPoint(x, rDown).transform(IHAT, JHAT);
        //     posTopPoint.drawLine(posDownPoint, GRID_COLOUR);
    
        //     const negTopPoint = new RealPoint(-x, rTop).transform(IHAT, JHAT);
        //     const negDownPoint = new RealPoint(-x, rDown).transform(IHAT, JHAT);
        //     negTopPoint.drawLine(negDownPoint, GRID_COLOUR);
        // }
    
        // for(let y = 0; RealPoint.toPixelY(y) > 0; y += gridSpacing)
        // {
        //     const posLeftPoint = new RealPoint(rLeft, y).transform(IHAT, JHAT);
        //     const posRightPoint = new RealPoint(rRight, y).transform(IHAT, JHAT);
        //     posLeftPoint.drawLine(posRightPoint, GRID_COLOUR);
    
        //     const negLeftPoint = new RealPoint(rLeft, -y).transform(IHAT, JHAT);
        //     const negRightPoint = new RealPoint(rRight, -y).transform(IHAT, JHAT);
        //     negLeftPoint.drawLine(negRightPoint, GRID_COLOUR);
        // }
    // }

    getBorder() {
        const [ left, top ] = this.createPoint(0, 0, 'pixel').real;
        const [ right, bottom ] = this.createPoint(width, height, 'pixel').real;

        console.log(top, right, left, bottom);
    }
}

function linePVecs(v1, v2) {
    line(v1[0], v1[1], v2[0], v2[1]);
}