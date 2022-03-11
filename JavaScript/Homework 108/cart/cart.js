module.exports = class Cart {
  constructor(cart) {
    this.items = cart?.items || {};
  }

  updateItems(id, amount) {
    const q = this.items[id] || 0;
    this.items[id] = amount;
  }

  getItems() {
    return this.items;
  }
}