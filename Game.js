import World from "./World.js";
import Navigation from "./navigation.js";
import { Player, Spawner } from "./Characters.js";
import Item from "./Items.js";

class Game {
  static encounterChance = 30;
  static itemChance = 30;
  static moves = 0;
  static zone = "start";

  static gameOver(result) {
    console.log(result);
    console.log("Moves:", this.moves);
    World.render();
    Player.renderStats();
    console.log("");
  }

  static checkGameOver() {
    if (Player.hp <= 0) {
      this.gameOver("Y O U  L O S T !");
      throw new Error("Y O U  L O S T!");
    }
    const [y, x] = Navigation.currentLocation;
    const [y2, x2] = World.getWorldBoundaries();
    if (y === y2 && x === x2) {
      this.gameOver("Y O U  W O N !");
      throw new Error("Y O U  W O N !");
    } else {
      return false;
    }
  }

  static encounter() {
    if (this.zone === "undiscovered") {
      const enemyRoll = Math.floor(Math.random() * 101);
      if (enemyRoll < this.encounterChance) {
        Spawner.combat();
        return true;
      } else {
        const itemRoll = Math.floor(Math.random() * 101);
        if (itemRoll < this.itemChance) {
          const item = Item.spawnItem();
          Player.addBonus(item.stat, item.bonus);
          console.log(`You found a ${item.sprite}`);
          console.log(`${item.stat.toUpperCase()} +${item.bonus}`);
          return true;
        }
      }
    } else return false;
  }

  static async gameplayLoop() {
    console.clear();
    this.encounter() || console.log("\n");
    if (this.checkGameOver()) return;
    World.render();
    Player.renderStats();
    try {
      this.zone = Navigation.move(await Navigation.prompt());
      this.moves++;
    } catch {
      console.log("You quit the game");
      return;
    }
    this.gameplayLoop();
  }

  static run() {
    World.generateGrid();
    this.gameplayLoop();
  }
}

Game.run();
