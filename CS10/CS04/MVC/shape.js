// controller에서 가공된 2차원 배열을 가지고 면적을 구해 줌
// MVC 패턴이라면 Model 역할 (데이터를 가지고 있음)
// 구한 값을 다시 Controller에게 보낸다. - 데이터를 shapeFactory를 통해 보내보았음
// Controller는 OutputView의 printResult를 호출
const Graph = require('./graph');

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Edge {
  constructor() {
    this.vertices = arguments[0];
    this.length = this.calculateLength();
  }

  calculateLength() {
    const [v1, v2] = this.vertices;
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
  }

  print() {
    console.log('DISTANCE BETWEEN TWO POINTS', this.length);
  }

  getLength() {
    return this.length;
  }
}

// Shape가 Edge를 상속하도록?
class Shape {
  constructor() {
    this.vertices = arguments[0];
    this.edges = this.calculateEdge();
    this.area;
  }

  calculateEdge() {
    const edges = [];
    this.vertices.forEach((v, i) => {
      edges.push(new Edge([v, this.vertices[i + 1] ?? this.vertices[0]]));
    });
    return edges;
  }

  // TODO - outputView로 빼기
  print() {
    console.log(`AREA OF ${this.name} : `, this.area);
  }

  getArea() {
    return this.area;
  }

  sortClockWise() {
    // TODO
  }
}

class Triangle extends Shape {
  constructor(vertices) {
    super(vertices);
    this.name = 'TRIANGLE';
    this.area = this.calculateArea();
  }

  calculateArea() {
    const [e1, e2, e3] = this.edges.map(e => e.length);
    const s = (e1 + e2 + e3) / 2;
    return Math.sqrt(s * (s - e1) * (s - e2) * (s - e3));
  }
}

class Rectangle extends Shape {
  constructor(vertices) {
    super(vertices);
    this.name = 'RECTANGLE';
    this.width = this.edges[0].length;
    this.height = this.edges[1].length;
    this.area = this.calculateArea();
  }

  isRectangle() {
    // TODO
  }

  calculateArea() {
    return this.width * this.height;
  }
}

class Polygon extends Shape {
  constructor(vertices) {
    super(vertices);
    this.name = 'POLYGON';
    this.area = this.calculateArea();
  }

  // 우선 좌표가 시계방향으로 정렬되어 있다고 가정하고 면적 구하기
  calculateArea() {
    const v = this.vertices;
    let area = 0;
    for (let i = 0; i + 2 < v.length; i++) {
      area += new Triangle([v[0], v[i + 1], v[i + 2]]).area;
    }
    return area;
  }
}

// [도형공장] 여기서 inputData에 따라서 도형을 만든다
class ShapeFactory {
  constructor(data) {
    this.vertices = this.makeVertices(data);
    this.totalVertices = this.vertices.length;
  }

  makeVertices(data) {
    return data.map(d => new Vertex(d[0], d[1]));
  }

  create() {
    if (this.totalVertices >= 5) {
      return new Polygon(this.vertices);
    }

    const shapeObj = {
      2: () => new Edge(this.vertices),
      3: () => new Triangle(this.vertices),
      4: () => new Rectangle(this.vertices),
    };

    return shapeObj[this.totalVertices]();
  }
}

module.exports = ShapeFactory;
