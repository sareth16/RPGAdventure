import enquirer from "enquirer";
import World from "./World.js";

export default class Navigation {
  static currentLocation = [0, 0];
  static possibleMovement() {
    let result = [];
    const [y, x] = this.currentLocation;
    if (y !== World.height - 1) result.push("Up");
    if (x !== World.width - 1) result.push("Right");
    if (y !== 0) result.push("Down");
    if (x !== 0) result.push("Left");
    return result;
  }
  static question() {
    return new enquirer.Select({
      name: "movement",
      message: "Where would you like to go?",
      choices: this.possibleMovement(),
    });
  }

  static async prompt() {
    try {
      return await this.question().run();
    } catch {
      throw new Error("You quit the game");
    }
  }

  static move(direction) {
    let newLocation = this.currentLocation.slice();
    switch (direction) {
      case "Left":
        newLocation[1] -= 1;
        break;
      case "Right":
        newLocation[1] += 1;
        break;
      case "Up":
        newLocation[0] += 1;
        break;
      case "Down":
        newLocation[0] -= 1;
    }
    let locationType = World.getCell(newLocation).type;
    World.updateCell(this.currentLocation, "discovered");
    World.updateCell(newLocation, "player");
    this.currentLocation = newLocation;
    return locationType;
  }
}
