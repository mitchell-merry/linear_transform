class Matrix {
    constructor(defaultM) {
        this.matrix = defaultM;
    }

    static identity(size) {
        return new Matrix(
            Array.from({ length: size }, (_, i) => (
                Array.from({ length: size }, (__, j) => i === j ? 1 : 0)
            ))
        );
    }

    static fromVector(v) {
        return new Matrix(
            v.map(val => [val])
        );
    }

    static toVector(m) {
        if(!Array.isArray(m.matrix)) throw new Error(`Not a matrix. ${m}`);
        if(m.matrix.length === 0 || m.matrix[0].length === 0) throw new Error(`Empty matrix. ${m.toString()}`);

        return m.matrix.map(row => row[0]);
    }

    add(other) {
        return new Matrix(
            this.matrix.map((row, rowIndex) => (
                row.map((cell, colIndex) => this.matrix[rowIndex][colIndex] + other.matrix[rowIndex][colIndex])
            ))
        );
    }

    scalarMultiply(scalar) {
        return new Matrix(
            this.matrix.map(row => (
                row.map(cell => cell * scalar)
            ))
        );
    }

    matrixMultiply(other) {
        return new Matrix(
            this.matrix.map((row, rowIndex) => (
                row.filter((c, colIndex) => colIndex < other.matrix[0].length).map((cell, colIndex) => dotProduct(this.matrix[rowIndex], other.colToVector(colIndex)))
            ))
        );
    }

    transformVector(v) {
        if(!Array.isArray(v)) throw new Error(`Not an array: ${v}`);
        
        return Matrix.toVector(this.matrixMultiply(Matrix.fromVector(v)));
    }

    inverse2by2() {
        if(this.matrix.length != 2 || this.matrix[0].length != 2) throw new Error("nah");

        const [ [a, b], [c, d] ] = this.matrix;

        return new Matrix([
            [d, -b],
            [-c, a]
        ]).scalarMultiply(1/(a*d-b*c));
    }

    vectorMultiply(other) {
        return this.matrixMultiply(new Matrix(other.map(v => [v])));
    }

    colToVector(colIndex) {
        return this.matrix.map(row => row[colIndex]);
    }

    toString() {
        return this.matrix.map(row => `[ ${row.join(` `)} ]`).join(`\n`);
    }
}

function dotProduct(v1, v2) {
    return v1.reduce((prev, curr, i) => prev + v1[i]*v2[i], 0);
}

function test() {
    let m = new Matrix([
        [1, 2, 3],
        [0, 1, 2],
        [2, 3, 0]
    ]);

    let m2 = new Matrix([
        [2, 4, 2],
        [1, 0, 1],
        [4, 2, 1]
    ])

    let m1 = new Matrix([
        [1, 0],
        [1, 1]
    ])

    console.log(m1.vectorMultiply([1, 2]));
}