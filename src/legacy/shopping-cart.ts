type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

// ------------ investigando responsabilidade da classe: -----------------------
// carrinho deveria ter items? => sim!
// carrinho precisa ter um status do pedido => talvez não => suspeito

// !!!  Um indício de coesão numa classe, é o uso de atributos dela em seus métodos. !!!

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open'; //
  // essa orderStatus pode sair daqui e o próprio nome dela dá uma dica de qual classe precisa ser
  // criada: Order

  get items(): Readonly<CartItem[]> {
    return this._items;
  }
  //O tipo Readonly<CartItem[]> é um array de CartItem, onde todas as propriedades serão readonly

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }
  // o getter vai junto, obviamente

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
  // validação, em alguns casos pode ser tratada como responsabilidade à parte. No etanto, como
  // só há essa validação, é aceitável deixá-la aqui já que ela está coesa.
  // caso haja a necessidade de criar mais validações, é interessante considerar a hipótese
  // de passá-las para uma classe separada.

  sendMessage(msg: string): void {
    // não é coeso
    // não faz muito sentido nem na classe ShoppingCart, nem na classe Order, por isso é interessante
    // criar uma classe para menssagens

    console.log(`Menssagem enviada: ${msg}`);
  }

  saveOrder(): void {
    // não é coeso
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

    // não é coeso
  }
}

//----------------------------------------------------------main
const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'carambola', price: 2.9 });
shoppingCart.addItem({ name: 'balaustre', price: 49.9 });
shoppingCart.addItem({ name: 'repimboca', price: 30 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());

console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
//----------------------------------------------------------main

// main -> geralmente a parte mais suja do código. Onde são instanciadas classes,
//injeta dependecias etc
