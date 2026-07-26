export function calculateDiscount(price, percent) {
    return (price / 100) * (100 - percent)
}

export function applyTax(price, taxRate) {
    return price + (price / 100 * taxRate)
}

export function calculateCartTotal(items) {
    return items.reduce((total, item) => {
        return total + (item.price * item.quantity)},0)
}

export function validatePrice(price) {
    if (typeof price !== 'number' || !Number.isFinite(price)) {
        throw new Error("The price must be a number");
    }
    if (price < 0) {
        throw new Error("The price must be greater than or equal to 0");
    }
    return true;
}

export function formatPrice(amount) {
    return `₪${amount.toFixed(2)}`
}