export class Order {
  constructor(menu) {
    this.order = {};
    this.initializeOrder(menu);
  }

  initializeOrder(menu) {
    menu.forEach(item => {
      this.order[item.id] = {
        id: item.id,
        itemName: item.itemName,
        quantity: 0,
        itemPrice: item.price,
        get itemTotalPrice() {
          return this.quantity * this.itemPrice;
        }
      };
    });
  }

  resetQuantities() {
    Object.values(this.order).forEach(item => {
      item.quantity = 0;
    });
  }

  get totalPrice() {
    return Object.values(this.order).reduce((total, item) => {
      return total + item.itemTotalPrice;
    }, 0);
  }
}