import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isEven, max, average, toTitleCase, filterEven } from './math.js';

describe('isEven', () => {
  it('מחזיר true למספר זוגי', () => {
    assert.strictEqual(isEven(4), true);
  });
  it('מחזיר true עבור המספר אפס', () => {
    assert.strictEqual(isEven(0), true);
  });
  it('מחזיר false עבור מחרוזת', () => {
    assert.strictEqual(isEven('hello'), false);
  });
});

describe('max', () => {
  it('מחזיר את הגדול מבין שני מספרים חיוביים', () => {
    assert.strictEqual(max(5, 10), 10);
  });
  it('עובד נכון עם מספרים שליליים', () => {
    assert.strictEqual(max(-3, -7), -3);
  });
  it('מחזיר את המספר עצמו כאשר השניים שווים', () => {
    assert.strictEqual(max(7, 7), 7);
  });
});

describe('average', () => {
  it('מחשב ממוצע של מערך מספרים רגיל', () => {
    assert.strictEqual(average([10, 20, 30]), 20);
  });
  it('מחשב ממוצע של מערך בעל איבר אחד בלבד', () => {
    assert.strictEqual(average([5]), 5);
  });
  it('מטפל במערך ריק ומחזיר 0', () => {
    assert.strictEqual(average([]), 0);
  });
});

describe('toTitleCase', () => {
  it('הופך אותיות ראשונות במשפט שלם לאותיות גדולות', () => {
    assert.strictEqual(toTitleCase('hello world'), 'Hello World');
  });
  it('מחזיר מחרוזת ריקה אם הקלט ריק', () => {
    assert.strictEqual(toTitleCase(''), '');
  });
  it('עובד נכון על מילה אחת בלבד', () => {
    assert.strictEqual(toTitleCase('javascript'), 'Javascript');
  });
});

describe('filterEven', () => {
  it('מסנן ומחזיר רק את הזוגיים ממערך מעורב', () => {
    assert.deepStrictEqual(filterEven([1, 2, 3, 4]), [2, 4]);
  });
  it('מחזיר מערך ריק כאשר כולם אי-זוגיים', () => {
    assert.deepStrictEqual(filterEven([1, 3, 5]), []);
  });
  it('מחזיר מערך ריק עבור מערך קלט ריק', () => {
    assert.deepStrictEqual(filterEven([]), []);
  });
});
