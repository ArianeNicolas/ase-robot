import * as Entities from "./entities.js";
import { Vector } from "./utils.js";

export interface Scene {
  size: Vector;
  entities: Entities.Entities[];
  robot: Entities.Robot;
  time: number;
  timestamps: Array<Entities.Timestamp>;
}

export class BaseScene {
  size: Vector;
  entities: Entities.Entities[] = [];
  robot: Entities.Robot;
  time: number = 0;
  timestamps: Array<Entities.Timestamp> = [];

  constructor(size: Vector = new Vector(10000, 10000)) {
    this.size = size;
    this.robot = new Entities.Robot(
      this.size.scale(0.5),
      new Vector(250, 250),
      0,
      30,
      this,
    );
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projX()));
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projX()));
    this.timestamps.push(new Entities.Timestamp(0, this.robot));
  }
}

export class SecondScene {
  size: Vector;
  entities: Entities.Entities[] = [];
  robot: Entities.Robot;
  time: number = 0;
  timestamps: Array<Entities.Timestamp> = [];

  constructor(size: Vector = new Vector(10000, 10000)) {
    this.size = size;
    this.robot = new Entities.Robot(
      this.size.scale(0.5),
      new Vector(250, 250),
      0,
      30,
      this,
    );
    const sizeX = this.size.x;
    const sizeY = this.size.y;
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projX()));
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projX()));
    this.entities.push(
      new Entities.Wall(
        new Vector(0.4 * sizeX, sizeY),
        new Vector(0.2 * sizeX, 0.7 * sizeY),
      ),
    );

    this.timestamps.push(new Entities.Timestamp(0, this.robot));
  }
}
// You can add new Scenes here
export class BlockScene {
  size: Vector;
  entities: Entities.Entities[] = [];
  robot: Entities.Robot;
  time: number = 0;
  timestamps: Array<Entities.Timestamp> = [];

  constructor(size: Vector = new Vector(10000, 10000)) {
    this.size = size;
    this.robot = new Entities.Robot(
      this.size.scale(0.5),
      new Vector(250, 250),
      0,
      30,
      this,
    );
    const sizeX = this.size.x;
    const sizeY = this.size.y;
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projX()));
    this.entities.push(new Entities.Wall(Vector.null(), this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projY()));
    this.entities.push(new Entities.Wall(this.size, this.size.projX()));
    this.entities.push(
      new Entities.Block(
        new Vector(sizeX * (2 / 8), sizeY * (2.5 / 8)),
        new Vector(sizeX / 8, sizeX / 8),
      ),
    );
    this.entities.push(
      new Entities.Block(
        new Vector(sizeX * (6 / 8), sizeY * (3.5 / 8)),
        new Vector(sizeX / 8, sizeX / 8),
      ),
    );
    this.entities.push(
      new Entities.Block(
        new Vector(sizeX * (1 / 8), sizeY * (5.5 / 8)),
        new Vector(sizeX / 8, sizeX / 8),
      ),
    );
    this.entities.push(
      new Entities.Block(
        new Vector(sizeX * (5 / 8), sizeY * (6.5 / 8)),
        new Vector(sizeX / 8, sizeX / 8),
      ),
    );

    this.timestamps.push(new Entities.Timestamp(0, this.robot));
  }
}
