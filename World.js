import { Player } from "./Characters.js";

export default class World {
  static width = 11;
  static height = 6;
  static sprites = {
    terrain: { undiscovered: ["🌲", "🌳", "🌴"], discovered: "🐾" },
    star: "⭐",
  };
  static grid = [];

  static #getRandomTerrainSprite() {
    const terrain = this.sprites.terrain.undiscovered;
    const randomInteger = Math.floor(Math.random() * terrain.length);
    return terrain[randomInteger];
  }

  static #assignSprite(cell) {
    switch (cell.type) {
      case "undiscovered":
        cell.sprite = this.#getRandomTerrainSprite();
        break;
      case "discovered":
        cell.sprite = this.sprites.terrain.discovered;
        break;
      case "player":
        cell.sprite = Player.sprite;
        break;
      case "goal":
        cell.sprite = this.sprites.star;
        break;
    }
  }

  static generateGrid() {
    let grid = [];
    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        row.push({
          coords: [y, x],
          type: "undiscovered",
        });
      }
      grid.push(row);
    }
    const firstCell = grid[0][0];
    firstCell.type = "player";
    const lastCell = grid[this.height - 1][this.width - 1];
    lastCell.type = "goal";

    for (const row of grid) {
      for (const cell of row) {
        this.#assignSprite(cell);
      }
    }
    this.grid = grid;
  }

  static updateCell(coords, newType) {
    const [y, x] = coords;
    const cell = this.grid[y][x];
    cell.type = newType;
    this.#assignSprite(cell);
  }

  static getCell(coords) {
    try {
      const [y, x] = coords;
      return this.grid[y][x];
    } catch {
      console.log(new Error("GRID NOT GENERATED"));
    }
  }

  static getWorldBoundaries() {
    return [this.height - 1, this.width - 1];
  }

  static render() {
    const grid = this.grid.toReversed();
    for (const row of grid) {
      let renderedRow = "";
      for (const cell of row) {
        renderedRow += cell.sprite;
      }
      console.log(renderedRow);
    }
  }
}
