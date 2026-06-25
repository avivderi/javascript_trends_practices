1.
function myname(name){
    const object = {name}
    return object
}

2.
function nameObject(name){
    return {
        name,
        greet(){
            return `hey i am ${this.name}`
        }
    }
    
}

3.
function createObject(name){
    return {name}
}

4.
function addAge(name,age){
    return {name,age}

}

5.
function userObject(name,password,age){
    return {
        name,
        password,
        age,
        user () {
            if (this.age > 18){
                return true
            }
            return false
  }
 }
}

6+7.
function outer(){
    let counter = 0
     return function inner(){
        counter ++
        return counter
    }
    
}

8.
function paramCount(counter){
    return function inner(){
         counter ++
         return counter        
    }
}

9+10.
function Count(counter){
    function inner(){
         counter ++
         return counter        
    }
     function decrese(){
         counter --
         return counter        
    }
    function current(){
        return counter
    }
    return {
        inner,
        decrese,
        current
    }
    
}

11.
function Factory(){
    let counter = 0
    function increment(){
        counter ++
        return {counter}
    }
    return increment 
}

12+13.
function count1(){
    let count = 0
    function addCount(){
        count++
        return count
    }
    function toZerro(){
        count = 0
        return count
    }
    return {
        addCount,
        toZerro
    }
}

14.
function state(){
    let count1 = 0
    let count2 = 0
    function addCount1(){
        count1++
        return count1
    }
    function addCount2(){
        count2++
        return count2
    }
    return {
        addCount1,
        addCount2
    }
}

15+16+17+18.
function factory(name,price,stock = 0){
    if (price <=0){
        throw new Error("price can not be negative")
    }
    const object = {name,price,stock}
    function available(){
        if (object.stock > 0){
            console.log(true)
        }
        else{
            console.log(false)
        }
        return object
    }
    return available
}

19.
function multiplier(num1) {
    return function double(num2) {
        return num1 * num2
    }
}

20.
function prefix(name) {
    let str = "hello "
    str += name
    return str
}

21+22+23.
function messages() {
    let con = 0
    let allMessages;
    if (con === 0) {
        allMessages = []
    }
    function pushMsg(msg) {
        allMessages.push(msg)
        con ++
        return "succssesfully"
    }
    function returnMsg(){
        return allMessages
    }
    function deleted(index) {
        for (let i = 0; i < allMessages.length; i++)
            if (i === index) {
                allMessages.splice(index, 1)
                return "delete message"
            }
    }
    return {pushMsg, returnMsg, deleted}
}

24.
function userFactory(name) {
    let con = 0
    return function login() {
        con++
        return {name, con}
    }
}

25.
function factoryRolse() {
    let objectRoles = {}
    function add(roles) {
        objectRoles[roles] = true;
        return `add ${roles}`
    }
    function remove(roles) {
        delete objectRoles[roles]
        return `deleted ${roles}`
    }
    function check(roles) {
        return !!objectRoles[roles]; 
    }
    return {add, remove, check}
}

let a = factoryRolse()
console.log(a.add("reader"))
console.log(a.add("write"))
console.log(a.remove("reader"))
console.log(a.check("reader"))