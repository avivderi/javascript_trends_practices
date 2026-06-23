const numbers = [1,2,3,4,5];
let i = 0

for (num of numbers) {
    i+= num
}
console.log(i)

const names = ["דנה", "יוסי", "מיכל", "רון"];

for (i of names) {
    console.log(i)
}

const numbers = [2,5,8,11,14,17,20];

for (i of numbers) {
    if (i % 2 === 0) {
        console.log(i)
    }
}

const numbers = [3,99,12,45,78];
let biger = numbers[0]

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > biger) {
        biger = numbers[i] 
    } 
} 
console.log(biger)

const word = 'javascript'

for (i of word) {
    console.log(i)
}

const numbers = [1,2,3,4];

for (i of numbers) {
    console.log(i*2)
}
let i = 1

while (i <= 10) {
    console.log(i)
    i++
}

let input = "";

while (input !== 'stop') {
    input = prompt("enter your number")
}

let input = '';
let i = 0

while (input !== 0) {
    i+= input
    input = prompt('enter your number')
}
console.log(i)

const secret = 7
const input = null

while (input !== secret) {
    const input = prompt("enter your number")
}

let x = 1;

while (x < 20) {
    console.log(x)
    x++
}

let password = "";
let input = null

while (password !== '1234') {
    input = prompt('enter your password')
}

let count = 0;

do {
    console.log(count);
    count++;
} while (count < 0);

let choice;

do {
    choice = prompt("enter your choich");
} while (choice !== 'exit')

