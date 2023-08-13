type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  get items(): Readonly<CartItem[]> {
    return this._items;
  }
  //O tipo Readonly<CartItem[]> é um array de CartItem, onde todas as propriedades serão readonly

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  total(): number {
    return +this._items.reduce((sum, value) => sum + value.price, 0).toFixed(2);
    //O + garante que o retorno será um number
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log(`Menssagem enviada: ${msg}`);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso!');
  }

  clear(): void {
    console.log('Limpando carrinho de compras...');
    this._items.length = 0;
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido.`);
    this.saveOrder();
    this.clear();
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItem({ name: 'carambola', price: 2.9 });
shoppingCart.addItem({ name: 'balaustre', price: 49.9 });
shoppingCart.addItem({ name: 'repimboca', price: 30 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());

console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
