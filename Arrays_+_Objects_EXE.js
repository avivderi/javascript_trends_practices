const numbers = [1,2,3]
console.log(numbers)

const fruits = ["apple", "banana", "cherry"]
console.log(fruits[0]);
console.log(fruits[2])

fruits[1] = "mango"
console.log(fruits)

fruits.push("orange")

const result = fruits.pop()

fruits.unshift("kiwi")

fruits.shift()
console.log(fruits)

// const arr = ["a", "b", "c", "d"]
// arr.splice(1,1)

// const arr = ["a", "b", "c", "d"]
// arr.splice(1,0,"X")

// const arr = ["a", "b", "c", "d"]
// arr.splice(1,2,"X")

const num = [450,1,2,3,4,5,6,9,45,85]
console.log(num.length)
console.log(num[-1])

const list = [1,"aviv", true]
for (const i of list) console.log(i)

const nums = [10,20,30]
for (const i of nums) console.log(i)

const lst = [5,10,15]
let sum = 0
for (const i of lst) sum += i; console.log(sum);

const filter = [3,8,12,1]
for (const b of filter){if (b >= 5){console.log(b)}}

const object = {
    name: "aviv",
    age: 24
}
console.log(object)

const person = {name: "Dan", age: 25};
console.log(`${person.name} ${person.age}`)
console.log(`${person["name"]} ${person["age"]}`)

person["city"] = "bet shemesh"
console.log(person.city)
