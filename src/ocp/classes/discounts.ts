// Aplico o DRY (don't repeat yourself), retiro os métodos que se repetiam das classes filhas
// passo para a super classe e crio o atributo discount na mesma.
// As classes filhas só precisam ter o valor diferente para o atributo.

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

export class NoDiscount extends Discount {}
