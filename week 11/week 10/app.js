const add = require("./math.js")

console.log(add(2, 4))

const greet = require("./greet.js")
console.log(greet("Moshe"))

const user = require("./user.js")
console.log(user.name)
console.log(user.age)

const calc = require("./calc.js")
console.log(calc.add(5, 3))
console.log(calc.multiply(5, 3))

const utils = require("./utils.js")
console.log(utils.subtract(10, 4))

const isEven = require("./check.js")
console.log(isEven(4))
console.log(isEven(7))

const User = require("./UserClass.js")
const newUser = new User("Moriya")
console.log(newUser.name)

const numbers = require("./numbers.js")
const total = numbers.reduce((acc, curr) => acc + curr, 0)
console.log(total)

const advMath = require("./advancedMath.js")
console.log(advMath.add(2, 3))
console.log(advMath.square(4))

const logger = require("./logger.js")
logger.info("System started")
logger.error("Connection failed")

import { sum } from "./math.js"
console.log(sum(10, 5))

import { greet } from "./greet.js"
console.log(greet("Dan"))