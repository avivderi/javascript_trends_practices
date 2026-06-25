1.
function createLogger(params) {
    return function hello() {
        console.log("hello")
    }
}

2.
function createGreeting(name) {
    word = "hello"
    return function hello(name) {
        console.log(word, name)
    }
}

3.
function createCounter() {
    let con = 0
    return function increment() {
        con++
        console.log(con)
    }
}

4.
// יודפס 10 בגלל שהפונקציה החיצונית החזירה את הפונקציה הפנימית ובהפעלת הםונקציה הפנימית היא זוכרת את משתמה  ה- X

5.
function createMultiplier(x) {
    return function(num) {
        console.log(num * x)
    }
}

6.
function createAdder(num) {
    return function(x) {
        console.log(num + x)
    }
}

7.
function createSecret() {
    let secret = 4
    return {
    getSecret: function() {
        return secret
    },
    setSecret: function(num) {
        secret = num
        return secret
    }
    }
}

8.
function once(fn) {
    let counter = 0
    return function() {
        counter++
        if (counter === 1){
            return fn()
   } }  
}

12.
function createStack() {
    let items = []
    return {push: function(item) {
        items.push(item)
    },
    pop: function() {
        return items.pop()
    },
    peek: function() {
        return items[items.length-1]
    }
    }
}

13.
function createIdGenerator() {
    let id = 0
    return function() {
        id++
        return id
    }
}

15.
function createBankAccount(initialBalance) {
    let balans = initialBalance
    return {
        deposit: function(amount) {
            return balans += amount
        },
        withdraw: function(amount) {
            return balans -= amount
        },
        getBalance: function() {
            return balans
        }
    }
}
