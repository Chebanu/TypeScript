interface Printable {
  print(): void;
}

abstract class Shape {
  readonly name: string;
  readonly color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(name: string, color: string, radius: number) {
    super(name, color);
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape implements Printable {
  sideOne: number;
  sideTwo: number;

  constructor(name: string, color: string, sideOne: number, sideTwo: number) {
    super(name, color);
    this.sideOne = sideOne;
    this.sideTwo = sideTwo;
  }

  calculateArea(): number {
    return this.sideOne * this.sideTwo;
  }

  print(): void {
    console.log(`Area of ${this.name} (${this.color}) is: length * width`);
  }
}

class Square extends Shape {
  side: number;

  constructor(name: string, color: string, side: number) {
    super(name, color);
    this.side = side;
  }

  calculateArea(): number {
    return this.side * this.side;
  }

  print(): void {
    console.log(
      `Area of ${this.name} (${this.color}) is : Side length * Side length`
    );
  }
}

class Triangle extends Shape {
  height: number;
  side: number;

  constructor(name: string, color: string, height: number, side: number) {
    super(name, color);
    this.height = height;
    this.side = side;
  }

  calculateArea(): number {
    return (this.height * this.side) / 2;
  }
}
