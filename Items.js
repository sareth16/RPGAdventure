export default class Item {
  constructor(name, sprite, stat, bonus) {
    this.name = name;
    this.sprite = sprite;
    this.stat = stat;
    this.bonus = bonus;
  }
  static #possibleItems = [
    new Item("sword", "🗡️", "atk", 2),
    new Item("shield", "🛡️", "def", 5),
    new Item("banana", "🍌", "hp", 10),
  ];
  static spawnItem() {
    const random = Math.floor(Math.random() * this.#possibleItems.length);
    return { ...this.#possibleItems[random] };
  }
}
