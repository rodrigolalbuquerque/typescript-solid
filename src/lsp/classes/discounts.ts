export abstract class Discount {
  protected discount = 0;

  calculate(price: number): number {
    return price - price * this.discount;
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 0.5;
}

export class TenPercentDiscount extends Discount {
  protected readonly discount = 0.1;
}

// Um exemplo de ferimento do principio da substituição de Liskov seria transformar essa classe:

// export class NoDiscount extends Discount {}

// da seguinte forma:

export class NoDiscount extends Discount {
  calculate(price: number): number {
    return price;
  }
}

// seria muito sutil, o código continuaria funcionando,
// mas o principio não estaria sendo respeitado.
