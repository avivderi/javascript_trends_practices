import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateDiscount,
  applyTax,
  calculateCartTotal,
  validatePrice,
  formatPrice
} from './store-calc.js';

describe('calculateDiscount', () => {
  it('should calculate price with percentage discount correctly', () => {
    assert.strictEqual(calculateDiscount(100, 20), 80);
  });

  it('should return the same price when discount is 0%', () => {
    assert.strictEqual(calculateDiscount(100, 0), 100);
  });

  it('should return 0 when discount is 100%', () => {
    assert.strictEqual(calculateDiscount(50, 100), 0);
  });
});

describe('applyTax', () => {
  it('should add tax correctly to the price', () => {
    assert.strictEqual(applyTax(100, 17), 117);
  });

  it('should return 0 when price is 0', () => {
    assert.strictEqual(applyTax(0, 17), 0);
  });

  it('should return same price when tax rate is 0', () => {
    assert.strictEqual(applyTax(100, 0), 100);
  });
});

describe('calculateCartTotal', () => {
  it('should calculate the total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 }
    ];
    assert.strictEqual(calculateCartTotal(items), 40);
  });

  it('should return 0 for an empty cart', () => {
    assert.strictEqual(calculateCartTotal([]), 0);
  });

  it('should handle single item with high quantity', () => {
    const items = [{ price: 15, quantity: 10 }];
    assert.strictEqual(calculateCartTotal(items), 150);
  });
});

describe('validatePrice', () => {
  it('should return true or not throw for valid positive prices', () => {
    assert.doesNotThrow(() => validatePrice(50));
  });

  it('should allow 0 as a valid price', () => {
    assert.doesNotThrow(() => validatePrice(0));
  });

  it('should throw an error if price is not a number', () => {
    assert.throws(() => {
      validatePrice('100');
    });
  });

  it('should throw an error for negative prices', () => {
    assert.throws(() => {
      validatePrice(-10);
    });
  });
});

describe('formatPrice', () => {
  it('should format whole numbers with currency symbol and 2 decimals', () => {
    assert.strictEqual(formatPrice(100), '₪100.00');
  });

  it('should pad single decimal digit to two decimal places', () => {
    assert.strictEqual(formatPrice(49.9), '₪49.90');
  });

  it('should round to two decimal places for longer floats', () => {
    assert.strictEqual(formatPrice(12.3456), '₪12.35');
  });
});