import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { TenPercentDiscount } from './classes/discounts';
import { EnterpriseCustomer } from './classes/customer';

// const noDiscount = new NoDiscount();
// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const pessoaFisica = new IndividualCustomer(
//   'Rodrigo',
//   'Lomar',
//   '144.756.627-02',
// );
const empresa = new EnterpriseCustomer('fixdate', '11727821-1000/08');
const order = new Order(shoppingCart, messaging, persistency, empresa);

shoppingCart.addItem(new Product('carambola', 2.9));
shoppingCart.addItem(new Product('balaustre', 49.9));
shoppingCart.addItem(new Product('repimboca', 30));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
