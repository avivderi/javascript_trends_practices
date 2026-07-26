export function isEven(n) {
    return n % 2 === 0
}

export function max (a,b) {
    return a > b ? a:b
}

export function average(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    const sum =  numbers.reduce((acc, cur) => acc + cur, 0)
    return  sum / numbers.length
}

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function filterEven(numbers) {
    return numbers.filter(num => num % 2 === 0)
}