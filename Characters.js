export class Player {
  static sprite = "🐵";
  static hp = 100;
  static def = 10;
  static atk = 10;
  static renderStats() {
    console.log(`HP:${this.hp} DEF:${this.def} ATK:${this.atk}`);
  }
  static addBonus(stat, bonus) {
    Player[stat] += bonus;
  }
}

class Enemy {
  constructor(hp, def, atk) {
    this.hp = hp;
    this.def = def;
    this.atk = atk;
  }
}

class Ghost extends Enemy {
  constructor(hp, def, atk) {
    super(hp, def, atk);
    this.sprite = "👻";
  }
}

class Spider extends Enemy {
  constructor(hp, def, atk) {
    super(hp, def, atk);
    this.sprite = "🕷️";
  }
}

class Snake extends Enemy {
  constructor(hp, def, atk) {
    super(hp, def, atk);
    this.sprite = "🐍";
  }
}

export class Spawner {
  static #possibleEnemies = [
    new Ghost(18, 34, 12),
    new Ghost(20, 30, 10),
    new Spider(18, 0, 14),
    new Spider(15, 0, 16),
    new Snake(8, 0, 12),
    new Snake(10, 0, 5),
  ];

  static #spawnEnemy() {
    const random = Math.floor(Math.random() * this.#possibleEnemies.length);
    return { ...this.#possibleEnemies[random] };
  }

  static #fight(attacker, defender) {
    let dmg = attacker.atk - Math.round(attacker.atk * (defender.def / 100));
    defender.hp -= dmg;
    return dmg;
  }

  static combat() {
    const enemy = this.#spawnEnemy();
    const initiative = Math.round(Math.random());
    console.log(`You fought a ${enemy.sprite}`);
    let dmgReceived = 0;
    if (initiative) {
      this.#fight(Player, enemy);
    }
    while (Player.hp > 0 && enemy.hp > 0) {
      dmgReceived += this.#fight(enemy, Player);
      this.#fight(Player, enemy);
    }
    console.log(`You received ${dmgReceived} dmg.`);
  }
}
