import { Country } from '../main';

export const finland: Country = {
  name: 'Finland',
  codes: ['FI', 'FIN', '246'],
  calcFn: function (vat: string) {
    let total = 0;
    let expect;

    // Extract the next digit and multiply by the counter.
    if (!this.rules.multipliers) return false;
    if (!Array.isArray(this.rules.multipliers)) return false;
    for (let i = 0; i < 7; i++) total += +vat.charAt(i) * this.rules.multipliers[i];

    // Establish check digit.
    total = 11 - total % 11;
    if (total > 9) {
      total = 0;
    }

    // Compare it with the last character of the VAT number. If it's the same, then it's valid.
    expect = Number(vat.slice(7, 8));
    return total === expect;
  },
  rules: {
    multipliers: [7, 9, 10, 5, 8, 4, 2],
    regex: [/^(FI)(\d{8})$/]
  }
};
